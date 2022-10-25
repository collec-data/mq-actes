import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarqueBlancheRoutingModule } from './marque-blanche-routing.module';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule,
    MarqueBlancheRoutingModule,

    SharedModule,
  ]
})
export class MarqueBlancheModule { }
