import { plural, t } from '@lingui/macro'
import { useIsFocused } from '@react-navigation/native'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

import { Hit, NoSearchResult, NumberOfResults } from 'features/search/atoms'
import { AutoScrollSwitch } from 'features/search/components/AutoScrollSwitch'
import { ScrollToTopButton } from 'features/search/components/ScrollToTopButton'
import { useSearch } from 'features/search/pages/SearchWrapper'
import { useSearchResults } from 'features/search/pages/useSearchResults'
import { analytics } from 'libs/firebase/analytics'
import { useIsFalseWithDelay } from 'libs/hooks/useIsFalseWithDelay'
import { SearchHit } from 'libs/search'
import { ButtonSecondary } from 'ui/components/buttons/ButtonSecondary'
import { useHeaderTransition as useOpacityTransition } from 'ui/components/headers/animationHelpers'
import { HitPlaceholder, NumberOfResultsPlaceholder } from 'ui/components/placeholders/Placeholders'
import { More } from 'ui/svg/icons/More'
import { getSpacing, Spacer } from 'ui/theme'
import { SPACE } from 'ui/theme/constants'
import { Helmet } from 'ui/web/global/Helmet'

const keyExtractor = (item: SearchHit) => item.objectID

const ANIMATION_DURATION = 700

export const SearchResults: React.FC = () => {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const flatListRef = useRef<FlatList<SearchHit> | null>(null)
  const {
    hasNextPage,
    fetchNextPage,
    refetch,
    data,
    hits,
    nbHits,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useSearchResults()
  const { searchState } = useSearch()
  const showSkeleton = useIsFalseWithDelay(isLoading, ANIMATION_DURATION)
  const isRefreshing = useIsFalseWithDelay(isFetching, ANIMATION_DURATION)
  const isFocused = useIsFocused()

  const { headerTransition: scrollButtonTransition, onScroll } = useOpacityTransition()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    // Despite the fact that the useEffect hook being called immediately,
    // scrollToOffset may not always have an effect for unknown reason,
    // debouncing scrollToOffset solves it.
    debounce(
      useCallback(() => {
        if (flatListRef && flatListRef.current) {
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
      }, [flatListRef])
    ),
    [nbHits, searchState]
  )

  const onEndReached = useCallback(() => {
    if (data && hasNextPage) {
      const [lastPage] = data.pages.slice(-1)
      if (lastPage.page > 0) analytics.logSearchScrollToPage(lastPage.page)
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage])

  const renderItem = useCallback(
    ({ item: hit, index }: { item: SearchHit; index: number }) => (
      <Hit hit={hit} query={searchState.query} index={index} />
    ),
    [searchState.query]
  )

  const ListHeaderComponent = useMemo(
    () => <NumberOfResults nbHits={nbHits} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nbHits, searchState.locationFilter.locationType]
  )
  const ListEmptyComponent = useMemo(() => <NoSearchResult />, [])

  const ListFooterComponent = useMemo(
    () => {
      const showMoreButton = !autoScrollEnabled && hits.length < nbHits
      return isFetchingNextPage && hits.length < nbHits ? (
        <React.Fragment>
          <Spacer.Column numberOfSpaces={4} />
          <ActivityIndicator />
          <Spacer.Column numberOfSpaces={4} />
          <Footer />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {!!showMoreButton && <Separator />}
          <Footer>
            {!!showMoreButton && (
              <ButtonSecondary
                mediumWidth
                icon={More}
                wording={t`Afficher plus de résultats`}
                onPress={() => {
                  const button = (
                    flatListRef.current?.getNativeScrollRef() as unknown as HTMLElement
                  ).children[0].lastChild as HTMLElement
                  const offerLink = button?.previousSibling?.firstChild?.firstChild as HTMLElement
                  offerLink.focus()
                  offerLink.blur()
                  onEndReached()
                }}
              />
            )}
          </Footer>
        </React.Fragment>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFetchingNextPage, hits.length, autoScrollEnabled]
  )

  if (showSkeleton) return <SearchResultsPlaceHolder />

  const numberOfResults = plural(nbHits, {
    one: '# résultat',
    other: '# résultats',
  })
  const searchStateQuery =
    searchState.query.length > 0
      ? SPACE +
        t({
          id: 'search query',
          values: { searchQuery: searchState.query },
          message: 'pour {searchQuery}',
        })
      : ''
  const helmetTitle = numberOfResults + searchStateQuery + ' | Recherche | pass Culture'

  return (
    <React.Fragment>
      {isFocused ? <Helmet title={helmetTitle} /> : null}
      <AutoScrollSwitch
        title={t`Activer le chargement automatique des résultats`}
        active={autoScrollEnabled}
        toggle={() => setAutoScrollEnabled((autoScroll) => !autoScroll)}
      />
      <Container testID="searchResults">
        <FlatList
          ref={flatListRef}
          testID="searchResultsFlatlist"
          data={hits}
          contentContainerStyle={contentContainerStyle}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={ListFooterComponent}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={refetch}
          onEndReached={autoScrollEnabled ? onEndReached : undefined}
          scrollEnabled={nbHits > 0}
          ListEmptyComponent={ListEmptyComponent}
          onScroll={onScroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </Container>
      {nbHits > 0 && (
        <ScrollToTopContainer>
          <ScrollToTopButton
            transition={scrollButtonTransition}
            onPress={() => {
              flatListRef.current?.scrollToOffset({ offset: 0 })
            }}
          />
          <Spacer.BottomScreen />
        </ScrollToTopContainer>
      )}
    </React.Fragment>
  )
}

const contentContainerStyle = { flexGrow: 1 }
const Container = styled.View({ flex: 1 })
const Footer = styled.View(({ theme }) => ({
  height: theme.tabBar.height + getSpacing(52),
  paddingTop: getSpacing(2),
  alignItems: 'center',
}))
const Separator = styled.View(({ theme }) => ({
  height: 2,
  backgroundColor: theme.colors.greyLight,
  marginHorizontal: getSpacing(6),
  marginVertical: getSpacing(4),
}))

const ScrollToTopContainer = styled.View(({ theme }) => ({
  alignSelf: 'center',
  position: 'absolute',
  right: getSpacing(7),
  bottom: theme.tabBar.height + getSpacing(6),
  zIndex: theme.zIndex.floatingButton,
}))

const FAVORITE_LIST_PLACEHOLDER = Array.from({ length: 20 }).map((_, index) => ({
  key: index.toString(),
}))

function SearchResultsPlaceHolder() {
  const renderItem = useCallback(() => <HitPlaceholder />, [])
  const ListHeaderComponent = useMemo(() => <NumberOfResultsPlaceholder />, [])
  const ListFooterComponent = useMemo(() => <Footer />, [])

  return (
    <React.Fragment>
      <Container>
        <FlatList
          data={FAVORITE_LIST_PLACEHOLDER}
          renderItem={renderItem}
          contentContainerStyle={contentContainerStyle}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={ListFooterComponent}
          scrollEnabled={false}
        />
      </Container>
    </React.Fragment>
  )
}
