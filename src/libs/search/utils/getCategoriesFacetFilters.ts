import { SearchGroupNameEnum } from 'api/gen'
import { CATEGORY_CRITERIA } from 'features/search/enums'

// Mapping from contentful label to corresponding search group
const CONTENTFUL_LABELS: Record<string, SearchGroupNameEnum> = {
  ['Cinéma']: SearchGroupNameEnum.FILMS_SERIES_CINEMA,
  ['Conférences, rencontres']: SearchGroupNameEnum.RENCONTRES_CONFERENCES,
  ['Cours, ateliers']: SearchGroupNameEnum.ARTS_LOISIRS_CREATIFS,
  ['Films, séries, podcasts']: SearchGroupNameEnum.FILMS_SERIES_CINEMA,
  ['Instruments de musique']: SearchGroupNameEnum.INSTRUMENTS,
  ['Jeux vidéos']: SearchGroupNameEnum.JEUX_JEUX_VIDEOS,
  ['Livres']: SearchGroupNameEnum.LIVRES,
  ['Matériel arts créatifs']: SearchGroupNameEnum.ARTS_LOISIRS_CREATIFS,
  ['Musique']: SearchGroupNameEnum.CD_VINYLE_MUSIQUE_EN_LIGNE,
  ['Presse']: SearchGroupNameEnum.MEDIA_PRESSE,
  ['Spectacles']: SearchGroupNameEnum.CONCERTS_FESTIVALS,
  ['Visites, expositions']: SearchGroupNameEnum.MUSEES_VISITES_CULTURELLES,
}

export const getCategoriesFacetFilters = (categoryLabel: string): SearchGroupNameEnum => {
  const searchGroup = categoryLabel in CONTENTFUL_LABELS ? CONTENTFUL_LABELS[categoryLabel] : null
  return searchGroup ? CATEGORY_CRITERIA[searchGroup].facetFilter : SearchGroupNameEnum.NONE
}
