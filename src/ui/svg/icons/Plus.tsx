import * as React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const PlusSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    accessibilityLabel={accessibilityLabel}
    testID={testID}
    viewBox="0 0 48 48">
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM24.0019 13.1005C25.1065 13.1016 26.0011 13.9979 26 15.1025L25.9925 21.9912L32.8522 22C33.9568 22.0013 34.8512 22.8978 34.8499 24.0023C34.8487 25.1069 33.9522 26.0013 32.8477 26L25.999 25.991L26.0246 32.8682C26.0282 33.9728 25.1357 34.8711 24.0312 34.8747C22.9266 34.8783 22.0282 33.9858 22.0247 32.8812L21.9995 26.0013L15.1347 26.0275C14.0302 26.0312 13.1317 25.1388 13.1279 24.0343C13.1242 22.9297 14.0166 22.0312 15.1212 22.0275L21.9923 22.0008L22 15.0986C22.0011 13.994 22.8974 13.0995 24.0019 13.1005Z"
    />
  </AccessibleSvg>
)

export const Plus = styled(PlusSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.smaller,
}))``
