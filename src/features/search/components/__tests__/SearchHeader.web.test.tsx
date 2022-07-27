import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { navigate, useRoute } from '__mocks__/@react-navigation/native'
import { SearchGroupNameEnum } from 'api/gen'
import { SearchHeader } from 'features/search/components/SearchHeader'
import { LocationType } from 'features/search/enums'
import { initialSearchState } from 'features/search/pages/reducer'
import { SearchState, SearchView } from 'features/search/types'
import * as useFilterCountAPI from 'features/search/utils/useFilterCount'
import { SuggestedVenue } from 'libs/venue'
import { mockedSuggestedVenues } from 'libs/venue/fixtures/mockedSuggestedVenues'
import { render } from 'tests/utils/web'

// const venue: SuggestedVenue = mockedSuggestedVenues[0]

// const mockSearchState = initialSearchState
// const mockStagedSearchState: SearchState = {
//   ...initialSearchState,
//   offerCategories: [SearchGroupNameEnum.CINEMA],
//   locationFilter: { locationType: LocationType.VENUE, venue },
//   priceRange: [0, 20],
// }

// const mockDispatch = jest.fn()
// const mockStagedDispatch = jest.fn()
// jest.mock('features/search/pages/SearchWrapper', () => ({
//   useSearch: () => ({ searchState: mockSearchState, dispatch: mockDispatch }),
//   useStagedSearch: () => ({ searchState: mockStagedSearchState, dispatch: mockStagedDispatch }),
// }))
// jest.mock('libs/firebase/analytics')

// jest.mock('features/auth/settings')
// const mockData = { pages: [{ nbHits: 0, hits: [], page: 0 }] }
// const mockHasNextPage = true
// const mockFetchNextPage = jest.fn()
// jest.mock('features/search/pages/useSearchResults', () => ({
//   useSearchResults: () => ({
//     data: mockData,
//     hits: [],
//     nbHits: 0,
//     isFetching: false,
//     isLoading: false,
//     hasNextPage: mockHasNextPage,
//     fetchNextPage: mockFetchNextPage,
//     isFetchingNextPage: false,
//   }),
// }))

jest.spyOn(useFilterCountAPI, 'useFilterCount').mockReturnValue(3)

describe('SearchHeader component', () => {
  const searchInputID = uuidv4()

  it('should contain a button to go the search suggestion view', () => {
    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing } })
    const { queryByRole } = render(
      <SearchHeader searchInputID={searchInputID} appEnableAutocomplete={false} />
    )

    const button = queryByRole('button')

    expect(button).toHaveTextContent('Recherche par mots-clés')
  })

  it.skip('should be clickable when focusing then activating the button', async () => {
    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing } })
    const { getByRole } = render(
      <SearchHeader searchInputID={searchInputID} appEnableAutocomplete={false} />
    )
    const button = getByRole('button')
    const spyButtonClick = jest.fn()

    // stop click propagation to prevents the following jsdom's error
    // Error: Not implemented: navigation (except hash changes)
    // https://github.com/jsdom/jsdom/issues/2112#issuecomment-926601210
    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault()
        spyButtonClick()
      },
      false
    )

    await userEvent.tab()

    await userEvent.keyboard('{Enter}')

    expect(spyButtonClick).toHaveBeenCalled()
  })

  it('should navigate to the search suggestion view when focusing then activating the button', async () => {
    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing } })
    render(<SearchHeader searchInputID={searchInputID} appEnableAutocomplete={false} />)

    await userEvent.tab()

    await userEvent.keyboard('{Enter}')

    const screen = 'Search'
    const params = {
      ...initialSearchState,
      view: SearchView.Suggestions,
    }
    expect(navigate).toHaveBeenCalledWith(screen, params)
  })
})
