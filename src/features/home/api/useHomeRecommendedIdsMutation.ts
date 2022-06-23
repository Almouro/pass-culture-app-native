import { useMutation } from 'react-query'

import { eventMonitoring } from 'libs/monitoring'
import { QueryKeys } from 'libs/queryKeys'

export interface RecommendedIdsResponse {
  playlist_recommended_offers: string[]
}

export interface RecommendedIdsRequest {
  start_date?: string
  end_date?: string
  isEvent?: boolean
  categories?: string[]
  price_max?: number
}

export const useHomeRecommendedIdsMutation = (recommendationUrl: string) => {
  return useMutation(
    QueryKeys.RECOMMENDATION_OFFER_IDS,
    async (parameters: RecommendedIdsRequest) => {
      try {
        const response = await fetch(recommendationUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(parameters),
        })
        if (!response.ok) {
          throw new Error('Failed to fetch recommendation')
        }
        const responseBody: RecommendedIdsResponse = await response.json()
        return responseBody
      } catch (err) {
        eventMonitoring.captureException(new Error('Error with recommendation endpoint'), {
          extra: { url: recommendationUrl },
        })
        return { playlist_recommended_offers: [] }
      }
    }
  )
}