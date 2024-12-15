# Deployment

> This file contains instructions and files simplyfying and enabling the process of
> deployment of the given application.

## SSL-certificates

In order to obtain all SSL-certificates, DNS A-record is required as follows:

`A *.webbid.shop VPS_IP_ADDRESS`

Next, the following command needs to be run and all steps should be taken
according to the instructions given by command:

```bash
certbot certonly --manual --preferred-challenges=dns -d webbid.shop -d *.webbid.shop
```

Afterwards, generated folder with certificates needs to be copied without symbolic links:

```bash
rsync -aL /etc/letsencrypt/live/webbid.shop/ /ssl-certificates
```

Renewal procedure should take into account resolution of symblinks too if needed.

## Self-hosted Docker registry

First of all, Apache utils should be installed as they are necessary for password files generation.

```bash
sudo apt install apache2-utils -y
```

Then in a new folder `auth`, the following command should be executed:

```bash
htpasswd -Bc registry.password <username>
```

At the end of this command, password file will be written with a name like `<username>.password`

Prior to running docker container for registry with registry-docker-compose.yaml, corresponding
SSL-certificates are required: either for all subdomains `*.webbid.shop` or for a particular subdomain
`registry.webbid.shop`.

In order to connect to the given registry and then push images into it, the followinf commands can be used:

```bash
docker login registry.webbid.shop
```

Afterwards, you will be prompted with username and password to be used for authentication.

To push an existing image to the self-hosted registry, an image
should be given a label pointing to the specific registry:

```bash
docker label webbid:0.0.1 registry.webbid.shop/webbid:0.0.1
```

Next, pushing is handled by the command:

```bash
docker push registry.webbid.shop/webbid:0.0.1
```
