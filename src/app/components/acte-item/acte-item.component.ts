import { Component, HostBinding, Input } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { TypeActePipe } from "../../shared/type-acte.pipe";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { DocumentActionsComponent } from "../document-actions/document-actions.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule, DatePipe } from "@angular/common";
import { PluralPipe } from "../../shared/plural.pipe";

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
    PluralPipe
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
export class ActeItemComponent {
  @Input() acte?: Acte;
  @Input() collapsed = false;

  @HostBinding('class.is-loading') get isLoading() {
    return this.acte == null;
  }
}
