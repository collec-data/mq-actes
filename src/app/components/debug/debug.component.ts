import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LayoutModule,
  ]
})
export class DebugComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  mediaQueriesState: [string, boolean][] = [];

  constructor(private responsive: BreakpointObserver) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {

    this.setupBreakPointObservers();
  }

  setupBreakPointObservers() {
    let breakpoints = [
      Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge,
      Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web,
      Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait, Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait, Breakpoints.WebLandscape,
    ];

    this.responsive.observe(breakpoints)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(r => {
        this.mediaQueriesState = Object.entries(r.breakpoints);
      });
  }

}
