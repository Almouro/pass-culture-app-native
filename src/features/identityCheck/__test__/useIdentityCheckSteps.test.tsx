import { nextSubscriptionStepFixture as mockStep } from 'features/identityCheck/__mocks__/nextSubscriptionStepFixture'
import { initialIdentityCheckState as mockState } from 'features/identityCheck/context/reducer'
import { useIdentityCheckSteps } from 'features/identityCheck/useIdentityCheckSteps'

let mockNextSubscriptionStep = mockStep
let mockIdentityCheckState = mockState

jest.mock('features/auth/signup/useNextSubscriptionStep', () => ({
  useNextSubscriptionStep: jest.fn(() => ({
    data: mockNextSubscriptionStep,
  })),
}))

jest.mock('features/identityCheck/context/IdentityCheckContextProvider', () => ({
  useIdentityCheckContext: jest.fn(() => ({
    dispatch: jest.fn(),
    ...mockIdentityCheckState,
  })),
}))

describe('useIdentityCheckSteps', () => {
  beforeEach(jest.clearAllMocks)

  it('should return 3 steps if stepperIncludesPhoneValidation is false', () => {
    const steps = useIdentityCheckSteps()
    expect(steps.length).toEqual(3)
  })
  it('should return 4 steps if stepperIncludesPhoneValidation is true', () => {
    mockNextSubscriptionStep = {
      ...mockStep,
      stepperIncludesPhoneValidation: true,
    }
    const steps = useIdentityCheckSteps()
    expect(steps.length).toEqual(4)
  })
  it('should include IdentityCheckSchoolType if reducer has school types', () => {
    mockNextSubscriptionStep = {
      ...mockStep,
      stepperIncludesPhoneValidation: false,
    }
    mockIdentityCheckState = {
      ...mockState,
      profile: { ...mockState.profile, hasSchoolTypes: true },
    }
    const steps = useIdentityCheckSteps()
    expect(steps[0].screens.includes('IdentityCheckSchoolType')).toEqual(true)
  })
  it('should not include IdentityCheckSchoolType if reducer doesnnt have school types', () => {
    mockIdentityCheckState = {
      ...mockState,
      profile: { ...mockState.profile, hasSchoolTypes: false },
    }
    const steps = useIdentityCheckSteps()
    expect(steps[0].screens.includes('IdentityCheckSchoolType')).toEqual(false)
  })
})
