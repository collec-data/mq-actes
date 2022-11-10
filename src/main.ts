import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { API_ACTES_URL, HttpSearchService, SearchService } from "./app/search.service";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app/app-routes";
import { RouterModule } from "@angular/router";
import { MatNativeDateModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntlFr } from "./app/shared/mat-paginator-intl-fr";
import { worker } from "./mocks/browser";

registerLocaleData(localeFr);

if (environment.production) {
  enableProdMode();
}

worker.start({
  serviceWorker: {
    url: `${document.baseURI}mockServiceWorker.js`,
  }
}).then(() =>
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom([
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatNativeDateModule,
        HttpClientModule
      ]),
      {
        provide: API_ACTES_URL,
        useValue: '/api'
      },
      {
        provide: SearchService,
        useClass: HttpSearchService
      },
      {
        provide: LOCALE_ID,
        useValue: 'fr-FR'
      },
      {
        provide: MatPaginatorIntl,
        useClass: MatPaginatorIntlFr
      }
    ]
  }))
  .catch(err => console.error(err));
