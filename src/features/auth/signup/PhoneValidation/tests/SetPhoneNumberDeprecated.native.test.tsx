import * as React from 'react'
import { useMutation } from 'react-query'
import waitForExpect from 'wait-for-expect'

import { navigate } from '__mocks__/@react-navigation/native'
import { SetPhoneNumberDeprecated } from 'features/auth/signup/PhoneValidation/SetPhoneNumberDeprecated'
import { currentTimestamp } from 'libs/dates'
import { storage } from 'libs/storage'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import {
  act,
  fireEvent,
  flushAllPromises,
  render,
  superFlushWithAct,
  useMutationFactory,
} from 'tests/utils'

jest.mock('react-query')

const mockedUseMutation = useMutation as jest.Mock
const useMutationCallbacks: { onError: (error: unknown) => void; onSuccess: () => void } = {
  onSuccess: () => {},
  onError: () => {},
}

let mockTimeSinceLastRequest = -1 // not initialized
jest.mock('libs/timer', () => ({
  useTimer: jest.fn(() => mockTimeSinceLastRequest),
}))

let mockedSendSetPhoneNumberCode = jest.fn()

describe('SetPhoneNumber', () => {
  beforeEach(() => {
    mockedSendSetPhoneNumberCode = mockedUseMutation.mockImplementation(
      useMutationFactory(useMutationCallbacks)
    )
  })

  afterEach(async () => {
    await storage.clear('phone_validation_code_asked_at')
    navigate.mockReset()
  })

  describe('button "Continuer"', () => {
    it('should enable the button when the phone number is valid', async () => {
      const { getByTestId, getByPlaceholderText } = renderSetPhoneNumber()
      await superFlushWithAct()

      const button = getByTestId('Continuer')

      expect(button).toBeDisabled()

      const input = getByPlaceholderText('06 12 34 56 78')
      fireEvent.changeText(input, '612345678')

      expect(button).toBeEnabled()
    })

    it.each([
      '', // empty
      '03', // too short (min 6)
      '62435463579', // too long (max 10)
      '33224354m', // includes char
    ])('should disable the button when the phone number is not valid (%s)', async (phoneNumber) => {
      const { getByTestId, getByPlaceholderText } = renderSetPhoneNumber()
      await superFlushWithAct()

      const button = getByTestId('Continuer')

      expect(button).toBeDisabled()

      const input = getByPlaceholderText('06 12 34 56 78')
      fireEvent.changeText(input, phoneNumber)

      await waitForExpect(() => expect(button).toBeDisabled())
    })

    it('should navigate to SetPhoneNumberCode on /send_phone_validation request success', async () => {
      const { getByTestId, getByPlaceholderText } = renderSetPhoneNumber()
      await superFlushWithAct()

      const button = getByTestId('Continuer')
      const input = getByPlaceholderText('06 12 34 56 78')
      fireEvent.changeText(input, '612345678')
      fireEvent.press(button)

      await act(async () => {
        useMutationCallbacks.onSuccess()
      })
      expect(navigate).toHaveBeenCalledWith('SetPhoneValidationCodeDeprecated', {
        countryCode: 'FR',
        phoneNumber: '612345678',
      })
    })

    it('should display input error message if validate phone number request fails', async () => {
      const response = {
        content: {
          code: 'INVALID_PHONE_NUMBER',
          message: 'Le numéro est invalide.',
        },
        name: 'ApiError',
      }

      const { getByTestId, getByPlaceholderText, getByText, rerender } = renderSetPhoneNumber()
      await superFlushWithAct()

      const continueButton = getByTestId('Continuer')
      const input = getByPlaceholderText('06 12 34 56 78')
      fireEvent.changeText(input, '600000000')

      rerender(<SetPhoneNumberDeprecated />)

      fireEvent.press(continueButton)

      await act(async () => {
        useMutationCallbacks.onError(response)
      })

      const errorMessage = getByText('Le numéro est invalide.')
      await waitForExpect(() => {
        expect(errorMessage).toBeTruthy()
      })
    })

    it.each([
      ['', 'null', 'Continuer', -1, null, 1], // first call (-1 means timer is not initialized)
      ['', '> 1 min', 'Continuer', 65, currentTimestamp() - 65, 1], // last call was made 65 seconds ago
      ['NOT', '< 1 min', /Attends/, 5, currentTimestamp() - 5, 0], // last call was made 5 seconds ago
    ])(
      'should %s call sendSetPhoneNumberCode mutation if SetPhoneNumber if last request timestamp is %s',
      async (_should, _label, buttonTestId, timeSinceLastRequest, storageValue, numberOfCall) => {
        await storage.saveObject('phone_validation_code_asked_at', storageValue)

        mockTimeSinceLastRequest = timeSinceLastRequest

        const { getByTestId, getByPlaceholderText } = renderSetPhoneNumber()
        await superFlushWithAct()

        const button = getByTestId(buttonTestId)
        const input = getByPlaceholderText('06 12 34 56 78')
        fireEvent.changeText(input, '612345678')
        fireEvent.press(button)

        await flushAllPromises()

        const sendSetPhoneNumberCode = mockedSendSetPhoneNumberCode().mutate
        expect(sendSetPhoneNumberCode).toHaveBeenCalledTimes(numberOfCall)
      }
    )

    it('should navigate to SetPhoneNumberTooManySMSSent page if request fails with TOO_MANY_SMS_SENT code', async () => {
      const response = {
        content: {
          code: 'TOO_MANY_SMS_SENT',
          message: 'Le nombre de tentatives maximal est dépassé',
        },
        name: 'ApiError',
      }

      const { getByTestId, getByPlaceholderText } = renderSetPhoneNumber()
      await superFlushWithAct()

      const button = getByTestId('Continuer')
      const input = getByPlaceholderText('06 12 34 56 78')
      fireEvent.changeText(input, '612345678')
      fireEvent.press(button)

      await act(async () => {
        useMutationCallbacks.onError(response)
      })
      expect(navigate).toHaveBeenCalledWith('PhoneValidationTooManySMSSent', {
        countryCode: 'FR',
        phoneNumber: '612345678',
      })
    })
  })
})

function renderSetPhoneNumber() {
  return render(<SetPhoneNumberDeprecated />, {
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    wrapper: ({ children }) => reactQueryProviderHOC(children),
  })
}
