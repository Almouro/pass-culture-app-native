import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'

function OfferDigitalSvg({ size, testID, accessibilityLabel, color }: AccessibleIcon) {
  return (
    <AccessibleSvg
      width={size}
      height={size}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      viewBox="0 0 48 48">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 10.52C4 7.28496 6.41433 4.5 9.59 4.5H31.01C31.5623 4.5 32.01 4.94772 32.01 5.5C32.01 6.05229 31.5623 6.5 31.01 6.5H9.59C7.68567 6.5 6 8.21504 6 10.52V30.48C6 32.785 7.68567 34.5 9.59 34.5H23.9926L23.9997 34.5L24.0068 34.5H38.41C40.3057 34.5 42 32.7835 42 30.48V10.52C42 8.21504 40.3143 6.5 38.41 6.5H37.62C37.0677 6.5 36.62 6.05229 36.62 5.5C36.62 4.94772 37.0677 4.5 37.62 4.5H38.41C41.5857 4.5 44 7.28496 44 10.52V30.48C44 33.7165 41.5743 36.5 38.41 36.5H24.9997V42.5H32.4997C33.052 42.5 33.4997 42.9477 33.4997 43.5C33.4997 44.0523 33.052 44.5 32.4997 44.5H21.4997C20.9474 44.5 20.4997 44.0523 20.4997 43.5C20.4997 42.9477 20.9474 42.5 21.4997 42.5H22.9997V36.5H9.59C6.41433 36.5 4 33.715 4 30.48V10.52ZM15 42.5C14.4477 42.5 14 42.9477 14 43.5C14 44.0523 14.4477 44.5 15 44.5H17C17.5523 44.5 18 44.0523 18 43.5C18 42.9477 17.5523 42.5 17 42.5H15ZM29.0075 18.9456L22.5214 15.6875C21.3573 15.0966 20.0003 15.955 20.0003 17.24V23.77C20.0003 25.055 21.3573 25.9134 22.5213 25.3225L29.0091 22.0636L29.0092 22.0637L29.0206 22.0578C30.2666 21.4117 30.2978 19.5916 29.0085 18.9461L29.0075 18.9456ZM27.6563 20.505L22.0003 17.6639V23.3461L27.6563 20.505Z"
        fill={color}
      />
    </AccessibleSvg>
  )
}

export const OfferDigital = styled(OfferDigitalSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
