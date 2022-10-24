import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarqueBlancheRoutingModule } from './marque-blanche-routing.module';
import { AccueilComponent } from './accueil/accueil.component';


@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule,
    MarqueBlancheRoutingModule
  ]
})
export class MarqueBlancheModule { }
