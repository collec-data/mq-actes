import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SharedModule { }
