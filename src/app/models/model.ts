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

type TypeActeCode = keyof typeof typesActes;
type ClassificationCode = keyof typeof classifications;

export interface Document {
  hash: string;
  id: string;
  type: TypeActeCode;
  type_autre_detail?: string;
  classification_code: string; // ou string[]
  classification_libelle: string; // ou string[]
  objet: string;
  id_publication: number;
  date_acte: string;
  date_publication: string;
  url: string;
  typologie: string;
  content_type: string;
  blockchain_transaction_hash?: string;
  blockchain_url?: string;
  siren: string;
  resultat_recherche?: boolean;
}

export interface Acte extends Document {
  annexes: Annexe[];
}

export interface Annexe extends Document {
}

export interface Page<T> {
  total: number;
  debut: number;
  taille_page: number;
  items: T[];
}

export interface Pageable {
  debut?: number;
  lignes?: number;
}

export interface SearchParams extends Pageable {
  query: string;
  date_debut?: Date;
  date_fin?: Date;
  classifications?: Set<ClassificationCode>;
  types_actes?: Set<TypeActeCode>;
}

