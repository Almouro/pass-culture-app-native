import React from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled, { useTheme } from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'
import { svgIdentifier } from 'ui/svg/utils'

const PencilTipSvg: React.FunctionComponent<AccessibleIcon> = ({
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
        d="M28.7763 2.68432C28.7644 2.68164 28.7524 2.67925 28.7402 2.67716C28.7281 2.67507 28.716 2.67329 28.7039 2.67183C28.6274 2.66261 28.5521 2.66591 28.4801 2.68019L14.6893 5.05594C14.5439 5.08099 14.4098 5.15046 14.3055 5.2548L12.8829 6.67741L12.8767 6.68351L12.8706 6.68968L2.87588 16.6844C2.59691 16.9633 2.59691 17.4156 2.87588 17.6946C3.15485 17.9736 3.60716 17.9736 3.88613 17.6946L13.3173 8.26342C13.4722 8.5304 13.5663 8.80255 13.6025 9.05453C13.665 9.4907 13.5534 9.81888 13.354 10.0208L13.353 10.0218L5.64771 17.72C5.36861 17.9988 5.3684 18.4511 5.64724 18.7302C5.92608 19.0093 6.37838 19.0095 6.65748 18.7307L14.3653 11.03L14.3653 11.03L14.3678 11.0275C14.9536 10.4364 15.1272 9.62195 15.0167 8.8516C14.9366 8.29382 14.7073 7.73413 14.3499 7.23085L15.1553 6.4254L23.4087 5.00358L26.9956 8.59671L25.5747 16.8447L24.7653 17.6541C24.2604 17.2958 23.6999 17.0669 23.1421 16.9876C22.3712 16.8782 21.5577 17.0542 20.9703 17.6416L13.934 24.6779C13.655 24.9569 13.655 25.4092 13.934 25.6882C14.213 25.9671 14.6653 25.9671 14.9442 25.6882L21.9806 18.6518C22.179 18.4534 22.5049 18.3402 22.9412 18.4021C23.1926 18.4378 23.4648 18.5315 23.7327 18.6867L14.3055 28.114C14.0265 28.3929 14.0265 28.8452 14.3055 29.1242C14.5844 29.4032 15.0367 29.4032 15.3157 29.1242L25.2527 19.1872C25.2749 19.1697 25.2962 19.1508 25.3166 19.1304C25.337 19.11 25.3559 19.0887 25.3733 19.0666L26.7453 17.6946C26.8496 17.5903 26.9191 17.4562 26.9441 17.3108L29.3229 3.50241C29.3288 3.46811 29.3322 3.4337 29.3331 3.39943C29.3384 3.20228 29.2616 3.0169 29.1299 2.88189C29.0364 2.78606 28.9153 2.71561 28.7763 2.68432ZM27.743 4.25691L25.1312 4.70685L27.2922 6.87158L27.743 4.25691ZM15.7887 13.4071L15.7872 13.4085L4.83937 24.4921C4.56212 24.7728 4.10983 24.7755 3.82914 24.4983C3.54846 24.2211 3.54568 23.7688 3.82292 23.4881L14.7739 12.4014L14.777 12.3983C16.1061 11.0692 18.2656 11.0692 19.5947 12.3983C20.9237 13.7272 20.9238 15.8866 19.595 17.2157L10.0873 26.7448C9.80864 27.0241 9.35634 27.0246 9.07706 26.746C8.79777 26.4673 8.79726 26.015 9.07592 25.7357L18.5845 16.2057C19.3556 15.4346 19.3556 14.1796 18.5845 13.4085C17.8138 12.6379 16.5599 12.6374 15.7887 13.4071Z"
      />
    </AccessibleSvg>
  )
}

export const PencilTip = styled(PencilTipSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
