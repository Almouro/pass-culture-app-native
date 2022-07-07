import { ElementType } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { UrlParamsProps } from 'features/navigation/helpers'
import { RootNavigateParams } from 'features/navigation/RootNavigator'

export type InternalNavigationProps = {
  navigateTo: {
    screen: RootNavigateParams[0]
    params?: RootNavigateParams[1]
    withPush?: boolean // If true, uses push instead of navigate
    fromRef?: boolean // If true, uses navigateFromRef/pushFromRef instead of navigate/push
  }
  externalNav?: never
}

export type ExternalNavigationProps = {
  externalNav: {
    url: string
    params?: UrlParamsProps
    address?: string // If provided, navigates using useItinerary hook
    onSuccess?: () => void | Promise<void>
    onError?: () => void
  }
  navigateTo?: never
}

export type InternalOrExternalNavigationProps = InternalNavigationProps | ExternalNavigationProps

type AsProps = {
  as?: ElementType // Component that will be used to render the link
} & Record<string, unknown>

export type TouchableLinkProps =
  | (InternalNavigationProps | ExternalNavigationProps) & {
      navigateBeforeOnPress?: boolean // If true, triggers navigation before onPress function
      highlight?: boolean // If true, uses TouchableHighlight instead of TouchableOpacity to render component
      isOnPressDebounced?: boolean
    } & TouchableOpacityProps &
      AsProps
