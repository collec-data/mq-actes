import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebugComponent } from './components/debug/debug.component';

import { SharedModule } from './shared/shared.module';
import { FakeSearchService, SEARCH_SERVICE_TOKEN } from './search.service';

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,

    SharedModule,

    LayoutModule,
  ],
  providers: [

    // TODO: remplacer par un vrai search service
    {
      provide: SEARCH_SERVICE_TOKEN,
      useClass: FakeSearchService,
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
