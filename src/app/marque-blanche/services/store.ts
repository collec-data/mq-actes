import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Document, SearchParams } from "../../models/model";

@Injectable()
export class Store {
  private selectedDocument = new BehaviorSubject<Document | null>(null);
  private pdfViewerDisplayed = new BehaviorSubject<boolean>(false);
  private searchParams = new Subject<SearchParams>();

  readonly selectedDocument$ = this.selectedDocument.asObservable();
  readonly pdfViewerDisplayed$ = this.pdfViewerDisplayed.asObservable();
  readonly selectedDocumentHighlighted$ = this.pdfViewerDisplayed$;
  readonly searchParams$ = this.searchParams.asObservable();

  selectDocument(doc: Document | null) {
    this.selectedDocument.next(doc);
  }

  showPdfViewer(show: boolean) {
    this.pdfViewerDisplayed.next(show);
  }

  updateSearchParams(params: SearchParams) {
    this.searchParams.next(params);
  }
}
