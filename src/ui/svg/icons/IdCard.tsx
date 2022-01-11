import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { BicolorGradient, svgIdentifier } from 'ui/svg/utils'
import { ColorsEnum, STANDARD_ICON_SIZE } from 'ui/theme'

import { IconInterface } from './types'

export const IdCard: React.FunctionComponent<IconInterface> = ({
  size = STANDARD_ICON_SIZE,
  color = ColorsEnum.BLACK,
  color2,
  opacity = 1,
  testID,
}) => {
  const { id, fill: fillBicolor } = svgIdentifier()
  const fill = color2 ? fillBicolor : color

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
      {!!color2 && <BicolorGradient id={id} color1={color} color2={color2} />}
      <Path
        fill={fill}
        opacity={opacity}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 10.5C4 9.39228 4.89228 8.5 6 8.5H42C43.1077 8.5 44 9.39228 44 10.5V38.5C44 39.6077 43.1077 40.5 42 40.5H37.96C37.4077 40.5 36.96 40.9477 36.96 41.5C36.96 42.0523 37.4077 42.5 37.96 42.5H42C44.2123 42.5 46 40.7123 46 38.5V10.5C46 8.28772 44.2123 6.5 42 6.5H6C3.78772 6.5 2 8.28772 2 10.5V38.5C2 40.7123 3.78772 42.5 6 42.5H30C30.5523 42.5 31 42.0523 31 41.5C31 40.9477 30.5523 40.5 30 40.5H6C4.89228 40.5 4 39.6077 4 38.5V10.5ZM15.8699 14.1899C14.944 14.1899 14.13 14.6549 13.6494 15.3685L13.6432 15.3777L13.6432 15.3777C13.3581 15.7909 13.1899 16.303 13.1899 16.8599V19.4799C13.1899 20.9541 14.3887 22.1499 15.8699 22.1499C17.3512 22.1499 18.5499 20.9541 18.5499 19.4799V16.8599C18.5499 15.3858 17.3512 14.1899 15.8699 14.1899ZM11.9936 14.2468C12.8334 13.003 14.2578 12.1899 15.8699 12.1899C18.4487 12.1899 20.5499 14.2741 20.5499 16.8599V19.4799C20.5499 22.0658 18.4487 24.1499 15.8699 24.1499C13.2912 24.1499 11.1899 22.0658 11.1899 19.4799V16.8599C11.1899 15.8989 11.4806 14.9926 11.9936 14.2468ZM6.77311 32.6048C7.83569 28.5782 11.4933 25.6 15.87 25.6C20.2467 25.6 23.9043 28.5782 24.9669 32.6048C25.054 32.9347 24.9668 33.2863 24.7357 33.5373C24.104 34.2234 23.3852 34.8444 22.6101 35.3684C22.1525 35.6777 21.5309 35.5576 21.2216 35.1C20.9122 34.6425 21.0324 34.0209 21.4899 33.7115C21.9801 33.3802 22.4451 33.0008 22.8719 32.5858C21.8684 29.6848 19.1189 27.6 15.87 27.6C12.6213 27.6 9.87187 29.6846 8.86819 32.5854C10.6814 34.3469 13.147 35.44 15.87 35.44C16.6745 35.44 17.4547 35.3485 18.1931 35.1685C18.7296 35.0376 19.2707 35.3665 19.4015 35.903C19.5324 36.4396 19.2035 36.9806 18.667 37.1115C17.7653 37.3314 16.8255 37.44 15.87 37.44C12.3552 37.44 9.20347 35.9215 7.00495 33.538C6.77338 33.2869 6.68596 32.9351 6.77311 32.6048ZM27 14.5C27 13.9477 27.4477 13.5 28 13.5H39C39.5523 13.5 40 13.9477 40 14.5C40 15.0523 39.5523 15.5 39 15.5H28C27.4477 15.5 27 15.0523 27 14.5ZM28 19.5C27.4477 19.5 27 19.9477 27 20.5C27 21.0523 27.4477 21.5 28 21.5H36C36.5523 21.5 37 21.0523 37 20.5C37 19.9477 36.5523 19.5 36 19.5H28Z"
      />
    </Svg>
  )
}
