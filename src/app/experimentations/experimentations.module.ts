import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentationsRoutingModule } from './experimentations-routing.module';
import { ExperimentationsComponent } from './experimentations.component';


@NgModule({
  declarations: [
    ExperimentationsComponent
  ],
  imports: [
    CommonModule,
    ExperimentationsRoutingModule
  ]
})
export class ExperimentationsModule { }
