import { Component, inject, Input } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { Store } from "../../marque-blanche/services/store";
import { AsyncPipe, NgIf } from "@angular/common";
import { Document } from "../../models/model";

/**
 * Boutons d'actions sur les documents.
 */
@Component({
  selector: 'app-document-actions',
  templateUrl: './document-actions.component.html',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ClipboardModule,
    AsyncPipe,
    NgIf,
  ],
  styleUrls: ['./document-actions.component.scss']
})
export class DocumentActionsComponent {
  @Input() document!: Document;
  @Input() iconClass: 'small-icons' | null = null;

  store = inject(Store);
  private snackBar = inject(MatSnackBar);

  textCopied() {
    this.snackBar.open(`L'adresse a été copiée dans le presse-papier`, undefined, {
      duration: 2000
    })
  }
}
