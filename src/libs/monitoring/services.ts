import { CaptureContext, User, Event, SeverityLevel } from '@sentry/types'

import { getSentryConfig } from 'libs/monitoring/config'

import * as SentryModule from './sentry'

type EventMonitoring = {
  captureException: (
    exception: unknown,
    captureContext?: CaptureContext | Record<string, unknown>
  ) => string
  captureEvent: (event: Event | Record<string, unknown>) => string
  captureMessage: (message: string, captureContext?: CaptureContext | SeverityLevel) => string
  configureScope: (callback: (scope: SentryModule.Scope) => void) => void
  init: ({ enabled }: { enabled: boolean }) => void
  setUser: (user: User | Record<string, unknown> | null) => void
}

export const eventMonitoring: EventMonitoring = {
  captureException: SentryModule.captureException,
  captureEvent: SentryModule.captureEvent,
  captureMessage: SentryModule.captureMessage,
  configureScope: SentryModule.configureScope,
  setUser: SentryModule.setUser,
  async init({ enabled } = { enabled: true }) {
    if (!enabled) return
    const config = await getSentryConfig()
    SentryModule.init(config)
  },
}
