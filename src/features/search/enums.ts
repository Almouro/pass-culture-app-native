import { SearchGroupNameEnum, VenueTypeCodeKey } from 'api/gen'
import { MAP_VENUE_TYPE_TO_LABEL, VenueTypeCode } from 'libs/parsers'
import { categoriesIcons } from 'ui/svg/icons/bicolor/exports/categoriesIcons'
import { BicolorIconInterface } from 'ui/svg/icons/types'

export enum DATE_FILTER_OPTIONS {
  TODAY = 'today',
  CURRENT_WEEK = 'currentWeek',
  CURRENT_WEEK_END = 'currentWeekEnd',
  USER_PICK = 'picked',
}

export enum LocationType {
  AROUND_ME = 'AROUND_ME',
  EVERYWHERE = 'EVERYWHERE',
  PLACE = 'PLACE',
  VENUE = 'VENUE',
}

type CategoryCriteria = {
  [category in SearchGroupNameEnum]: {
    icon: React.FC<BicolorIconInterface>
    facetFilter: SearchGroupNameEnum
  }
}

export const CATEGORY_CRITERIA: CategoryCriteria = {
  [SearchGroupNameEnum.NONE]: {
    icon: categoriesIcons.All,
    facetFilter: SearchGroupNameEnum.NONE,
  },
  [SearchGroupNameEnum.CARTES_JEUNES]: {
    icon: categoriesIcons.Card,
    facetFilter: SearchGroupNameEnum.CARTES_JEUNES,
  },
  [SearchGroupNameEnum.FILMS_SERIES_CINEMA]: {
    icon: categoriesIcons.Cinema,
    facetFilter: SearchGroupNameEnum.FILMS_SERIES_CINEMA,
  },
  [SearchGroupNameEnum.MUSEES_VISITES_CULTURELLES]: {
    icon: categoriesIcons.Museum,
    facetFilter: SearchGroupNameEnum.MUSEES_VISITES_CULTURELLES,
  },
  [SearchGroupNameEnum.CD_VINYLE_MUSIQUE_EN_LIGNE]: {
    icon: categoriesIcons.Music,
    facetFilter: SearchGroupNameEnum.CD_VINYLE_MUSIQUE_EN_LIGNE,
  },
  [SearchGroupNameEnum.CONCERTS_FESTIVALS]: {
    icon: categoriesIcons.Show,
    facetFilter: SearchGroupNameEnum.CONCERTS_FESTIVALS,
  },
  [SearchGroupNameEnum.ARTS_LOISIRS_CREATIFS]: {
    icon: categoriesIcons.Workshop,
    facetFilter: SearchGroupNameEnum.ARTS_LOISIRS_CREATIFS,
  },
  [SearchGroupNameEnum.LIVRES]: {
    icon: categoriesIcons.Book,
    facetFilter: SearchGroupNameEnum.LIVRES,
  },
  [SearchGroupNameEnum.MEDIA_PRESSE]: {
    icon: categoriesIcons.Press,
    facetFilter: SearchGroupNameEnum.MEDIA_PRESSE,
  },
  [SearchGroupNameEnum.JEU]: {
    icon: categoriesIcons.VideoGame,
    facetFilter: SearchGroupNameEnum.JEU,
  },
  [SearchGroupNameEnum.CONFERENCE]: {
    icon: categoriesIcons.Conference,
    facetFilter: SearchGroupNameEnum.CONFERENCE,
  },
  [SearchGroupNameEnum.INSTRUMENT]: {
    icon: categoriesIcons.Instrument,
    facetFilter: SearchGroupNameEnum.INSTRUMENT,
  },
  [SearchGroupNameEnum.MATERIEL]: {
    icon: categoriesIcons.ArtsMaterial,
    facetFilter: SearchGroupNameEnum.MATERIEL,
  },
}

type VenueTypeCriteria = { ALL: { label: string; facetFilter: '' } } & {
  [venueType in VenueTypeCode]: { label: string; facetFilter: VenueTypeCode }
}

export const VENUE_TYPE_CRITERIA: VenueTypeCriteria = {
  ALL: {
    label: 'Tous les types de lieu',
    facetFilter: '',
  },
  [VenueTypeCodeKey.ARTISTIC_COURSE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.ARTISTIC_COURSE],
    facetFilter: VenueTypeCodeKey.ARTISTIC_COURSE,
  },
  [VenueTypeCodeKey.BOOKSTORE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.BOOKSTORE],
    facetFilter: VenueTypeCodeKey.BOOKSTORE,
  },
  [VenueTypeCodeKey.CONCERT_HALL]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.CONCERT_HALL],
    facetFilter: VenueTypeCodeKey.CONCERT_HALL,
  },
  [VenueTypeCodeKey.CREATIVE_ARTS_STORE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.CREATIVE_ARTS_STORE],
    facetFilter: VenueTypeCodeKey.CREATIVE_ARTS_STORE,
  },
  [VenueTypeCodeKey.CULTURAL_CENTRE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.CULTURAL_CENTRE],
    facetFilter: VenueTypeCodeKey.CULTURAL_CENTRE,
  },
  [VenueTypeCodeKey.DIGITAL]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.DIGITAL],
    facetFilter: VenueTypeCodeKey.DIGITAL,
  },
  [VenueTypeCodeKey.FESTIVAL]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.FESTIVAL],
    facetFilter: VenueTypeCodeKey.FESTIVAL,
  },
  [VenueTypeCodeKey.GAMES]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.GAMES],
    facetFilter: VenueTypeCodeKey.GAMES,
  },
  [VenueTypeCodeKey.LIBRARY]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.LIBRARY],
    facetFilter: VenueTypeCodeKey.LIBRARY,
  },
  [VenueTypeCodeKey.MUSEUM]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.MUSEUM],
    facetFilter: VenueTypeCodeKey.MUSEUM,
  },
  [VenueTypeCodeKey.MUSICAL_INSTRUMENT_STORE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.MUSICAL_INSTRUMENT_STORE],
    facetFilter: VenueTypeCodeKey.MUSICAL_INSTRUMENT_STORE,
  },
  [VenueTypeCodeKey.MOVIE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.MOVIE],
    facetFilter: VenueTypeCodeKey.MOVIE,
  },
  [VenueTypeCodeKey.OTHER]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.OTHER],
    facetFilter: VenueTypeCodeKey.OTHER,
  },
  [VenueTypeCodeKey.PATRIMONY_TOURISM]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.PATRIMONY_TOURISM],
    facetFilter: VenueTypeCodeKey.PATRIMONY_TOURISM,
  },
  [VenueTypeCodeKey.PERFORMING_ARTS]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.PERFORMING_ARTS],
    facetFilter: VenueTypeCodeKey.PERFORMING_ARTS,
  },
  [VenueTypeCodeKey.RECORD_STORE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.RECORD_STORE],
    facetFilter: VenueTypeCodeKey.RECORD_STORE,
  },
  [VenueTypeCodeKey.SCIENTIFIC_CULTURE]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.SCIENTIFIC_CULTURE],
    facetFilter: VenueTypeCodeKey.SCIENTIFIC_CULTURE,
  },
  [VenueTypeCodeKey.VISUAL_ARTS]: {
    label: MAP_VENUE_TYPE_TO_LABEL[VenueTypeCodeKey.VISUAL_ARTS],
    facetFilter: VenueTypeCodeKey.VISUAL_ARTS,
  },
}
