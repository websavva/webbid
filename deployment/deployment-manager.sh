#!/bin/bash

export $(cat /apps/webbid/.env | xargs)

getDatabaseContainerId() {
  local containerId=$(docker container ps -q -f name=webbid_database.1 -f status=running)

  echo $containerId
}

getAppActiveVersion() {
  echo $RELEASE_VERSION
}

backupApp() {
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

  docker exec -it $databaseContainerId pg_dump -U $POSTGRES_USER -d $POSTGRES_DB  > database_backup.sql


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

  docker exec -it $databaseContainerId psql -U $POSTGRES_USER -c "DROP DATABASE IF EXISTS $POSTGRES_DB;"
  docker exec -it $databaseContainerId bash -c "psql -U $POSTGRES_USER $POSTGRES_DB < /database_backup.sql"
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

  # cleaning unarchived backup
  rm -rf $fulUnzippedPath

  # linking the latest backup file
  ln -s /apps/webbid/backups/$backupFileName /apps/webbid/backups/active
}


case "$1" in
  backup)
    backupApp
    ;;
  restore)
    applyBackup $2
    ;;

  *)
    echo "Usage: $0 {backup|restore|prune-registry}"
    ;;
esac

