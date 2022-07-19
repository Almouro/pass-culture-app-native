import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import waitForExpect from 'wait-for-expect'

import { useMustUpdateApp } from 'features/forceUpdate/useMustUpdateApp'
import { useSplashScreenContext } from 'libs/splashscreen'
import { storage } from 'libs/storage'
import { render, flushAllPromisesWithAct } from 'tests/utils'

import { RootNavigator } from '../RootNavigator'

jest.mock('features/forceUpdate/useMustUpdateApp')
const mockedUseMustUpdateApp = jest.mocked(useMustUpdateApp)
jest.mock('@react-navigation/native', () => jest.requireActual('@react-navigation/native'))
jest.mock('features/profile/api') // for useUserProfileInfo()
jest.mock('features/auth/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isLoggedIn: true })),
}))
jest.mock('react-error-boundary', () => ({
  withErrorBoundary: (component: React.ReactNode, _: unknown) => component,
}))
jest.mock('features/navigation/TabBar/TabNavigator', () => ({
  TabNavigator: () => null,
}))
jest.mock('features/navigation/RootNavigator/useInitialScreenConfig', () => ({
  useInitialScreen: () => 'TabNavigator',
}))

jest.mock('features/navigation/helpers', () => ({
  useCurrentRoute: () => ({ name: 'TabNavigator', key: 'key' }),
}))

jest.mock('libs/splashscreen')
const mockUseSplashScreenContext = jest.mocked(useSplashScreenContext)

describe('<RootNavigator />', () => {
  beforeEach(() => {
    mockedUseMustUpdateApp.mockReturnValue(true)
  })

  afterEach(async () => {
    await storage.clear('has_accepted_cookie')
  })

  it('should NOT display PrivacyPolicy if splash screen is not yet hidden', async () => {
    mockedUseMustUpdateApp.mockReturnValueOnce(false)
    // eslint-disable-next-line local-rules/independant-mocks
    mockUseSplashScreenContext.mockReturnValue({ isSplashScreenHidden: false })
    const renderAPI = await renderRootNavigator()

    const privacyPolicyTitle = renderAPI.queryByText('Respect de ta vie privée')
    expect(privacyPolicyTitle).toBeFalsy()
    renderAPI.unmount()
  })

  it('should display PrivacyPolicy if splash screen is hidden', async () => {
    mockedUseMustUpdateApp.mockReturnValueOnce(false)
    // eslint-disable-next-line local-rules/independant-mocks
    mockUseSplashScreenContext.mockReturnValue({ isSplashScreenHidden: true })

    const renderAPI = await renderRootNavigator()

    await waitForExpect(() => {
      const privacyPolicyTitle = renderAPI.queryByText('Respect de ta vie privée')
      expect(privacyPolicyTitle).toBeTruthy()
    })
    renderAPI.unmount()
  })

  it('should not display quick access button in native', async () => {
    // eslint-disable-next-line local-rules/independant-mocks
    mockUseSplashScreenContext.mockReturnValue({ isSplashScreenHidden: true })

    const renderAPI = await renderRootNavigator()
    const quickAccessButton = renderAPI.queryByText('Accéder au menu de navigation')

    await waitForExpect(() => {
      expect(quickAccessButton).toBeNull()
    })
  })
})

describe('ForceUpdate display logic', () => {
  afterEach(async () => {
    await storage.clear('has_accepted_cookie')
  })

  it('should display force update page when global variable is set', async () => {
    await storage.saveObject('has_accepted_cookie', false)
    const rootNavigator = await renderRootNavigator()
    expect(rootNavigator).toMatchSnapshot()
    expect(rootNavigator.queryAllByText("Mise à jour de l'application")).toBeTruthy()
  })
})

async function renderRootNavigator() {
  const renderAPI = render(
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )

  await flushAllPromisesWithAct()
  return renderAPI
}
