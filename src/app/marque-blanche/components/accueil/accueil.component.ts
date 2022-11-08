import { Component, inject, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { SearchListComponent } from "../search-list/search-list.component";
import { PdfViewerComponent } from "../../../components/pdf-viewer/pdf-viewer.component";

const breakpointLarge = '(min-width: 960px)';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SearchListComponent,
    PdfViewerComponent
  ],
  host: {
    class: 'd-flex'
  }
})
export class AccueilComponent implements OnDestroy {
  private destroyed = new Subject<void>();

  private layoutChanges = inject(BreakpointObserver)
    .observe([breakpointLarge])
    .pipe(takeUntil(this.destroyed));

  showPdfViewer = false;

  constructor() {
    this.layoutChanges.subscribe(state => {
      this.showPdfViewer = state.breakpoints[breakpointLarge];
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
