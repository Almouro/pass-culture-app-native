import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { fireEvent, render } from 'tests/utils/web'

import { Sort } from '../Sort'

// eslint-disable-next-line local-rules/no-allow-console
allowConsole({ error: true })
describe('Sort component', () => {
  afterAll(() => jest.resetAllMocks())
  it('should navigate to Sort page on pressing', () => {
    const { getByTestId } = render(<Sort />)
    fireEvent.click(getByTestId('SortButton'))
    expect(navigate).toHaveBeenCalledWith('FavoritesSorts', undefined)
  })
})
