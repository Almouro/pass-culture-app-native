import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const ArrowNext: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 49" testID={testID} aria-hidden>
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.3252 4.78844C15.93 5.17728 15.925 5.81266 16.3142 6.20759L33.6666 23.72C34.1027 24.1627 34.0962 24.8848 33.6711 25.3107L33.6698 25.312L16.2922 42.7892C15.9012 43.1823 15.9033 43.8177 16.2967 44.2084C16.6902 44.599 17.326 44.5969 17.7169 44.2038L35.0932 26.728C36.3046 25.5137 36.2984 23.5305 35.0978 22.3119L17.7454 4.79946C17.3562 4.40453 16.7204 4.39959 16.3252 4.78844Z"
    />
  </Svg>
)
