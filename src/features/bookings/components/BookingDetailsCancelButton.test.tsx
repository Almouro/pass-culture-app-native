import React from 'react'

import {
  BookingDetailsCancelButton,
  BookingDetailsCancelButtonProps,
} from 'features/bookings/components/BookingDetailsCancelButton'
import { fireEvent, render } from 'tests/utils'

import { bookingsSnap } from '../api/bookingsSnap'

import { Booking } from './types'

describe('<BookingDetailsCancelButton />', () => {
  it('should display the "Terminer" button for digital offers when autoActivateDigitalBookings is true', () => {
    const booking = { ...bookingsSnap.ongoing_bookings[0] }
    booking.stock.offer.isDigital = true
    booking.activationCode = {
      code: 'someCode',
    }
    const { getByTestId } = renderBookingDetailsCancelButton(booking, {
      activationCodeFeatureEnabled: true,
    })
    getByTestId('button-title-archive')
  })
  it('should display button if confirmationDate is null', () => {
    const booking = { ...bookingsSnap.ongoing_bookings[0] }
    booking.confirmationDate = null
    const { getByTestId } = renderBookingDetailsCancelButton(booking)
    getByTestId('button-title-cancel')
  })

  it('should display button if confirmation date is not expired', () => {
    const booking = { ...bookingsSnap.ongoing_bookings[0] }
    const date = new Date()
    date.setDate(date.getDate() + 1)
    booking.confirmationDate = date
    const { getByTestId } = renderBookingDetailsCancelButton(booking)
    getByTestId('button-title-cancel')
  })

  it('should not display button if confirmation date is expired', async () => {
    const booking = { ...bookingsSnap.ongoing_bookings[0] }
    booking.stock.offer.isPermanent = false
    booking.confirmationDate = new Date('2020-03-15T23:01:37.925926')
    const { queryByTestId } = renderBookingDetailsCancelButton(booking)
    expect(queryByTestId('button-title-cancel')).toBeFalsy()
  })

  it('should call onCancel', () => {
    const booking = { ...bookingsSnap.ongoing_bookings[0] }
    const date = new Date()
    date.setDate(date.getDate() + 1)
    booking.confirmationDate = date
    const onCancel = jest.fn()
    const { getByTestId } = renderBookingDetailsCancelButton(booking, {
      onCancel,
    })
    const button = getByTestId('button-container-cancel')
    fireEvent.press(button)

    expect(onCancel).toBeCalled()
  })
  it('should call onTerminate', () => {
    const booking = { ...bookingsSnap.ongoing_bookings[0], activationCode: { code: 'someCode' } }
    const onTerminate = jest.fn()
    const { getByTestId } = renderBookingDetailsCancelButton(booking, {
      activationCodeFeatureEnabled: true,
      onTerminate,
    })
    const button = getByTestId('button-container-archive')
    fireEvent.press(button)

    expect(onTerminate).toBeCalled()
  })
})

function renderBookingDetailsCancelButton(
  booking: Booking,
  props?: Omit<BookingDetailsCancelButtonProps, 'booking'>
) {
  return render(<BookingDetailsCancelButton booking={booking} {...props} />)
}
