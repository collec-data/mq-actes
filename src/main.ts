import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { API_ACTES_ENDPOINT, HttpSearchService, SearchService } from "./app/search.service";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app/app-routes";
import { RouterModule } from "@angular/router";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntlFr } from "./app/shared/mat-paginator-intl-fr";
import { MarkdownModule } from 'ngx-markdown'
import { EnvServiceFactory } from './app/env.service.factory';
import { EnvService } from './app/env.service';
import { MatDateFnsModule } from "@angular/material-date-fns-adapter";
import { fr } from 'date-fns/locale'

registerLocaleData(localeFr);

const prepare = () => {
  if (environment.production) {
    enableProdMode();
  }
  return environment.useMocks
    ? environment.installMocks()
    : Promise.resolve();
}

prepare().then(() =>
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom([
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatDateFnsModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ]),
      {
        provide: API_ACTES_ENDPOINT,
        useValue: 'mq_apis/actes/v1'
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
        provide: MAT_DATE_LOCALE,
        useValue: fr,
      },
      {
        provide: MatPaginatorIntl,
        useClass: MatPaginatorIntlFr
      },
      {
        provide: EnvService,
        useFactory: EnvServiceFactory,
      }
    ]
  }))
  .catch(err => console.error(err));
