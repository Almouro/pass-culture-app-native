import AlgoliaSearchInsights from 'search-insights'

import { logOfferConversion } from 'libs/algolia/analytics/logOfferConversion'
import { captureMonitoringError } from 'libs/monitoring'
import { getCookiesConsent } from 'libs/trackingConsent/consent'

jest.mock('search-insights')
const mockAlgoliaSearchInsights = AlgoliaSearchInsights as jest.MockedFunction<
  typeof AlgoliaSearchInsights
>

jest.mock('libs/monitoring')
const mockCaptureMonitoringError = captureMonitoringError as jest.MockedFunction<
  typeof captureMonitoringError
>

jest.mock('libs/trackingConsent/consent')
const mockGetConsentToCookies = getCookiesConsent as jest.MockedFunction<typeof getCookiesConsent>
mockGetConsentToCookies.mockResolvedValue(true)

describe('logOfferConversion', () => {
  it('should send the corresponding Algolia conversion event when called', async () => {
    await logOfferConversion('abc123')('object123')

    expect(mockAlgoliaSearchInsights).toBeCalledWith('convertedObjectIDsAfterSearch', {
      eventName: 'Offer reserved',
      index: 'algoliaOffersIndexName',
      objectIDs: ['object123'],
      queryID: 'abc123',
    })
  })
  it('should raise a warning instead of sending an event when called without a queryID set', async () => {
    await logOfferConversion()('object123')

    expect(mockAlgoliaSearchInsights).not.toBeCalled()
    expect(mockCaptureMonitoringError).toBeCalledWith(
      'Algolia Analytics: useLogOfferConversion called without any QueryID set'
    )
  })
  it("should not send an Algolia conversion event when user didn't accept cookies", async () => {
    mockGetConsentToCookies.mockResolvedValueOnce(false)

    await logOfferConversion('abc123')('object123')

    expect(mockAlgoliaSearchInsights).not.toBeCalled()
  })
})
