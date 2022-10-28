import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

export const sharedModules = [
  CommonModule,

  MatTooltipModule,
  MatButtonModule,
  MatIconModule,

  MatFormFieldModule,
  MatInputModule,
] as const;
