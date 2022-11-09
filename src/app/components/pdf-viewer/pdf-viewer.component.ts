import { Component, Input } from "@angular/core";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  standalone: true
})
export class PdfViewerComponent {
  @Input() pdfUrl?: string | null;
}
