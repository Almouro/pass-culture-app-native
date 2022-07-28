import { StackScreenProps } from '@react-navigation/stack'
import mockdate from 'mockdate'
import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { PhoneValidationTooManySMSSent } from 'features/auth/signup/PhoneValidation/PhoneValidationTooManySMSSent'
import { usePhoneValidationRemainingAttempts } from 'features/identityCheck/api/api'
import { navigateToHomeConfig } from 'features/navigation/helpers'
import { navigateFromRef } from 'features/navigation/navigationRef'
import { RootStackParamList } from 'features/navigation/RootNavigator'
import { fireEvent, render } from 'tests/utils'

jest.mock('features/navigation/helpers')
jest.mock('features/navigation/navigationRef')

jest.mock('features/identityCheck/api/api', () => {
  return {
    usePhoneValidationRemainingAttempts: jest.fn().mockReturnValue({
      remainingAttempts: 0,
      counterResetDatetime: '2022-07-08T13:30:00Z',
      isLastAttempt: false,
    }),
  }
})

const navigationProps = {
  route: {
    params: {
      phoneNumber: '0612345678',
      countryCode: 'FR',
    },
  },
} as StackScreenProps<RootStackParamList, 'PhoneValidationTooManySMSSent'>

const mockedPhoneValidationRemainingAttempts = usePhoneValidationRemainingAttempts as jest.Mock

describe('PhoneValidationTooManySMSSent', () => {
  beforeAll(() => {
    mockdate.set(new Date('2022-07-08T13:00:00Z'))
  })
  it('should display "1 heure" in description', async () => {
    const { getByText } = renderPhoneValidationTooManySMSSent()
    expect(getByText('Tu pourras réessayer dans 1 heure.')).toBeTruthy()
  })
  it('should display "2 heures" in description', async () => {
    mockedPhoneValidationRemainingAttempts.mockReturnValueOnce({
      remainingAttempts: 0,
      counterResetDatetime: '2022-07-08T19:30:00Z',
      isLastAttempt: false,
    })
    const { getByText } = renderPhoneValidationTooManySMSSent()
    expect(getByText('Tu pourras réessayer dans 7 heures.')).toBeTruthy()
  })
  it('should redirect to Home when clicking on homepage button', async () => {
    const { getByText } = renderPhoneValidationTooManySMSSent()

    fireEvent.press(getByText("Retourner à l'accueil"))

    expect(navigateFromRef).toBeCalledWith(navigateToHomeConfig.screen, navigateToHomeConfig.params)
  })
  it('should redirect to SetPhoneValidationCode when clicking on second button', async () => {
    const { getByText } = renderPhoneValidationTooManySMSSent()

    fireEvent.press(getByText("J'ai reçu mon code"))

    expect(navigate).toBeCalledWith('SetPhoneValidationCode', {
      countryCode: 'FR',
      phoneNumber: '0612345678',
    })
  })
})

function renderPhoneValidationTooManySMSSent() {
  return render(<PhoneValidationTooManySMSSent {...navigationProps} />)
}
