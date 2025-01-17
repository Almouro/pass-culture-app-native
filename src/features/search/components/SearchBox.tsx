import { t } from '@lingui/macro'
import { useNavigation, useRoute } from '@react-navigation/native'
import omit from 'lodash.omit'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Insets,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  TextInputSubmitEditingEventData,
} from 'react-native'
import styled from 'styled-components/native'
import { v4 as uuidv4 } from 'uuid'

import { UseNavigationType, UseRouteType } from 'features/navigation/RootNavigator'
import { FilterButton } from 'features/search/atoms/Buttons'
import { LocationType } from 'features/search/enums'
import { useSearch, useStagedSearch } from 'features/search/pages/SearchWrapper'
import { usePushWithStagedSearch } from 'features/search/pages/usePushWithStagedSearch'
import { SearchView } from 'features/search/types'
import { useFilterCount } from 'features/search/utils/useFilterCount'
import { analytics } from 'libs/firebase/analytics'
import { HiddenAccessibleText } from 'ui/components/HiddenAccessibleText'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { ArrowPrevious as DefaultArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { getSpacing, Spacer } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'

import { useLocationChoice } from './locationChoice.utils'
import { SearchMainInput } from './SearchMainInput'

const inset = 25 // arbitrary hitSlop zone inset for touchable
const hitSlop: Insets = { top: inset, right: inset, bottom: inset, left: inset }

type Props = {
  searchInputID: string
  accessibleHiddenTitle?: string
}

export const SearchBox = function SearchBox({ searchInputID, accessibleHiddenTitle }: Props) {
  const { params } = useRoute<UseRouteType<'Search'>>()
  const { navigate } = useNavigation<UseNavigationType>()
  const { searchState: stagedSearchState, dispatch: stagedDispatch } = useStagedSearch()
  const { searchState } = useSearch()
  const [query, setQuery] = useState<string>(params?.query || '')
  const accessibilityDescribedBy = uuidv4()
  const { locationFilter } = stagedSearchState
  const { locationType } = locationFilter
  // PLACE and VENUE belong to the same section
  const section = locationType === LocationType.VENUE ? LocationType.PLACE : locationType
  const { label: locationLabel } = useLocationChoice(section)
  const pushWithStagedSearch = usePushWithStagedSearch()
  const hasEditableSearchInput =
    params?.view === SearchView.Suggestions || params?.view === SearchView.Results
  const inputRef = useRef<RNTextInput | null>(null)
  const activeFilters = useFilterCount(searchState)

  useEffect(() => {
    setQuery(params?.query || '')
  }, [params?.query])

  useEffect(() => {
    if (params?.view === SearchView.Results) {
      inputRef.current?.focus()
    }
  }, [params?.query, params?.view])

  const resetQuery = useCallback(() => {
    pushWithStagedSearch({
      query: '',
      view: SearchView.Results,
    })
  }, [pushWithStagedSearch])

  const onPressArrowBack = useCallback(() => {
    Keyboard.dismiss()
    stagedDispatch({
      type: 'SET_STATE',
      payload: { locationFilter },
    })
    pushWithStagedSearch(
      {
        query: '',
        view: SearchView.Landing,
        locationFilter,
      },
      {
        reset: true,
      }
    )
    setQuery('')
  }, [locationFilter, pushWithStagedSearch, stagedDispatch])

  const onPressLocationButton = useCallback(() => {
    navigate('LocationFilter')
  }, [navigate])

  const onSubmitQuery = useCallback(
    (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      const queryText = event.nativeEvent.text
      if (queryText.length < 1 && Platform.OS !== 'android') return
      // When we hit enter, we may have selected a category or a venue on the search landing page
      // these are the two potentially 'staged' filters that we want to commit to the global search state.
      // We also want to commit the price filter, as beneficiary users may have access to different offer
      // price range depending on their available credit.
      const { offerCategories, priceRange } = stagedSearchState
      pushWithStagedSearch({
        query: queryText,
        locationFilter,
        offerCategories,
        priceRange,
        view: SearchView.Results,
      })
      analytics.logSearchQuery(queryText)
    },
    [locationFilter, pushWithStagedSearch, stagedSearchState]
  )

  const paramsWithoutView = useMemo(() => omit(params, ['view']), [params])
  const onFocus = useCallback(() => {
    if (hasEditableSearchInput) return

    pushWithStagedSearch({
      ...paramsWithoutView,
      view: SearchView.Suggestions,
    })
  }, [paramsWithoutView, hasEditableSearchInput, pushWithStagedSearch])

  return (
    <RowContainer testID="searchBoxWithoutAutocomplete">
      {!!accessibleHiddenTitle && (
        <HiddenAccessibleText {...getHeadingAttrs(1)}>{accessibleHiddenTitle}</HiddenAccessibleText>
      )}
      <SearchInputContainer>
        {!!hasEditableSearchInput && (
          <StyledTouchableOpacity
            testID="previousButton"
            onPress={onPressArrowBack}
            hitSlop={hitSlop}>
            <ArrowPrevious />
          </StyledTouchableOpacity>
        )}
        <SearchMainInput
          ref={inputRef}
          searchInputID={searchInputID}
          query={query}
          setQuery={setQuery}
          isFocus={params?.view === SearchView.Suggestions}
          onSubmitQuery={onSubmitQuery}
          resetQuery={resetQuery}
          onFocus={onFocus}
          showLocationButton={params === undefined || params?.view === SearchView.Landing}
          locationLabel={locationLabel}
          onPressLocationButton={onPressLocationButton}
        />
        {params?.view === SearchView.Results && (
          <Fragment>
            <Spacer.Row numberOfSpaces={4} />
            <FilterButton activeFilters={activeFilters} />
          </Fragment>
        )}
      </SearchInputContainer>
      <HiddenAccessibleText nativeID={accessibilityDescribedBy}>
        {t`Indique le nom d'une offre ou d'un lieu puis lance la recherche à l'aide de la touche
          "Entrée"`}
      </HiddenAccessibleText>
    </RowContainer>
  )
}

const RowContainer = styled.View({
  flexDirection: 'row',
})

const ArrowPrevious = styled(DefaultArrowPrevious).attrs(({ theme }) => ({
  size: theme.icons.sizes.small,
}))``

const SearchInputContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

const StyledTouchableOpacity = styled(TouchableOpacity)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: 50,
  marginRight: getSpacing(4),
})
