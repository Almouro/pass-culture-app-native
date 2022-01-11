import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum, STANDARD_ICON_SIZE } from 'ui/theme'

import { IconInterface } from './types'

export const Calendar: React.FunctionComponent<IconInterface> = ({
  size = STANDARD_ICON_SIZE,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.9638 5.5C31.8575 5.5 30.9663 6.39228 30.9663 7.5V8.29993C30.9794 8.36457 30.9863 8.43148 30.9863 8.5C30.9863 8.56852 30.9794 8.63543 30.9663 8.70007V9.5C30.9663 10.6077 31.8575 11.5 32.9638 11.5C33.5154 11.5 33.9625 11.9477 33.9625 12.5C33.9625 13.0523 33.5154 13.5 32.9638 13.5C30.7543 13.5 28.9688 11.7123 28.9688 9.5H18.0025H18.0025H16.2447C15.6931 9.5 15.246 9.05228 15.246 8.5C15.246 7.94772 15.6931 7.5 16.2447 7.5H17.0038C17.0038 6.39228 16.1126 5.5 15.0063 5.5C13.8999 5.5 13.0088 6.39228 13.0088 7.5V9.5C13.0088 10.6077 13.8999 11.5 15.0063 11.5C15.5579 11.5 16.005 11.9477 16.005 12.5C16.005 13.0523 15.5579 13.5 15.0063 13.5C12.7967 13.5 11.0113 11.7123 11.0113 9.5H7.99501C6.88867 9.5 5.9975 10.3923 5.9975 11.5V15.5H36.9788C37.5304 15.5 37.9776 15.9477 37.9776 16.5C37.9776 17.0523 37.5304 17.5 36.9788 17.5H5.9975V37.5C5.9975 40.2577 8.23699 42.5 10.9913 42.5H36.9588C39.7451 42.5 41.9943 40.2089 41.9527 37.4149L41.9526 37.3981L42.0025 11.5089C41.9775 10.3964 41.0635 9.5 39.9551 9.5H35.98H35.9601H34.2222C33.6706 9.5 33.2235 9.05228 33.2235 8.5C33.2235 7.94772 33.6706 7.5 34.2222 7.5H34.9613C34.9613 6.39228 34.0701 5.5 32.9638 5.5ZM19.0013 7.5H28.9688C28.9688 5.28772 30.7543 3.5 32.9638 3.5C35.1733 3.5 36.9588 5.28772 36.9588 7.5H39.9551C42.1595 7.5 43.9601 9.27871 43.9998 11.4819L44 11.5019L43.9501 37.3939C44.0034 41.2959 40.8612 44.5 36.9588 44.5H10.9913C7.1338 44.5 4 41.3623 4 37.5V11.5C4 9.28772 5.78548 7.5 7.99501 7.5H11.0113C11.0113 5.28772 12.7967 3.5 15.0063 3.5C17.2158 3.5 19.0013 5.28772 19.0013 7.5Z"
    />
  </Svg>
)
