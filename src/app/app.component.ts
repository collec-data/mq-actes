import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CommonModule } from "@angular/common";
import { DebugComponent } from "./components/debug/debug.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    DebugComponent,
    RouterModule,
  ],
  host: {
    class: 'd-flex flex-column h-100'
  }
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'opendata-marqueblanche';
  includeDebug = false

  destroy$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute) {
  }

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
