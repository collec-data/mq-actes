import { Component, Input } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { ActeItemComponent } from "../acte-item/acte-item.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ActeItemComponent
  ]
})
export class DocumentListComponent {
  @Input() actesPromise?: Promise<Acte[]>;
}
