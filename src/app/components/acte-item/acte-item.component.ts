import { Component, HostBinding, inject, Input, OnInit } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { TypeActePipe } from "../../shared/type-acte.pipe";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { DocumentActionsComponent } from "../document-actions/document-actions.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule, DatePipe } from "@angular/common";
import { PluralPipe } from "../../shared/plural.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Store } from "../../marque-blanche/services/store";

@Component({
  selector: 'app-acte-item',
  templateUrl: './acte-item.component.html',
  styleUrls: ['./acte-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TypeActePipe,
    DocumentActionsComponent,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    PluralPipe,
    MatTooltipModule
  ],
  host: {
    class: 'd-flex flex-column py-l pr-l'
  },
  animations: [
    trigger('collapsed', [
      state('open', style({
        height: '*',
        marginTop: '*',
        overflow: 'hidden'
      })),
      state('closed', style({
        height: '0px',
        marginTop: '0px',
        overflow: 'hidden'
      })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
    trigger('rotate', [
      state('right', style({
        transform: 'rotate(0)'
      })),
      state('down', style({
        transform: 'rotate(90deg)'
      })),
      transition('right <=> down', animate('200ms ease-in-out')),
    ]),
  ]
})
export class ActeItemComponent implements OnInit {
  @Input() acte?: Acte;
  @Input() collapsed = false;
  @Input() hideSiren = false;

  private store = inject(Store);
  selectedDocId?: string;
  showSelectedDoc = false;

  @HostBinding('class.is-loading') get isLoading() {
    return this.acte == null;
  }

  @HostBinding('class.selected-doc') get isActeSelected() {
    return this.showSelectedDoc && this.acte && this.acte.id === this.selectedDocId;
  }

  ngOnInit() {
    this.store.selectedDocumentHighlighted$.subscribe((show) => {
      return this.showSelectedDoc = show;
    });
    this.store.selectedDocument$.subscribe((doc) => {
      return this.selectedDocId = doc?.id;
    });
  }
}
