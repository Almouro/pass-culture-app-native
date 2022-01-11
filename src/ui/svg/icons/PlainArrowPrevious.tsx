import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum, SMALLER_ICON_SIZE } from 'ui/theme'

import { IconInterface } from './types'

export const PlainArrowPrevious: React.FunctionComponent<IconInterface> = ({
  size = SMALLER_ICON_SIZE,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM23.5422 15.4035C24.1869 16.0483 24.1869 17.0936 23.5422 17.7383L18.9164 22.3641L33.3491 22.3641C34.2609 22.3641 35 23.1032 35 24.015C35 24.9268 34.2609 25.6659 33.3491 25.6659L18.9464 25.6659L23.5422 30.2617C24.1869 30.9064 24.1869 31.9517 23.5422 32.5965C22.8975 33.2412 21.8522 33.2412 21.2075 32.5965L13.7784 25.1674C13.1336 24.5226 13.1336 23.4774 13.7784 22.8326L21.2075 15.4035C21.8522 14.7588 22.8975 14.7588 23.5422 15.4035Z"
      fill={color}
    />
  </Svg>
)
