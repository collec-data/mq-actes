import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatTooltipModule,
    MatButtonModule,
    MatIconModule,

    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    CommonModule,

    MatTooltipModule,
    MatButtonModule,
    MatIconModule,

    MatFormFieldModule,
    MatInputModule,
  ]
})
export class SharedModule { }
