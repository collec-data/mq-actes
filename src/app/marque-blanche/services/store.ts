import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Document } from "../../models/model";

@Injectable()
export class Store {
  private selectedDocument = new BehaviorSubject<Document | null>(null);
  private pdfViewerDisplayed = new BehaviorSubject<boolean>(false);

  readonly selectedDocument$ = this.selectedDocument.asObservable();
  readonly pdfViewerDisplayed$ = this.pdfViewerDisplayed.asObservable();
  readonly selectedDocumentHighlighted$ = this.pdfViewerDisplayed$;

  selectDocument(doc: Document | null) {
    this.selectedDocument.next(doc);
  }

  showPdfViewer(show: boolean) {
    this.pdfViewerDisplayed.next(show);
  }
}
