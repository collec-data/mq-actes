import { typesActes } from "src/app/models/model";

interface TypeActesFilter {
    libelle: string,
    tooltip: string,
    code: string,
}

let _typeActes: _IndexableTypesActesInfo = typesActes

let _typeActesTooltip: _IndexableTypesActesInfo = {
  '1': 'Acte comprenant la décision de l’assemblée délibérante, sans les débats.',
  '2': 'Décision administrative à portée générale et impersonnelle. Exemple : arrêté pris par un maire ou un président de conseil départemental ou régional.',
  '3': "Décision concernant une ou plusieurs personnes. Exemple : octroi d'un permis de construire",
  '5': "Actes liés aux budgets des collectivités",
  '6': "Tous les autres actes",
  '71': "Liste des délibérations prises lors d'un conseil",
  '72': "Acte relevant des pouvoirs propres du maire. Les arrêtés temporaires ne sont pas définitifs. Exemples : arrêtés de voirie, de circulation et d’occupation temporaire du domaine public.",
  '73': "Document qui fait foi en matière de déroulement des séances de conseil",
  '74': "Acte administratif permanent relevant des pouvoirs propres au maire et non soumis au contrôle de légalité. Exemples : arrêté permanent de voirie, de circulation, de stationnement et/ou de travaux."
};

const _typeActesOrder = [
  '73', '71', '72', '74',
  '1', '2', '3', '5', '6',
];

function _typeActeFilters(): TypeActesFilter[] {

    let res = []
    for (const key of _typeActesOrder) {

        let tooltip = _typeActesTooltip[key];
        let libelle = _typeActes[key]
        let code = key;

        let filter: TypeActesFilter = {
            tooltip,
            code,
            libelle,
        }
        res.push(filter)
    }
    return res
}

export const typeActeFilters = _typeActeFilters()

interface _IndexableTypesActesInfo {
    [key: string]: string
}
