#!/bin/bash

export $(cat /apps/webbid/.env | xargs)

DOCKER_REGISTRY_URL="registry.webbid.shop:5000"

pruneRegistry() {
  # Variables
  local IMAGE_NAME="webbid"
  local KEEP_VERSIONS=3 # Number of versions to keep

  # Get a list of all tags for the image from the registry
  tags=$(curl -u $DOCKER_REGISTRY_USERNAME:$DOCKER_REGISTRY_PASSWORD -s "https://$DOCKER_REGISTRY_URL/v2/$IMAGE_NAME/tags/list" | jq -r '.tags[]')

  # Check if jq is installed
  if ! [ -x "$(command -v jq)" ]; then
    echo 'Error: jq is not installed.' >&2
    exit 1
  fi

  # Sort tags (assuming they are semantic versions, adjust sorting logic if needed)
  sorted_tags=$(echo "$tags" | sort -V)

  # Count the total number of tags
  total_tags=$(echo "$sorted_tags" | wc -l)

  # Calculate the number of tags to delete (all tags - KEEP_VERSIONS)
  delete_count=$((total_tags - KEEP_VERSIONS))
  tags_to_delete=$(echo "$sorted_tags" | head -n "$delete_count")

  echo $sorted_tags

  # # If there are more than KEEP_VERSIONS tags, delete the older ones
  if [ "$delete_count" -gt 0 ]; then
    tags_to_delete=$(echo "$sorted_tags" | head -n "$delete_count")

    # Loop through the tags to delete
    for tag in $tags_to_delete; do
      echo "Deleting image: $IMAGE_NAME:$tag"

      # Delete the manifest for the tag (assuming registry v2 API)
      digest=$(curl -u $DOCKER_REGISTRY_USERNAME:$DOCKER_REGISTRY_PASSWORD -sI -H "Accept: application/vnd.oci.image.index.v1+json" \
        "https://$DOCKER_REGISTRY_URL/v2/$IMAGE_NAME/manifests/$tag" | grep -i "Docker-Content-Digest" | awk '{print $2}' | tr -d '\r')

      curl -u $DOCKER_REGISTRY_USERNAME:$DOCKER_REGISTRY_PASSWORD  -s -X DELETE "https://$DOCKER_REGISTRY_URL/v2/$IMAGE_NAME/manifests/$digest"
    done

    docker exec -it $(docker ps -q -f name=registry) bin/registry garbage-collect -m /etc/docker/registry/config.yml
    docker image rm $DOCKER_REGISTRY_URL/webbid:$tag
  else
    echo "No images to delete. Total images ($total_tags) <= versions to keep ($KEEP_VERSIONS)"
  fi
}

getDatabaseContainerId() {
  local containerId=$(docker container ps -q -f name=webbid_database.1 -f status=running)

  echo $containerId
}

getAppActiveVersion() {
  echo $RELEASE_VERSION
}

backup() {
  if [[ ! -d /apps/webbid/backups ]]; then
    mkdir -p /apps/webbid/backups
  fi;

  local currentDate="$(date +'%Y-%m-%dT%H-%M-%S')"
  local currentVersion="$(getAppActiveVersion)"
  local currentBackupName="${currentVersion}_${currentDate}"

  local currentBackupPath="/apps/webbid/backups/$currentBackupName"

  if [[ ! -d $currentBackupPath ]]; then
    mkdir -p $currentBackupPath
  fi;

  # Creating database backup and copying it into current backup folder
  local databaseContainerId=$(getDatabaseContainerId)

  docker exec -t $databaseContainerId pg_dump -U $POSTGRES_USER -F c -b -v -f /database_backup.sql $POSTGRES_DB



  docker cp $databaseContainerId:/database_backup.sql $currentBackupPath

  docker exec -it $databaseContainerId rm database_backup.sql

  # Backing up media files
  cp -r /apps/webbid/product_files $currentBackupPath
  cp -r /apps/webbid/media $currentBackupPath

  zip -q -r $currentBackupPath.zip $currentBackupPath

  rm -rf $currentBackupPath
}


applyBackup() {
  defaultBackupFileName=$(ls -1t /apps/webbid/backups | head -n 1)

  defaultBackupName="${defaultBackupFileName%.zip}"

  backupName=${1:-$defaultBackupName}
  backupFileName="$backupName.zip"

  echo "Applying backup $backupFileName"

  unzip -q /apps/webbid/backups/$backupFileName -d /temp/$backupName

  fulUnzippedPath="/temp/$backupName/apps/webbid/backups/$backupName"

  # stopping app service
  docker service scale webbid_app=0

  # restoring database
  databaseContainerId=$(getDatabaseContainerId)

  docker cp $fulUnzippedPath/database_backup.sql $databaseContainerId:/

  docker exec -it $databaseContainerId psql -U $POSTGRES_USER postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$POSTGRES_DB' AND pid <> pg_backend_pid();"
  docker exec -it $databaseContainerId psql -U $POSTGRES_USER postgres -c "DROP DATABASE IF EXISTS $POSTGRES_DB;"
  docker exec -it $databaseContainerId psql -U $POSTGRES_USER postgres -c "CREATE DATABASE $POSTGRES_DB;"
  docker exec -i $databaseContainerId psql -U $POSTGRES_USER -d $POSTGRES_DB -f /database_backup.sql


  docker exec -it $databaseContainerId rm /database_backup.sql

  # restarting database service
  docker service scale webbid_database=0
  docker service scale webbid_database=1

  # restoring previous version of media and product files
  rm -rf /apps/webbids/product_files/*
  rm -rf /apps/webbids/media/*

  cp -r $fulUnzippedPath/media/* /apps/webbid/media
  cp -r $fulUnzippedPath/product_files/* /apps/webbid/product_files

  # starting back app service
  docker service scale webbid_app=2
  docker service update --force webbid_app

  # cleaning unarchived backup
  rm -rf $fulUnzippedPath

  # linking the latest backup file
  ln -s /apps/webbid/backups/$backupFileName /apps/webbid/backups/active
}

remove() {
  docker stack rm webbid
  rm -rf /apps/webbid/database/* /apps/webbid/media/* /apps/webbid/product_files/*
}

rollback() {
  docker service scale webbid_app=0

  previousReleaseVersion=$RELEASE_VERSION
  newReleaseVersion=$1


  docker service update --image $DOCKER_REGISTRY_URL/app:$newReleaseVersion --args "pnpm migrate:rollback-versions $previousReleaseVersion $newReleaseVersion && pnpm start"

  sed -i 's/^RELEASE_VERSION=.*/RELEASE_VERSION=$newReleaseVersion/' /app/webbid/.env

  export RELEASE_VERSION=$newReleaseVersion

  docker service scale webbid_app=2
}

deploy() {
  docker stack deploy -c /apps/webbid/docker-compose.yaml webbid
}

docker login $DOCKER_REGISTRY_URL -u $DOCKER_REGISTRY_USERNAME -p $DOCKER_REGISTRY_PASSWORD

case "$1" in
  backup)
    backup
    ;;
  restore)
    applyBackup $2
    ;;
  remove)
    remove
    ;;
  deploy)
    deploy
    ;;
  rollack)
    rollback $1
    ;;
  prune-registry)
    pruneRegistry
    ;;
  *)
    echo "Usage: $0 {backup|restore|prune-registry|deploy|remove}"
    ;;
esac

