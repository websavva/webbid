# Deployment

> This file contains instructions and files simplyfying and enabling the process of
> deployment of the given application.

## SSL-certificates

In order to obtain all SSL-certificates, DNS A-record is required as follows:

`A *.webbid.shop VPS_IP_ADDRESS`

Next, the following command needs to be run and all steps should be taken
according to the instructions given by command:

```bash
certbot ceronly --manual --preferred-challenges=dns -d webbid.shop -d *.webbid.shop
```

Afterwards, generated folder with certificates needs to be copied without symbolic links:

```bash
rsync -aL /etc/letsencrypt/live/webbid.shop/ /ssl-certificates
```

Renewal procedure should take into account resolution of symblinks too if needed.
