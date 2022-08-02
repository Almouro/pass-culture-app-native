import { domains_credit_v1 } from 'features/profile/components/headers/fixtures/domainsCredit'

import { getCreditModal } from './getCreditModal'

const exhaustedCredit = { ...domains_credit_v1, all: { ...domains_credit_v1.all, remaining: 0 } }

describe('getCreditModal()', () => {
  it('should return ExpiredCreditModal if deposit is expired', async () => {
    const { creditModal } = getCreditModal({
      domainsCredit: domains_credit_v1,
      isUserUnderageBeneficiary: false,
      isDepositExpired: true,
    })

    expect(creditModal?.name).toBe('ExpiredCreditModal')
  })

  it('should return ExhaustedCreditModal if deposit is exhausted', async () => {
    const { creditModal } = getCreditModal({
      domainsCredit: exhaustedCredit,
      isUserUnderageBeneficiary: false,
      isDepositExpired: false,
    })

    expect(creditModal?.name).toBe('ExhaustedCreditModal')
  })

  it('should return ExpiredCreditModal if deposit is expired AND deposit is exhausted', async () => {
    const { creditModal } = getCreditModal({
      domainsCredit: exhaustedCredit,
      isUserUnderageBeneficiary: false,
      isDepositExpired: true,
    })

    expect(creditModal?.name).toBe('ExpiredCreditModal')
  })

  it('should return CreditCeilingsModal if deposit is not expired and not exhausted', async () => {
    const { creditModal } = getCreditModal({
      domainsCredit: domains_credit_v1,
      isUserUnderageBeneficiary: false,
      isDepositExpired: false,
    })

    expect(creditModal?.name).toBe('CreditCeilingsModal')
  })

  it('should return null for creditModal if deposit is not expired and not exhausted and beneficiary is underage', async () => {
    const { creditModal } = getCreditModal({
      domainsCredit: domains_credit_v1,
      isUserUnderageBeneficiary: true,
      isDepositExpired: false,
    })

    expect(creditModal).toBeNull()
  })
})