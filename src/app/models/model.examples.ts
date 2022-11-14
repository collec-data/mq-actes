import { Acte, Annexe } from "src/app/models/model";

export function annexes(): Partial<Annexe>[] {
  return [
    {objet: 'Délibération du 19.11 dm 11', url: 'void'},
    {objet: 'Délibération du 20.11 dm 11', url: 'void'},
  ];
}

export function acte(): Acte {
  const common = {
    hash: 'xxx',
    id: 'xxx',
    id_publication: 123,
    typologie: '99_DE',
    content_type: 'application/pdf',
    objet: 'Délibération du 19.11 décision modificative 11',
    date_acte: '19/11/2021',
    date_publication: '15/10/2022',
    url: 'void',

    type: '5' as const,
    classification_code: '7.1',
    classification_libelle: 'Finances locales/Divers',
    siren: '253514491'
  };
  return {
    ...common,
    annexes: annexes().map((a, index) => ({
      ...common,
      index_annexe: index,
      ...a
    })),
  };
}

export function actes(): Acte[] {

  return [
    acte(),
    acte(),
    acte(),
    acte(),
    acte(),
  ];
}
