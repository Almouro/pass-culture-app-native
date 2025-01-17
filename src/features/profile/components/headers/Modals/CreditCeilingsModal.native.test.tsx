import React from 'react'

import { CreditCeilingsModal } from 'features/profile/components/headers/Modals/CreditCeilingsModal'
import { beneficiaryUser } from 'fixtures/user'
import { fireEvent, render } from 'tests/utils'

const hideModalMock = jest.fn()

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const domainsCreditWithPhysicalCeiling = beneficiaryUser.domainsCredit!
const domainsCreditWithoutPhysicalCeiling = { ...beneficiaryUser.domainsCredit!, physical: null }

describe('<CreditCeilingsModal/>', () => {
  it('should render correctly', () => {
    const renderAPI = render(
      <CreditCeilingsModal
        domainsCredit={domainsCreditWithoutPhysicalCeiling}
        visible={true}
        hideModal={hideModalMock}
      />
    )
    expect(renderAPI).toMatchSnapshot()
  })

  it('should display nothing if modal is not visible', () => {
    const renderAPI = render(
      <CreditCeilingsModal
        domainsCredit={domainsCreditWithoutPhysicalCeiling}
        visible={false}
        hideModal={hideModalMock}
      />
    )
    expect(renderAPI.toJSON()).toBeNull()
  })

  it('should call hideModal function when clicking on Close icon', () => {
    const { getByTestId } = render(
      <CreditCeilingsModal
        domainsCredit={domainsCreditWithoutPhysicalCeiling}
        visible={true}
        hideModal={hideModalMock}
      />
    )
    const rightIcon = getByTestId('Fermer la modale')
    fireEvent.press(rightIcon)
    expect(hideModalMock).toHaveBeenCalled()
  })

  it('should display text without physical ceiling if no physical ceiling', () => {
    const { queryByTestId } = render(
      <CreditCeilingsModal
        domainsCredit={domainsCreditWithoutPhysicalCeiling}
        visible={true}
        hideModal={hideModalMock}
      />
    )
    expect(queryByTestId('creditText')).not.toBeNull()
    expect(queryByTestId('creditTextWithPhysicalCeiling')).toBeNull()
  })

  it('should display text with physical ceiling if it exists', () => {
    const { queryByTestId } = render(
      <CreditCeilingsModal
        domainsCredit={domainsCreditWithPhysicalCeiling}
        visible={true}
        hideModal={hideModalMock}
      />
    )
    expect(queryByTestId('creditText')).toBeNull()
    expect(queryByTestId('creditTextWithPhysicalCeiling')).not.toBeNull()
  })
})
