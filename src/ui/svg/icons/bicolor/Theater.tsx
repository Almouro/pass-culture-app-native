import React from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled, { useTheme } from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { svgIdentifier } from 'ui/svg/utils'

import { AccessibleIcon } from '../types'

const TheaterSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  color2,
  accessibilityLabel,
  testID,
}) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()
  const {
    colors: { primary, secondary },
  } = useTheme()
  return (
    <AccessibleSvg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <Defs>
        <LinearGradient id={gradientId} x1="28.841%" x2="71.159%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color ?? primary} />
          <Stop offset="100%" stopColor={color2 ?? color ?? secondary} />
        </LinearGradient>
      </Defs>
      <Path
        fill={gradientFill}
        clipRule={'evenodd'}
        fillRule={'evenodd'}
        d="M2 4C1.63181 4 1.33333 4.29848 1.33333 4.66667V27.3333C1.33333 27.7015 1.63181 28 2 28C2.09209 28 2.17982 27.9813 2.25961 27.9476C2.37595 27.9819 2.49914 28.0003 2.62667 28.0003H3.78667C4.15486 28.0003 4.45333 27.7018 4.45333 27.3336C4.45333 26.9654 4.15486 26.667 3.78667 26.667H2.66667V19.3333H4C4.40929 19.3333 4.77463 19.5261 5.12333 19.9661C5.48359 20.4207 5.78679 21.0971 6.02565 21.9331C6.50164 23.5991 6.66667 25.6966 6.66667 27.3333C6.66667 27.7015 6.96514 28.0003 7.33333 28.0003H29.3733C29.3825 28.0003 29.3917 28.0002 29.4008 28H30C30.3682 28 30.6667 27.7015 30.6667 27.3333V4.66667C30.6667 4.29848 30.3682 4 30 4H18.6667C18.2985 4 18 4.29848 18 4.66667C18 8.20109 19.7553 11.8403 21.8 14.5667C22.828 15.9374 23.9503 17.1061 25.0029 17.9394C25.4041 18.257 25.8017 18.5311 26.1861 18.7499C26.0596 18.8693 25.9414 18.9995 25.8317 19.138C25.3169 19.7876 24.9535 20.6529 24.6923 21.5669C24.6478 21.7225 24.6059 21.881 24.5665 22.0419C24.4939 22.0148 24.4153 22 24.3333 22H12.6667C12.2985 22 12 22.2985 12 22.6667C12 23.0349 12.2985 23.3333 12.6667 23.3333H24.3063C24.1221 24.4652 24.0343 25.634 24.0084 26.667H7.99158C7.96573 25.634 7.87789 24.4652 7.69367 23.3333H9.33333C9.70152 23.3333 10 23.0349 10 22.6667C10 22.2985 9.70152 22 9.33333 22H7.66667C7.58465 22 7.50609 22.0148 7.43352 22.0419C7.39406 21.881 7.35215 21.7225 7.30768 21.5669C7.04654 20.6529 6.68308 19.7876 6.16833 19.138C6.05855 18.9995 5.94044 18.8693 5.81385 18.7499C6.19825 18.5311 6.59589 18.257 6.99713 17.9394C8.04969 17.1061 9.17195 15.9374 10.2 14.5667C12.1164 12.0115 13.7785 8.65444 13.9796 5.33333H15.36C15.7282 5.33333 16.0267 5.03486 16.0267 4.66667C16.0267 4.29848 15.7282 4 15.36 4H2ZM2.8704 18C2.88296 17.9912 2.90013 17.9782 2.92207 17.9594C3.01771 17.8772 3.14815 17.7318 3.30665 17.5068C3.62134 17.06 3.98516 16.3881 4.3571 15.5338C5.09863 13.8305 5.8353 11.4885 6.2698 8.97945C6.33263 8.61666 6.67766 8.37349 7.04045 8.43632C7.40324 8.49915 7.6464 8.84418 7.58358 9.20697C7.13141 11.818 6.36475 14.2626 5.57961 16.066C5.28624 16.7398 4.98504 17.3364 4.68995 17.8238C4.74871 17.7988 4.81014 17.7707 4.87424 17.7394C5.25724 17.5525 5.69565 17.2691 6.16953 16.894C7.11697 16.1439 8.16138 15.0626 9.13333 13.7667C10.9505 11.3438 12.4419 8.26982 12.6435 5.33333H2.66667V18H2.8704ZM29.3333 19.3333V26.6667H25.3422C25.382 25.1531 25.5609 23.3803 25.9743 21.9331C26.2132 21.0971 26.5164 20.4207 26.8767 19.9661C27.2254 19.5261 27.5907 19.3333 28 19.3333H29.3333ZM28.9054 17.7829C29.007 17.9011 29.0826 17.9675 29.1293 18H29.3333V5.33333H25.3439C25.3819 6.54722 25.5205 7.77672 25.7301 8.97885C25.7933 9.34157 25.5505 9.68687 25.1878 9.7501C24.8251 9.81332 24.4798 9.57053 24.4166 9.20781C24.1957 7.94077 24.0483 6.63363 24.0099 5.33333H19.3565C19.5581 8.26982 21.0495 11.3438 22.8667 13.7667C23.8386 15.0626 24.883 16.1439 25.8305 16.894C26.3043 17.2691 26.7428 17.5525 27.1258 17.7394C27.1896 17.7706 27.2507 17.7985 27.3092 17.8234C27.2068 17.6544 27.1047 17.4738 27.0033 17.2835C26.4106 16.1713 25.7935 14.6343 25.2742 12.8829C25.1695 12.5299 25.3708 12.1588 25.7238 12.0542C26.0768 11.9495 26.4478 12.1508 26.5525 12.5038C27.0532 14.1924 27.6394 15.642 28.18 16.6565C28.4519 17.1667 28.7001 17.5436 28.9054 17.7829Z"
      />
    </AccessibleSvg>
  )
}

export const Theater = styled(TheaterSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
