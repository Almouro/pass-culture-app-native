import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum, STANDARD_ICON_SIZE } from 'ui/theme'

import { IconInterface } from './types'

export const Bell: React.FunctionComponent<IconInterface> = ({
  size = STANDARD_ICON_SIZE,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 6C20 3.90552 21.9652 2.5 24 2.5C26.0348 2.5 28 3.90552 28 6V7.0144C30.2381 7.61178 32.2539 8.71857 33.8837 10.2773C36.4462 12.7282 38 16.2453 38 20.5V30.5C38 31.6077 38.8923 32.5 40 32.5C42.2123 32.5 44 34.2877 44 36.5C44 38.7123 42.2123 40.5 40 40.5H28.8987C28.9643 40.8205 29 41.1544 29 41.5C29 44.2623 26.7623 46.5 24 46.5C21.2377 46.5 19 44.2623 19 41.5C19 41.1577 19.0341 40.8232 19.1 40.5H8C5.78772 40.5 4 38.7123 4 36.5C4 34.2877 5.78772 32.5 8 32.5C9.10772 32.5 10 31.6077 10 30.5V20.5C10 18.9812 10.2018 17.5489 10.5782 16.2263C10.7293 15.6951 11.2825 15.387 11.8137 15.5382C12.3449 15.6893 12.653 16.2425 12.5018 16.7737C12.1782 17.9111 12 19.1588 12 20.5V30.5C12 31.229 11.8059 31.912 11.4664 32.5H23C23.5523 32.5 24 32.9477 24 33.5C24 34.0523 23.5523 34.5 23 34.5H8C6.89228 34.5 6 35.3923 6 36.5C6 37.6077 6.89228 38.5 8 38.5H40C41.1077 38.5 42 37.6077 42 36.5C42 35.3923 41.1077 34.5 40 34.5H33C32.4477 34.5 32 34.0523 32 33.5C32 32.9477 32.4477 32.5 33 32.5H36.5336C36.1941 31.912 36 31.229 36 30.5V20.5C36 16.7547 34.6438 13.7718 32.5013 11.7227C30.3521 9.66708 27.3573 8.5 24 8.5C21.2502 8.5 18.7353 9.28513 16.737 10.6968C16.2859 11.0154 15.6619 10.9081 15.3432 10.457C15.0246 10.0059 15.1319 9.3819 15.583 9.06324C16.9007 8.13239 18.3938 7.44233 20 7.01413V6ZM21.1683 40.5C21.1625 40.5221 21.156 40.5442 21.1487 40.5662C21.0529 40.8535 21 41.1667 21 41.5C21 43.1577 22.3423 44.5 24 44.5C25.6577 44.5 27 43.1577 27 41.5C27 41.1493 26.9387 40.8155 26.8283 40.5H21.1683ZM26 6V6.62449C25.3457 6.54191 24.6778 6.5 24 6.5C23.3225 6.5 22.6546 6.54192 22 6.62453V6C22 5.33448 22.7148 4.5 24 4.5C25.2852 4.5 26 5.33448 26 6Z"
    />
  </Svg>
)
