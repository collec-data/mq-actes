import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { sharedModules } from '../shared/shared-modules';

export const experimentationsModules = [
  ...sharedModules,

  MatListModule,
  MatExpansionModule,
  MatTreeModule,
  MatIconModule,
] as const;
