export namespace ViewModel {
  export interface Acte {
    titre: string;
    date_acte: string;
    date_publication: string;
    url: string;

    objet: string;
    type: string;
    classification: string;
    siren: string;

    annexes: Annexe[];
  }

  export interface Annexe {
    titre: string;
    url: string;
  }

  export enum Classification {
    COMMANDE_PUBLIQUE = 'COMMANDE_PUBLIQUE',
    DOMAINE_ET_PATRIMOINE = 'DOMAINE_ET_PATRIMOINE',
    FONCTION_PUBLIQUE = 'FONCTION_PUBLIQUE',
    FINANCES_LOCALES = 'FINANCES_LOCALES',
    INSTITUTION_ET_VIE_POLITIQUE = 'INSTITUTION_ET_VIE_POLITIQUE',
    DOMAINES_DE_COMPETENCE_PAR_THEME = 'DOMAINES_DE_COMPETENCE_PAR_THEME',
    URBANISME = 'URBANISME',
    AUTRE_DOMAINES_DE_COMPETENCE = 'AUTRE_DOMAINES_DE_COMPETENCE',
    LIBERTES_PUBLIQUES_ET_POLICE = 'LIBERTES_PUBLIQUES_ET_POLICE',
  }

  export enum TypeActe {
    DELIBERATION = 'DELIBERATION',
    ACTES_INDIVIDUELS = 'ACTES_INDIVIDUELS',
    ACTES_REGLEMENTAIRES = 'ACTES_REGLEMENTAIRES',
    AUTRES = 'AUTRES',
  }

  export interface Page<T> {
    numFound: number;
    start: number;
    docs: T[];
  }

  export interface Pageable {
    page?: number;
    pageSize?: number;
  }

  export interface SearchParams extends Pageable {
    query: string;
    date_debut?: Date;
    date_fin?: Date;
    classifications?: Classification[];
    type_acte?: TypeActe[];
  }
}
