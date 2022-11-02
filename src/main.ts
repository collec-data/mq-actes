import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { FakeSearchService, SEARCH_SERVICE_TOKEN } from "./app/search.service";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app/app-routes";
import { RouterModule } from "@angular/router";
import { MatNativeDateModule } from "@angular/material/core";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(routes),
      NoopAnimationsModule,
      MatNativeDateModule
    ]),

    // TODO: remplacer par un vrai search service
    {
      provide: SEARCH_SERVICE_TOKEN,
      useClass: FakeSearchService,
    }
  ]
}).catch(err => console.error(err));
