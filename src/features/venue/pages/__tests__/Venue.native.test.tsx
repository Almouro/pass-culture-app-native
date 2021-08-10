import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { venueResponseSnap } from 'features/venue/fixtures/venueResponseSnap'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { render, waitFor, superFlushWithAct } from 'tests/utils'

import { Venue } from '../Venue'

jest.mock('react-query')

jest.mock('features/venue/api/useVenue')

jest.mock('features/venue/api/useVenueOffers')

const venueId = venueResponseSnap.id

describe('<Venue />', () => {
  afterEach(jest.clearAllMocks)

  it('should match snapshot', async () => {
    const venue = await renderVenue(venueId)
    await superFlushWithAct()
    expect(venue).toMatchSnapshot()
  })
})

async function renderVenue(id: number) {
  useRoute.mockImplementation(() => ({ params: { id } }))
  const wrapper = render(<Venue />, { wrapper: ({ children }) => reactQueryProviderHOC(children) })
  await waitFor(() => wrapper.getByTestId('Page de détail du lieu'))
  return wrapper
}