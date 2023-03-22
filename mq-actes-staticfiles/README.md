# mq-actes-staticfiles

Image companion de la marque blanche. 

Basé sur [httpd](https://hub.docker.com/_/httpd).

S'attend au montages des volumes `/private` et `/public`

Sert les fichiers situés dans `/usr/local/apache2/htdocs/`
le module `mod_auth_openidc` est activé pour la location `/private`. 

Voir le fichier [auth_openidc.conf.template](./config/auth_openidc.conf.template) pour un exemple de configuration.

## Instruction pour le déploiement

Chaque instance est stateful à cause de l'authentification auprès du keycloak.
⚠ Il est donc important d'activer les sticky session sur le loadbalancer.
