import mockdate from 'mockdate'
import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { venueResponseSnap } from 'features/venue/fixtures/venueResponseSnap'
import { render } from 'tests/utils'

import { Venue } from '../Venue'

mockdate.set(new Date('2021-08-15T00:00:00Z'))

jest.mock('react-query')
jest.mock('features/auth/settings')
jest.mock('features/venue/api/useVenue')
jest.mock('features/venue/api/useVenueOffers')

const venueId = venueResponseSnap.id

describe('<Venue />', () => {
  afterEach(jest.clearAllMocks)

  it('should match snapshot', async () => {
    const venue = await renderVenue(venueId)
    expect(venue).toMatchSnapshot()
  })
})

async function renderVenue(id: number) {
  useRoute.mockImplementation(() => ({ params: { id } }))
  return render(<Venue />)
}
