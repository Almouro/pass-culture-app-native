import React from 'react'

import { render } from 'tests/utils'

import { ShowResults } from '../ShowResults'

let mockData = { pages: [{ nbHits: 0 }] }
jest.mock('features/search/pages/useSearchResults', () => ({
  useStagedSearchResults: () => ({
    data: mockData,
    isFetching: false,
  }),
}))

describe('<ShowResults />', () => {
  it.each`
    nbHits  | expected                         | disabled
    ${0}    | ${'Aucun résultat'}              | ${true}
    ${1}    | ${'Afficher 1 résultat'}         | ${false}
    ${50}   | ${'Afficher les 50 résultats'}   | ${false}
    ${999}  | ${'Afficher les 999 résultats'}  | ${false}
    ${1200} | ${'Afficher les 999+ résultats'} | ${false}
  `(
    'should display the correct translation ($expected) and be disabled=$disabled',
    ({ nbHits, expected, disabled }) => {
      mockData = { pages: [{ nbHits }] }
      const { getByText, getByTestId } = render(<ShowResults />)
      getByText(expected)

      expect(getByTestId(expected))[disabled ? 'toBeDisabled' : 'toBeEnabled']()
    }
  )
})
