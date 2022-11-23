# Marque blanche des délibérations

Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Dépendances

Le projet utilise les bibliothèques suivantes :

 - [Angular Material](https://material.angular.io/components) (MIT) : composants graphiques
 - [ngx-extended-pdf-viewer](https://www.npmjs.com/package/ngx-extended-pdf-viewer) (Apache-2.0) : visionneuse PDF (intégration Angular de [PDF.js](https://github.com/mozilla/pdf.js))
 - [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll) (MIT) : utilitaire pour la gestion du chargement des données au défilement
 - [Mock Service Worker](https://mswjs.io) (MIT) : pour simuler les réponses HTTP lorsque l'application est lancée en mode développement

## FAQ développeur

### Je n'arrive pas à accéder à une iframe lors d'un test e2e

Certains tests nécessitent que le navigateur n'applique pas les politiques de sécurité. Voir: [cross origin iframes](https://docs.cypress.io/guides/guides/web-security#Cross-origin-iframes)

### Comment appeler l'API réelle depuis l'application lancée avec le serveur de développement ?

Dans [`environment.ts`](./src/environments/environment.ts), passer la proriété `useMocks` à `false`.

## Intégration de la marque blanche à un site web

Ajouter au code HTML de la page :
```html
  <iframe src="<adresse de la marque blanche>" title="Délibérations" width="100%" height="800px"></iframe>
```

### Paramètres

#### theme

Le thème peut être défini en ajoutant un paramètre query `theme=<nom du thème>` à l'adresse de la marque blanche.

En plus du thème bleu par défaut, les thèmes suivants sont disponibles :

 - `vert-tours`
 - `rouge-rennes`
 - `turquoise-ille-et-vilaine`
 - `jaune-eurelien`
 - `orange-orleans`
 - `gris-neutre`

#### siren

Le siren d'une commune peut être spécifié. S'il est présent, seulement les délibérations concernant cette commune seront affichés.

#### Paramètres de recherche

Les paramètres de recherche sont également indiqués dans l'URL.

Accéder à la marque blanche et effectuer une recherche : l'URL sera modifiée pour y ajouter les paramètres de recherche.  
Cette URL peut ensuite être intégrée dans une iframe.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
