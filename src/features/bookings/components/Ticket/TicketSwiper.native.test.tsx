import React from 'react'

import { bookingsSnap } from 'features/bookings/api/bookingsSnap'
import { TicketSwiper } from 'features/bookings/components/Ticket/TicketSwiper'
import { render } from 'tests/utils'

const booking = bookingsSnap.ongoing_bookings[1]

describe('<TicketSwiper/>', () => {
  it('should display ticket without external bookings information if there are no external bookings', () => {
    booking.externalBookings = null
    const { queryByTestId } = render(<TicketSwiper booking={booking} />)
    expect(queryByTestId('ticket-without-external-bookings-information')).toBeNull()
    expect(queryByTestId('ticket-with-external-bookings-information')).toBeNull()
  })

  it('should display ticket without external bookings information if there are no external bookings', () => {
    booking.externalBookings = []
    const { queryByTestId } = render(<TicketSwiper booking={booking} />)
    expect(queryByTestId('ticket-without-external-bookings-information')).toBeTruthy()
  })

  it('should display one ticket with external bookings information if there are one external booking', () => {
    booking.externalBookings = [{ barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A12' }]
    const { queryByTestId } = render(<TicketSwiper booking={booking} />)
    expect(queryByTestId('ticket-with-external-bookings-information')).toBeTruthy()
  })

  it('should display as many tickets as the number of tickets', () => {
    booking.externalBookings = [
      { barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A12' },
      { barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A13' },
    ]
    const { queryAllByTestId } = render(<TicketSwiper booking={booking} />)
    expect(queryAllByTestId('ticket-with-external-bookings-information').length).toEqual(2)
  })

  describe('Swiper ticket controls', () => {
    it('should not show if number of ticket is equal to one', () => {
      booking.externalBookings = [{ barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A12' }]
      const { queryByTestId } = render(<TicketSwiper booking={booking} />)
      expect(queryByTestId('swiper-tickets-controls')).toBeNull()
    })

    it('should show if number of ticket is greater than one', () => {
      booking.externalBookings = [
        { barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A12' },
        { barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A13' },
      ]
      const { queryByTestId } = render(<TicketSwiper booking={booking} />)
      expect(queryByTestId('swiper-tickets-controls')).toBeTruthy()
    })
  })
})
