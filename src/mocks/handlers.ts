import { rest } from 'msw';
import { ActeBack, classifications, PageBack, typesActes } from "../app/models/model";

const acteForTime = (date: Date, index: number): ActeBack => {
  const allTypesCodes = Object.keys(typesActes);
  const type = allTypesCodes[date.getTime() % allTypesCodes.length] as keyof typeof typesActes;
  const allClassificationCodes = Object.keys(classifications);
  const classificationCode = allClassificationCodes[date.getTime() % allClassificationCodes.length] as keyof typeof classifications;
  const classificationLabel = classifications[classificationCode];

  const objet = index % 10 === 0
    ? `Délibération ${index} avec un long texte pour tester les limites de l'affichage et voir si ça casse tout, ce qui serait dommage (on peut légitimement penser qu'un objet de cette longueur indique que la personne à son origine a pour volonté de nuire). Et que se passe-t-il si l'objet contient un mot très très long, comme aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrrrrrrrrrrrrrrrrrrrgh ?`
    : `Délibération ${index}`;

  return {
    hash: 'xxx',
    id: `${date.getTime()}`,
    id_publication: date.getTime(),
    typologie: '99_DE',
    content_type: 'application/pdf',
    objet,
    date_acte: new Date(date.getTime() - 10000).toISOString(),
    date_publication: date.toISOString(),
    url: `${document.baseURI}assets/minimal.pdf?acte=${date.getTime()}`,
    type: Number(type),
    classification_code: classificationCode,
    classification_libelle: classificationLabel,
    siren: '253514491',
    annexes: [{
      hash: 'xxx-anx1',
      id: `${date.getTime()}-anx1`,
      url: `${document.baseURI}assets/minimal.pdf?acte=${date.getTime()}&annexe=1`,
      resultat_recherche: false,
      content_type: 'application/pdf'
    },
      ...(index % 7 === 0)
        ? []
        : [{
          hash: 'xxx-anx2',
          id: `${date.getTime()}-anx1`,
          url: `${document.baseURI}assets/minimal.pdf?acte=${date.getTime()}&annexe=1`,
          resultat_recherche: false,
          content_type: 'application/pdf'
        }]
    ]
  };
};

// des actes entre 2 dates
const actesBetween = (d1: Date, d2: Date, nbActes: number): ActeBack[] => {
  const plage = d2.getTime() - d1.getTime();
  const increment = plage / nbActes;

  const result: ActeBack[] = [];
  let index = 0;
  for (let time = d1.getTime(); time < d2.getTime(); time += increment) {
    index++;
    result.push(acteForTime(new Date(time), index));
  }

  return result;
}

const actes: ActeBack[] = actesBetween(
  new Date(2020, 2, 5),
  new Date(),
  1200
);

export const handlers = [
  rest.get(`${document.baseURI}assets/*`, (req) => {
    return req.passthrough();
  }),

  rest.get('https://data-api-preprod.megalis.bretagne.bzh/mq_apis/actes/v1/search', (req, res, ctx) => {
    const query = req.url.searchParams.get('query');

    const classificationsArray = req.url.searchParams.get('classifications')?.split(',');
    const typesActesArray = req.url.searchParams.get('types_actes')?.split(',');
    const taillePageNb = Number.parseInt(req.url.searchParams.get('lignes') ?? '10', 0);
    const debutNb = req.url.searchParams.get('page_suivante') ? Number.parseInt(req.url.searchParams.get('page_suivante') ?? '0', 0) : 0;

    const dateDebut = req.url.searchParams.get('date_debut');
    const dateDebutTime = dateDebut && new Date(dateDebut).getTime();

    const dateFin = req.url.searchParams.get('date_fin');
    const dateFinTime = dateFin && new Date(dateFin).getTime();


    const filteredActes = actes.filter(a =>
      (!query || a.objet.toLocaleLowerCase().includes(query.toLocaleLowerCase())) &&
      (!classificationsArray || classificationsArray.some((x: string) => x.startsWith(a.classification_code))) &&
      (!typesActesArray || typesActesArray.includes(`${a.type}`)) &&
      (!dateDebutTime || new Date(a.date_publication).getTime() >= dateDebutTime) &&
      (!dateFinTime || new Date(a.date_publication).getTime() <= dateFinTime)
    );

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json(((): PageBack<ActeBack> => ({
        resultats: filteredActes.slice(debutNb, debutNb + taillePageNb),
        nb_resultats: filteredActes.length,
        page_suivante: (debutNb + taillePageNb >= filteredActes.length) ? '' : `${debutNb + taillePageNb}`,
      }))()),
    )
  })
];
