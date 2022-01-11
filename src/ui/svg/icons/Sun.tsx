import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { BicolorGradient, svgIdentifier } from 'ui/svg/utils'
import { ColorsEnum, STANDARD_ICON_SIZE } from 'ui/theme'

import { IconInterface } from './types'

export const Sun: React.FunctionComponent<IconInterface> = ({
  size = STANDARD_ICON_SIZE,
  color = ColorsEnum.BLACK,
  color2,
  testID,
}) => {
  const { id, fill: fillBicolor } = svgIdentifier()
  const fill = color2 ? fillBicolor : color

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
      {!!color2 && <BicolorGradient id={id} color1={color} color2={color2} />}
      <Path
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 2.5C24.5523 2.5 25 2.94772 25 3.5V9.3C25 9.85228 24.5523 10.3 24 10.3C23.4477 10.3 23 9.85228 23 9.3V3.5C23 2.94772 23.4477 2.5 24 2.5ZM24.8821 15.5452C22.5945 15.32 20.2109 15.9685 18.2949 17.5427L18.294 17.5434C14.4517 20.6928 13.8931 26.3626 17.0435 30.2061C20.1929 34.0483 25.8627 34.607 29.7061 31.4566C33.5484 28.3072 34.1071 22.6374 30.9567 18.7939C30.6066 18.3668 30.669 17.7367 31.0961 17.3866C31.5233 17.0365 32.1534 17.0989 32.5035 17.5261C36.3531 22.2226 35.6717 29.1528 30.974 33.0034C26.2775 36.853 19.3473 36.1717 15.4967 31.4739C11.6472 26.7776 12.3284 19.8477 17.0257 15.997C19.3696 14.0714 22.2858 13.28 25.078 13.5548C25.6277 13.6089 26.0294 14.0983 25.9753 14.648C25.9212 15.1976 25.4317 15.5993 24.8821 15.5452ZM9.85713 8.94292C9.46661 8.55239 8.83344 8.55239 8.44292 8.94292C8.05239 9.33344 8.05239 9.96661 8.44292 10.3571L12.5429 14.4571C12.9334 14.8477 13.5666 14.8477 13.9571 14.4571C14.3477 14.0666 14.3477 13.4334 13.9571 13.0429L9.85713 8.94292ZM2 24.5C2 23.9477 2.44772 23.5 3 23.5H8.8C9.35228 23.5 9.8 23.9477 9.8 24.5C9.8 25.0523 9.35228 25.5 8.8 25.5H3C2.44772 25.5 2 25.0523 2 24.5ZM13.9571 35.9571C14.3477 35.5666 14.3477 34.9334 13.9571 34.5429C13.5666 34.1524 12.9334 34.1524 12.5429 34.5429L8.44292 38.6429C8.05239 39.0334 8.05239 39.6666 8.44292 40.0571C8.83344 40.4476 9.46661 40.4476 9.85713 40.0571L13.9571 35.9571ZM24 38.7C24.5523 38.7 25 39.1477 25 39.7V45.5C25 46.0522 24.5523 46.5 24 46.5C23.4477 46.5 23 46.0522 23 45.5V39.7C23 39.1477 23.4477 38.7 24 38.7ZM35.4571 34.5429C35.0666 34.1524 34.4334 34.1524 34.0429 34.5429C33.6524 34.9334 33.6524 35.5666 34.0429 35.9571L38.1429 40.0571C38.5334 40.4476 39.1666 40.4476 39.5571 40.0571C39.9476 39.6666 39.9476 39.0334 39.5571 38.6429L35.4571 34.5429ZM38.2 24.5C38.2 23.9477 38.6477 23.5 39.2 23.5H45C45.5522 23.5 46 23.9477 46 24.5C46 25.0523 45.5522 25.5 45 25.5H39.2C38.6477 25.5 38.2 25.0523 38.2 24.5ZM39.5571 10.3571C39.9476 9.96661 39.9476 9.33344 39.5571 8.94292C39.1666 8.55239 38.5334 8.55239 38.1429 8.94292L34.0429 13.0429C33.6524 13.4334 33.6524 14.0666 34.0429 14.4571C34.4334 14.8477 35.0666 14.8477 35.4571 14.4571L39.5571 10.3571Z"
      />
    </Svg>
  )
}
