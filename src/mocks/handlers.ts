import { rest } from 'msw';
import { Acte, classifications, Document, typesActes } from "../app/models/model";

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
      id: `${date.getTime()}`,
      id_publication: date.getTime(),
      typologie: '99_DE',
      content_type: 'application/pdf',
      objet: `Délibération ${index}`,
      date_acte: new Date(date.getTime() - 10000).toISOString(),
      date_publication: date.toISOString(),
      url: `/assets/minimal.pdf?acte=${date.getTime()}`,

      type,
      classification_code: classificationCode,
      classification_libelle: classificationLabel,
      siren: '253514491'
    };
    return {
      ...common,
      annexes: [{
        ...common,
        id: `${date.getTime()}-anx1`,
        objet: `${common.objet} annexe 1`,
        url: `/assets/minimal.pdf?acte=${date.getTime()}&annexe=1`
      }, {
        ...common,
        id: `${date.getTime()}-anx2`,
        objet: `${common.objet} annexe 2`,
        url: `/assets/minimal.pdf?acte=${date.getTime()}&annexe=2`
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

export const handlers = [
  rest.get('/assets/*', (req) => {
    return req.passthrough();
  }),

  rest.get('/api/actes', (req, res, ctx) => {
    const query = req.url.searchParams.get('query');

    const classificationsArray = req.url.searchParams.get('classifications')?.split(',');
    const typesActesArray = req.url.searchParams.get('types_actes')?.split(',');
    const taillePageNb = Number.parseInt(req.url.searchParams.get('lignes') ?? '10', 0);
    const debutNb = Number.parseInt(req.url.searchParams.get('debut') ?? '0', 0);

    const dateDebut = req.url.searchParams.get('date_debut');
    const dateDebutTime = dateDebut && new Date(dateDebut).getTime();

    const dateFin = req.url.searchParams.get('date_fin');
    const dateFinTime = dateFin && new Date(dateFin).getTime();


    const filteredActes = actes.filter(a =>
      (!query || a.objet.toLocaleLowerCase().includes(query.toLocaleLowerCase())) &&
      (!classificationsArray || classificationsArray.some((x: string) => x.startsWith(a.classification_code))) &&
      (!typesActesArray || typesActesArray.includes(a.type)) &&
      (!dateDebutTime || new Date(a.date_publication).getTime() >= dateDebutTime) &&
      (!dateFinTime || new Date(a.date_publication).getTime() <= dateFinTime)
    );

    return res(
      ctx.status(200),
      ctx.json({
        taille_page: taillePageNb,
        debut: debutNb,
        items: filteredActes.slice(debutNb, debutNb + taillePageNb),
        total: filteredActes.length
      }),
    )
  })
];
