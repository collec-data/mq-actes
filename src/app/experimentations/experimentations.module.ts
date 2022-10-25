import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentationsRoutingModule } from './experimentations-routing.module';
import { ExperimentationsComponent } from './experimentations.component';
import { ListedocComponent } from './components/listedoc/listedoc.component';

import { MatListModule } from '@angular/material/list'
import { MatTreeModule } from '@angular/material/tree'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon';
import { ActeItemComponent } from '../components/acte-item/acte-item.component'
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExperimentationsComponent,
    ListedocComponent,
    ActeItemComponent
  ],
  imports: [
    CommonModule,
    ExperimentationsRoutingModule,

    SharedModule,

    MatListModule,
    MatExpansionModule,
    MatTreeModule,
    MatIconModule,
  ]
})
export class ExperimentationsModule { }
