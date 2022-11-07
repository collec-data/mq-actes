import { Component, inject, Input } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardModule } from "@angular/cdk/clipboard";

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
    ],
  styleUrls: ['./document-actions.component.scss']
})
export class DocumentActionsComponent {
  @Input() documentUrl!: string;
  @Input() iconClass: 'small-icons' | null = null;

  private snackBar = inject(MatSnackBar);

  textCopied() {
    this.snackBar.open(`L'adresse a été copiée dans le presse-papier`, undefined, {
      duration: 2000
    })
  }
}
