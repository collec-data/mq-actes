import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown'
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MarkdownModule,
  ],
  standalone: true,
})
export class AproposComponent {

  public src_url?: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: { src_url?: string }) {
    this.src_url = data.src_url
  }

}
