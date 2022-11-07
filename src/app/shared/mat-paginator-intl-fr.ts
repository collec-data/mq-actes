import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from "@angular/core";

/**
 * Traduction française pour le paginator d'Angular Material.
 */
@Injectable()
export class MatPaginatorIntlFr extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Éléments par page :';
  override nextPageLabel = 'Page suivante';
  override previousPageLabel = 'Page précédente';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `${1 + page * pageSize} – ${Math.min(page * pageSize + pageSize, length)} de ${length}`;
  }
}
