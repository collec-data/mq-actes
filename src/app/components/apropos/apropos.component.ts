import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown'
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MarkdownModule,
  ],
  standalone: true,
})
export class AproposComponent { }
