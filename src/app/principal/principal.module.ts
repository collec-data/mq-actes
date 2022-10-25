import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,

    SharedModule,
  ]
})
export class PrincipalModule { }
