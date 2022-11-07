import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { API_ACTES_URL, HttpSearchService, SearchService } from "./app/search.service";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app/app-routes";
import { RouterModule } from "@angular/router";
import { MatNativeDateModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

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
      useClass: HttpSearchService,
    }
  ]
}).catch(err => console.error(err));
