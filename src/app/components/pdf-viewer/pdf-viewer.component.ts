import { Component, Input } from "@angular/core";
import { NgxExtendedPdfViewerModule, PagesLoadedEvent } from "ngx-extended-pdf-viewer";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  standalone: true
})
export class PdfViewerComponent {
  /** URL du pdf à afficher. */
  @Input() pdfUrl?: string | null;

  /** Au chargement du pdf, surligne les occurrences du texte et affiche la page de la première occurrence trouvée. */
  @Input() highlightedText?: string | null;

  onPagesLoad(event: PagesLoadedEvent) {
    if (this.highlightedText) {
      const eventBus = event.source.eventBus;
      eventBus.dispatch('find', {
        caseSensitive: false,
        findPrevious: undefined,
        highlightAll: true,
        phraseSearch: true,
        query: this.highlightedText
      });
    }
  }
}
