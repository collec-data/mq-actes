import { Params } from "@angular/router";
import {
  ClassificationCode,
  classifications,
  SearchParams,
  ThematiqueCode,
  thematiques,
  TypeActeCode,
  typesActes
} from "./models/model";
import { addDays, parseISO, startOfDay } from "date-fns";

export const getDateDebutPublicationsEnCours = () => {
  const now = new Date();
  return startOfDay(addDays(now, -62));
}

export const queryParamsToSearchParams = (queryParams: Params): SearchParams => {
  const getThematique = (str: string): ThematiqueCode | undefined =>
    (str && str in thematiques)
      ? str as ThematiqueCode
      : undefined;

  const getTypeActe = (str: string): TypeActeCode | undefined =>
    (str && str in typesActes)
      ? str as TypeActeCode
      : undefined;

  const getClassification = (str: string): ClassificationCode | undefined =>
    (str && str in classifications)
      ? str as ClassificationCode
      : undefined;

  const getSet = <T>(str: string | undefined, codeGetter: (code: string) => T | undefined): Set<T> | undefined =>
    str
      ? new Set(
        str.split(',')
          .map(codeGetter)
          .filter((x: T | undefined) => x)
      ) as Set<T>
      : undefined;

  const getDate = (str: string | undefined): Date | undefined => {
    if (!str) {
      return undefined;
    }
    const date = parseISO(str);
    if (Number.isNaN(date.getTime())) {
      // La date est invalide.
      return undefined;
    }
    return date;
  };

  const searchParams: SearchParams = {
    query: queryParams['recherche'] ?? '',
    publications_en_cours: 'publications_en_cours' in queryParams,
    siren: queryParams['siren'],
    thematique: getThematique(queryParams['thematique']),
    classifications: getSet(queryParams['classifications'], getClassification),
    types_actes: getSet(queryParams['types_actes'], getTypeActe),
    date_debut: getDate(queryParams['date_debut']),
    date_fin: getDate(queryParams['date_fin']),
  };

  if (
    // Si le filtre publication en cours est présent
    searchParams.publications_en_cours ||
    // ou si les dates sont incorrectes (date fin avant début)
    (searchParams.date_debut && searchParams.date_fin && searchParams.date_fin < searchParams.date_debut)
  ) {
    // on supprime les dates
    delete searchParams.date_debut;
    delete searchParams.date_fin;
  }

  return searchParams;
}

export const searchParamsToQueryParams = (searchParams: SearchParams): Params => {
  return {
    recherche: searchParams.query || undefined,
    publications_en_cours: searchParams.publications_en_cours || undefined,
    siren: searchParams.siren,
    thematique: searchParams.thematique,
    classifications: searchParams.classifications && [...searchParams.classifications].join(',') || undefined,
    types_actes: searchParams.types_actes && [...searchParams.types_actes].join(',') || undefined,
    date_debut: searchParams.date_debut?.toISOString(),
    date_fin: searchParams.date_fin?.toISOString(),
  };
}
