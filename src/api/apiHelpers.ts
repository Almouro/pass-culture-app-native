/* eslint-disable @typescript-eslint/ban-ts-comment */
import { t } from '@lingui/macro'
import { IdCheckError } from '@pass-culture/id-check'

import { navigateFromRef } from 'features/navigation/navigationRef'
import { Headers, FailedToRefreshAccessTokenError } from 'libs/fetch'
import { decodeAccessToken } from 'libs/jwt'
import { clearRefreshToken, getRefreshToken } from 'libs/keychain'
import { eventMonitoring } from 'libs/monitoring'
import { getUniqueId } from 'libs/react-native-device-info/getUniqueId'
import { storage } from 'libs/storage'

import Package from '../../package.json'

import { DefaultApi } from './gen'

function navigateToLogin() {
  navigateFromRef('Login')
}

export async function getAuthenticationHeaders(options?: RequestInit): Promise<Headers> {
  if (options && options.credentials === 'omit') return {}

  const accessToken = await storage.readString('access_token')
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}

// At the moment, we can't Promise.reject inside of safeFetch and expect
// the wrapping AsyncBoundary to catch it. As a result, we resolve a fake
// response that we then catch to redirect to the login page.
// this happens when there is a problem retrieving or refreshing
// the access token.
const NeedsAuthenticationResponse = {
  status: 401,
  statusText: 'NeedsAuthenticationResponse',
} as Response

/**
 * For each http calls to the api, retrieves the access token and fetchs.
 * Ignores native/v1/refresh_access_token.
 *
 * First decodes the local access token:
 * on success: continue to the call
 * on error (401): try to refresh the access token
 * on error (other): propagates error
 */
export const safeFetch = async (
  url: string,
  options: RequestInit,
  api: DefaultApi
): Promise<Response> => {
  let runtimeOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'device-id': await getUniqueId(),
      'app-version': Package.version,
    },
  }

  if (options.credentials === 'omit') {
    return await fetch(url, runtimeOptions)
  }

  // @ts-expect-error
  const authorizationHeader: string = options.headers?.['Authorization'] || ''
  const token = authorizationHeader.replace('Bearer ', '')
  const tokenContent = decodeAccessToken(token)

  if (!tokenContent) {
    return Promise.resolve(NeedsAuthenticationResponse)
  }

  // If the token is expired, we refresh it before calling the backend
  if (tokenContent && tokenContent.exp * 1000 <= new Date().getTime()) {
    try {
      const newAccessToken = await refreshAccessToken(api)

      runtimeOptions = {
        ...runtimeOptions,
        headers: {
          ...runtimeOptions.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    } catch (error) {
      // Here we are supposed to be logged-in (calling an authenticated endpoint)
      // But the access token is expired and cannot be refreshed.
      // In this case, we cleared the access token and we need to login again
      return Promise.resolve(NeedsAuthenticationResponse)
    }
  }

  return await fetch(url, runtimeOptions)
}

/**
 * Calls Api to refresh the access token using the in-keychain stored refresh token
 * - on success: Stores the new access token
 * - on error : clear storage propagates error
 */
export const refreshAccessToken = async (api: DefaultApi): Promise<string | null> => {
  const refreshToken = await getRefreshToken()

  // if not connected, we also redirect to the login page
  if (refreshToken == null) {
    throw new FailedToRefreshAccessTokenError()
  }
  try {
    const response = await api.postnativev1refreshAccessToken({
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    await storage.saveString('access_token', response.accessToken)

    return await storage.readString('access_token')
  } catch {
    await clearRefreshToken()
    await storage.clear('access_token')
    throw new FailedToRefreshAccessTokenError()
  }
}

// In this case, the following `any` is not that much of a problem in the context of usage
// with the autogenerated files of swagger-codegen.
// !!! Not encouraging to use `any` anywhere else !!!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleGeneratedApiResponse(response: Response): Promise<any | void> {
  if (response.status === 204) {
    return {}
  }

  // We are not suppose to have side-effects in this function but this is a special case
  // where the access token is corrupted and we need to recreate it by logging-in again
  if (response.status === 401 && response.statusText === 'NeedsAuthenticationResponse') {
    eventMonitoring.captureException('NeedsAuthenticationResponse')
    navigateToLogin()
    return {}
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.body,
      `Échec de la requête ${response.url}, code: ${response.status}`
    )
  }

  return await response.json()
}

export function isApiError(error: ApiError | unknown): error is ApiError {
  return (error as ApiError).name === 'ApiError'
}

export class ApiError extends Error {
  name = 'ApiError'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  statusCode: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(statusCode: number, content: any, message?: string) {
    super(message)
    this.content = content
    this.statusCode = statusCode
  }
}
IdCheckError.prototype.name = 'ApiError'

export function extractApiErrorMessage(error: unknown) {
  let message = t`Une erreur est survenue`
  if (isApiError(error)) {
    const { content } = error as { content: { code: string; message: string } }
    if (content && content.code && content.message) {
      message = content.message
    }
  }
  return message
}
