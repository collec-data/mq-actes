import { createServer } from "miragejs"
import { Acte, classifications, Document, Page, typesActes } from "./models/model";

// des actes entre 2 dates
const actesBetween = (d1: Date, d2: Date, nbActes: number): Acte[] => {
  const plage = d2.getTime() - d1.getTime();
  const increment = plage / nbActes;

  const result: Acte[] = [];

  const acteForTime = (date: Date, index: number): Acte => {
    const allTypesCodes = Object.keys(typesActes);
    const type = allTypesCodes[date.getTime() % allTypesCodes.length] as keyof typeof typesActes;
    const allClassificationCodes = Object.keys(classifications);
    const classificationCode = allClassificationCodes[date.getTime() % allClassificationCodes.length] as keyof typeof classifications;
    const classificationLabel = classifications[classificationCode];

    const common: Document = {
      hash: 'xxx',
      id: 'xxx',
      id_publication: date.getTime(),
      typologie: '99_DE',
      content_type: 'application/pdf',
      objet: `Délibération ${index}`,
      date_acte: new Date(date.getTime() - 10000).toISOString(),
      date_publication: date.toISOString(),
      url: '/assets/minimal.pdf',

      type,
      classification_code: classificationCode,
      classification_libelle: classificationLabel,
      siren: '253514491'
    };
    return {
      ...common,
      annexes: [{
        ...common,
        objet: `${common.objet} annexe 1`
      }, {
        ...common,
        objet: `${common.objet} annexe 2`
      }],
    };
  };

  let index = 0;
  for (let time = d1.getTime(); time < d2.getTime(); time += increment) {
    index++;
    result.push(acteForTime(new Date(time), index));
  }

  return result;
}

const actes: Acte[] = actesBetween(
  new Date(2020, 2, 5),
  new Date(),
  1200
);

createServer({
  routes() {
    this.get<Page<Acte>>(
      "api/actes",
      (schema, request) => {
        const {lignes, debut, query, date_debut, date_fin, classifications, types_actes} = request.queryParams ?? {};
        const classificationsArray = classifications?.split(',');
        const typesActesArray = types_actes?.split(',');
        const taillePageNb = Number.parseInt(lignes, 0) ?? 10;
        const debutNb = Number.parseInt(debut, 0) ?? 0;
        const dateDebutTime = date_debut && new Date(date_debut).getTime();
        const dateFinTime = date_fin && new Date(date_fin).getTime();

        const filteredActes = actes.filter(a =>
          (!query || a.objet.toLocaleLowerCase().includes(query.toLocaleLowerCase())) &&
          (!classificationsArray || classificationsArray.some((x: string) => x.startsWith(a.classification_code))) &&
          (!typesActesArray || typesActesArray.includes(a.type)) &&
          (!dateDebutTime || new Date(a.date_publication).getTime() >= dateDebutTime) &&
          (!dateFinTime || new Date(a.date_publication).getTime() <= dateFinTime)
        );

        return {
          taille_page: taillePageNb,
          debut: debutNb,
          items: filteredActes.slice(debutNb, debutNb + taillePageNb),
          total: filteredActes.length
        };
      },
      {timing: 500}
    );

    this.passthrough();
  }
});
