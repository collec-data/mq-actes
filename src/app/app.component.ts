import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'opendata-marqueblanche';
  includeDebug = false

  destroy$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.queryParams
      .pipe(
        filter(params => params['debug']),
        takeUntil(this.destroy$)
      )
      .subscribe(_ => this.includeDebug = true)
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }
}
