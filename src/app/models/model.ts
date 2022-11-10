export const typesActes = {
  '1': "Délibérations",
  '2': "Actes réglementaires",
  '3': "Actes individuels",
  '4': "Contrats,conventions et avenants",
  '5': "Documents budgétaires et financiers",
  '6': "Autres",
  '7': "Hors Préfecture",
} as const;

export const classifications = {
  '1': "Commande Publique",
  '2': "Urbanisme",
  '3': "Domaine et patrimoine",
  '4': "Fonction publique",
  '5': "Institutions et vie politique",
  '6': "Libertes publiques et pourvoirs de police",
  '7': "Finances locales",
  '8': "Domaines de competences par themes",
  '9': "Autres domaines de competences",
} as const;

export type TypeActeCode = keyof typeof typesActes;
export type ClassificationCode = keyof typeof classifications;

export interface Document {
  blockchain_transaction_hash?: string;
  blockchain_url?: string;
  classification_code: string; // ou string[]
  classification_libelle: string; // ou string[]
  content_type: string;
  date_acte: string;
  date_publication: string;
  hash: string;
  id: string;
  id_publication: number;
  objet: string;
  resultat_recherche?: boolean;
  siren: string;
  type: TypeActeCode;
  type_autre_detail?: string;
  typologie: string;
  url: string;
}

export interface Acte extends Document {
  annexes: Annexe[];
}

export interface Annexe extends Document {
}

export interface Page<T> {
  debut: number;
  nb_resultats: number;
  resultats: T[];
  taille_page: number;
}

export interface Pageable {
  debut?: number;
  lignes?: number;
}

export interface SearchParams extends Pageable {
  siren?: string;
  query: string;
  date_debut?: Date;
  date_fin?: Date;
  classifications?: Set<ClassificationCode>;
  types_actes?: Set<TypeActeCode>;
}


export type PageBack<T> = Omit<Page<T>, 'taille_page'>;

export type AnnexeBack = {
  hash: string;
  id: string;
  resultat_recherche: boolean;
  url: string;
  // content_type ?
};

export type ActeBack = Omit<Acte, 'type' | 'annexes'> & { type: number, annexes: AnnexeBack[] };
