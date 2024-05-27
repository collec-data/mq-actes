import { classifications, SearchParams, thematiques, typesActes } from "../../models/model";
import { Filter } from "./search-filter-list/search-filter-list.component";
import { inject, Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";

@Injectable()
export class SearchFiltersService {
  private datePipe = inject(DatePipe);

  /**
   * Retourne une liste de filtres correspondant aux paramètres de recherche donnés.
   */
  toFilters(params: SearchParams): Filter[] {
    const filters: Filter[] = [];

    if (params.thematique) {
      let thematique = thematiques[params.thematique];
      filters.push({
        icon: thematique.icon,
        label: thematique.libelle,
        data: {
          prop: 'thematique'
        }
      });
    }

    if (params.publications_en_cours) {
      filters.push({
        label: `publications en cours`,
        data: {
          prop: 'publications_en_cours'
        }
      });
    }

    if (params.date_debut) {
      filters.push({
        label: `décision après le ${this.datePipe.transform(params.date_debut, 'shortDate')}`,
        data: {
          prop: 'date_debut'
        }
      });
    }

    if (params.date_fin) {
      filters.push({
        label: `décision avant le ${this.datePipe.transform(params.date_fin, 'shortDate')}`,
        data: {
          prop: 'date_fin'
        }
      });
    }

    if (params.date_de_publication_debut) {
      filters.push({
        label: `publié après le ${this.datePipe.transform(params.date_de_publication_debut, 'shortDate')}`,
        data: {
          prop: 'date_de_publication_debut'
        }
      });
    }

    if (params.date_de_publication_fin) {
      filters.push({
        label: `publié avant le ${this.datePipe.transform(params.date_de_publication_fin, 'shortDate')}`,
        data: {
          prop: 'date_de_publication_fin'
        }
      });
    }

    if (params.classifications?.size) {
      for (const [code, libelle] of Object.entries(classifications)) {
        if (params.classifications.has(code as any)) {
          filters.push({
            label: libelle,
            data: {
              prop: 'classifications',
              valeur: code
            }
          });
        }
      }
    }

    if (params.types_actes?.size) {
      for (const [code, libelle] of Object.entries(typesActes)) {
        if (params.types_actes.has(code as any)) {
          filters.push({
            label: libelle,
            data: {
              prop: 'types_actes',
              valeur: code
            }
          });
        }
      }
    }

    return filters;
  }

  /**
   * Retourne une copie des paramètres de recherche sans le filtre indiqué
   * (les paramètres d'origine ne sont pas modifiés).
   */
  removeFilter(params: SearchParams, filter: Filter): SearchParams {
    if (filter.data.prop === 'types_actes') {
      const types_actes = new Set(params.types_actes);
      types_actes.delete(filter.data.valeur);
      return {
        ...params,
        types_actes
      };
    }
    if (filter.data.prop === 'classifications') {
      const classifications = new Set(params.classifications);
      classifications.delete(filter.data.valeur);
      return {
        ...params,
        classifications
      };
    }
    return {
      ...params,
      [filter.data.prop]: undefined
    };
  }
}
