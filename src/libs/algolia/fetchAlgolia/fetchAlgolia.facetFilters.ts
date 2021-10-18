import { SearchGroupNameEnum } from 'api/gen'
import { FACETS_ENUM } from 'libs/algolia/enums'
import { FiltersArray, SearchParametersQuery } from 'libs/algolia/types'

export const buildFacetFilters = ({
  offerCategories,
  offerTypes,
  offerIsDuo,
  tags,
}: Pick<SearchParametersQuery, 'offerCategories' | 'offerTypes' | 'offerIsDuo' | 'tags'>): null | {
  facetFilters: FiltersArray
} => {
  if (offerCategories.length === 0 && offerTypes == null && offerIsDuo === false) return null

  const facetFilters: FiltersArray = []

  if (offerCategories.length > 0) {
    const categoriesPredicate = buildOfferCategoriesPredicate(offerCategories)
    facetFilters.push(categoriesPredicate)
  }

  const offerTypesPredicate = buildOfferTypesPredicate(offerTypes)
  if (offerTypesPredicate) facetFilters.push(...offerTypesPredicate)

  const offerIsDuoPredicate = buildOfferIsDuoPredicate(offerIsDuo)
  if (offerIsDuoPredicate) facetFilters.push(offerIsDuoPredicate)

  const tagsPredicate = buildTagsPredicate(tags)
  if (tagsPredicate) facetFilters.push(tagsPredicate)

  const atLeastOneFacetFilter = facetFilters.length > 0
  return atLeastOneFacetFilter ? { facetFilters } : null
}

const buildOfferCategoriesPredicate = (searchGroups: SearchGroupNameEnum[]): string[] =>
  searchGroups.map((searchGroup) => `${FACETS_ENUM.OFFER_SEARCH_GROUP_NAME}:${searchGroup}`)

const buildOfferIsDuoPredicate = (offerIsDuo: boolean): string[] | undefined =>
  offerIsDuo ? [`${FACETS_ENUM.OFFER_IS_DUO}:${offerIsDuo}`] : undefined

const buildOfferTypesPredicate = (
  offerTypes: SearchParametersQuery['offerTypes']
): FiltersArray | undefined => {
  const { isDigital, isEvent, isThing } = offerTypes
  const DIGITAL = `${FACETS_ENUM.OFFER_IS_DIGITAL}:${isDigital}`
  const EVENT = `${FACETS_ENUM.OFFER_IS_EVENT}:${isEvent}`
  const THING = `${FACETS_ENUM.OFFER_IS_THING}:${isThing}`

  if (isDigital) {
    if (!isEvent && !isThing) return [[DIGITAL]]
    if (!isEvent && isThing) return [[THING]]
    if (isEvent && !isThing) return [[DIGITAL, EVENT]]
  } else {
    if (!isEvent && isThing) return [[DIGITAL], [THING]]
    if (isEvent && !isThing) return [[EVENT]]
    if (isEvent && isThing) return [[DIGITAL]]
  }
  return undefined
}

const buildTagsPredicate = (tags: SearchParametersQuery['tags']): FiltersArray[0] | undefined => {
  if (tags.length > 0) return tags.map((tag: string) => `${FACETS_ENUM.OFFER_TAGS}:${tag}`)
  return undefined
}
