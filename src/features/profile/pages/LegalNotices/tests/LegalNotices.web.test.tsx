import React from 'react'
import { UseQueryResult } from 'react-query'

import { UserProfileResponse } from 'api/gen'
import * as NavigationHelpers from 'features/navigation/helpers/openUrl'
import { env } from 'libs/environment'
import { flushAllPromisesWithAct, render, fireEvent } from 'tests/utils/web'

import { LegalNotices } from '../LegalNotices'

jest.mock('features/profile/api', () => ({
  useUserProfileInfo: jest.fn(
    () =>
      ({
        isLoading: false,
        data: { email: 'email2@domain.ext', firstName: 'Jean', isBeneficiary: false },
      } as UseQueryResult<UserProfileResponse>)
  ),
}))

async function renderProfile() {
  const wrapper = render(<LegalNotices />)
  await flushAllPromisesWithAct()
  return wrapper
}

describe('LegalNotices', () => {
  it('should render correctly', async () => {
    const renderAPI = await renderProfile()
    expect(renderAPI).toMatchSnapshot()
  })

  it('should navigate when the cgu row is clicked', async () => {
    const openUrl = jest.spyOn(NavigationHelpers, 'openUrl')
    const { getByText } = await renderProfile()

    const row = getByText('Conditions Générales d’Utilisation')
    fireEvent.click(row)

    expect(openUrl).toBeCalledWith(env.CGU_LINK, undefined)
  })
  it('should navigate when the data-privacy-chart row is clicked', async () => {
    const openUrl = jest.spyOn(NavigationHelpers, 'openUrl')
    const { getByText } = await renderProfile()

    const row = getByText('Charte de protection des données personnelles')
    fireEvent.click(row)

    expect(openUrl).toBeCalledWith(env.DATA_PRIVACY_CHART_LINK, undefined)
  })
})
