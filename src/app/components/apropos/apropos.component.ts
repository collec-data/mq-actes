import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown'
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
export class AproposComponent {

  public src_url?: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: { src_url?: string }) {
    this.src_url = data.src_url
  }

}
