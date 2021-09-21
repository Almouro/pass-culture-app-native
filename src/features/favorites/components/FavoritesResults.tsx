import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

import { FavoriteOfferResponse, FavoriteResponse } from 'api/gen'
import { BookingOfferModal } from 'features/bookOffer/pages/BookingOfferModal'
import { Sort } from 'features/favorites/atoms/Buttons/Sort'
import { Favorite } from 'features/favorites/atoms/Favorite'
import { NumberOfResults } from 'features/favorites/atoms/NumberOfResults'
import { NoFavoritesResult } from 'features/favorites/components/NoFavoritesResult'
import { FavoriteSortBy } from 'features/favorites/pages/FavoritesSorts'
import { useFavoritesState } from 'features/favorites/pages/FavoritesWrapper'
import { useFavorites } from 'features/favorites/pages/useFavorites'
import {
  sortByAscendingPrice,
  sortByDistanceAroundMe,
  sortByIdDesc,
} from 'features/favorites/pages/utils/sorts'
import { useUserProfileInfo } from 'features/home/api'
import { useAvailableCredit } from 'features/home/services/useAvailableCredit'
import { HitPlaceholder, NumberOfResultsPlaceholder } from 'features/search/components/Placeholders'
import { useGeolocation, GeoCoordinates } from 'libs/geolocation'
import { ColorsEnum, getSpacing, Spacer, TAB_BAR_COMP_HEIGHT } from 'ui/theme'

const keyExtractor = (item: FavoriteResponse) => item.id.toString()

function applySortBy(
  list: Array<FavoriteResponse>,
  sortBy: FavoriteSortBy,
  position: GeoCoordinates | null
) {
  if (sortBy === 'ASCENDING_PRICE') {
    list.sort(sortByAscendingPrice)
    return list
  } else if (sortBy === 'AROUND_ME') {
    list.sort(sortByDistanceAroundMe(position))
    return list
  } else if (sortBy === 'RECENTLY_ADDED') {
    list.sort(sortByIdDesc)
    return list
  } else {
    return list
  }
}

export const FavoritesResults: React.FC = React.memo(function FavoritesResults() {
  const [offerToBook, setOfferToBook] = useState<FavoriteOfferResponse | null>(null)
  const flatListRef = useRef<FlatList<FavoriteResponse> | null>(null)
  const favoritesState = useFavoritesState()
  const { position } = useGeolocation()
  const { data, isLoading } = useFavorites()

  const sortedFavorites = useMemo(() => {
    if (!data) {
      return undefined
    }
    return !favoritesState.sortBy
      ? data.favorites
      : applySortBy(data.favorites, favoritesState.sortBy, position)
  }, [data, favoritesState, position])

  const { data: user } = useUserProfileInfo()
  const credit = useAvailableCredit()

  useEffect(() => {
    if (flatListRef && flatListRef.current)
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }, [favoritesState.sortBy])

  const renderItem = useCallback(
    ({ item: favorite }: { item: FavoriteResponse }) => {
      if (!user || !credit) return <HitPlaceholder />
      return (
        <Favorite credit={credit} favorite={favorite} user={user} onInAppBooking={setOfferToBook} />
      )
    },
    [credit, favoritesState, user, setOfferToBook]
  )

  const ListHeaderComponent = useMemo(
    () => <NumberOfResults nbFavorites={sortedFavorites ? sortedFavorites.length : 0} />,
    [sortedFavorites?.length]
  )
  const ListEmptyComponent = useMemo(() => <NoFavoritesResult />, [])
  const ListFooterComponent = useMemo(
    () => (sortedFavorites?.length ? <Spacer.Column numberOfSpaces={52} /> : null),
    [sortedFavorites?.length]
  )

  if (isLoading || !data) return <FavoritesResultsPlaceHolder />

  return (
    <React.Fragment>
      {!!offerToBook && (
        <BookingOfferModal
          visible
          dismissModal={() => setOfferToBook(null)}
          offerId={offerToBook.id}
        />
      )}
      <Container>
        <FlatList
          ref={flatListRef}
          testID="favoritesResultsFlatlist"
          data={sortedFavorites}
          contentContainerStyle={contentContainerStyle}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          renderItem={renderItem}
          onEndReachedThreshold={0.9}
          scrollEnabled={sortedFavorites && sortedFavorites.length > 0}
          ListEmptyComponent={ListEmptyComponent}
          initialNumToRender={10}
        />
      </Container>
      {!!(sortedFavorites && sortedFavorites.length > 0) && (
        <SortContainer>
          <Sort />
          <Spacer.BottomScreen />
        </SortContainer>
      )}
    </React.Fragment>
  )
})

const contentContainerStyle = {
  flexGrow: 1,
  paddingBottom: TAB_BAR_COMP_HEIGHT + getSpacing(4),
}
const Container = styled.View({ height: '100%' })

const Separator = styled.View({
  height: 2,
  backgroundColor: ColorsEnum.GREY_LIGHT,
  marginHorizontal: getSpacing(6),
  marginVertical: getSpacing(4),
})

const SortContainer = styled.View({
  alignSelf: 'center',
  position: 'absolute',
  bottom: TAB_BAR_COMP_HEIGHT + getSpacing(6),
})

const FAVORITE_LIST_PLACEHOLDER = Array.from({ length: 20 }).map((_, index) => ({
  key: index.toString(),
}))

const FavoritesResultsPlaceHolder = () => {
  const renderItem = useCallback(() => <HitPlaceholder />, [])
  const ListHeaderComponent = useMemo(() => <NumberOfResultsPlaceholder />, [])

  return (
    <React.Fragment>
      <Container testID="FavoritesResultsPlaceHolder">
        <FlatList
          data={FAVORITE_LIST_PLACEHOLDER}
          renderItem={renderItem}
          contentContainerStyle={contentContainerStyle}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={Separator}
          scrollEnabled={false}
        />
      </Container>
      <SortContainer>
        <Sort />
        <Spacer.BottomScreen />
      </SortContainer>
    </React.Fragment>
  )
}
