export const typesActes = {
  '1': "Délibérations",
  '2': "Actes réglementaires",
  '3': "Actes individuels",
  '4': "Contrats, conventions et avenants",
  '5': "Documents budgétaires et financiers",
  '6': "Autres",
  '7': "Hors Préfecture",
  '71': "Liste des délibérations",
  '72': "Arrêtés temporaires",
  '73': "Procés verbal de conseil",
} as const;

export const classifications = {
  '1': "Commande Publique",
  '2': "Urbanisme",
  '3': "Domaine et patrimoine",
  '4': "Fonction publique",
  '5': "Institutions et vie politique",
  '6': "Libertés publiques et pouvoirs de police",
  '7': "Finances locales",
  '8': "Domaines de compétences par thèmes",
  '9': "Autres domaines de compétences",
} as const;

export const thematiques = {
  'urbanisme': {
    icon: 'home_work',
    libelle: "Urbanisme",
    keywords: "urbanisme PLU aménagement maison immeuble immobilier voirie route"
  },
  'economie': {
    icon: 'trending_up',
    libelle: "Economie",
    keywords: "economie financement budget dépense recette investissement"
  },
  'sante': {
    icon: 'medical_services',
    libelle: "Santé",
    keywords: "santé docteur infirmier hopital soins"
  },
} as const;

export type TypeActeCode = keyof typeof typesActes;
export type ClassificationCode = keyof typeof classifications;
export type ThematiqueCode = keyof typeof thematiques;

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
  nature_autre_detail?: string;
  typologie: string;
  url: string;
}

export interface Acte extends Document {
  annexes: Annexe[];
}

export interface Annexe extends Document {
  index_annexe: number;
}

export interface Page<T> {
  nb_resultats: number;
  resultats: T[];
  page_suivante?: string;
}

export interface SearchParams {
  siren?: string;
  query: string;
  publications_en_cours: boolean,
  date_debut?: Date;
  date_fin?: Date;
  classifications?: Set<ClassificationCode>;
  types_actes?: Set<TypeActeCode>;
  thematique?: ThematiqueCode;
  page_suivante?: string;
  lignes?: number;
}


export type PageBack<T> = Omit<Page<T>, 'taille_page'>;

export type AnnexeBack = {
  hash: string;
  id: string;
  resultat_recherche: boolean;
  url: string;
  content_type: string;
};

export type ActeBack = Omit<Acte, 'type' | 'annexes'> & { type: number, annexes: AnnexeBack[] };
