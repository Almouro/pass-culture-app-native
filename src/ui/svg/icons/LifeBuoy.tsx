import * as React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const LifeBuoySvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    accessibilityLabel={accessibilityLabel}
    testID={testID}>
    <Path
      fill={color}
      d="M43.94 22.614C44.47 22.574 44.95 23.0141 44.98 23.5643C45.25 29.6259 42.9 35.1873 38.94 39.1984C38.88 39.2884 38.8 39.3684 38.7 39.4384C35.13 42.9593 30.32 45.2399 24.93 45.48C24.61 45.49 24.29 45.5 23.98 45.5C18.26 45.5 13.04 43.1694 9.23003 39.3984C9.16003 39.3384 9.08003 39.2684 9.03003 39.1884C5.53003 35.6174 3.26003 30.8162 3.02003 25.4348C2.75003 19.3732 5.10003 13.8117 9.05003 9.7907C9.13003 9.69067 9.21003 9.61065 9.31003 9.54063C12.88 6.02972 17.68 3.75912 23.08 3.51906C29 3.269 34.65 5.48957 38.78 9.58064L38.8 9.60065C39.61 10.4109 40.37 11.2911 41.06 12.2413C41.38 12.6915 41.28 13.3216 40.83 13.6417C40.38 13.9618 39.75 13.8618 39.43 13.4116C38.98 12.7815 38.49 12.1813 37.97 11.6212C34.47 13.7117 32.15 16.9926 31.31 18.3229C32.78 20.0534 33.58 22.2139 33.58 24.5045C33.58 26.6151 32.88 28.6256 31.62 30.286C33.27 31.2863 36.36 33.4969 38.36 36.9078C41.43 33.3668 43.21 28.6956 42.99 23.6543C42.96 23.1042 43.39 22.634 43.94 22.614ZM36.47 10.1808C32.83 6.99997 28.08 5.29953 23.15 5.51958C18.71 5.71963 14.69 7.45009 11.56 10.1608C15.08 12.2913 17.23 15.2721 18.21 16.8825C21.63 14.2819 26.4 14.2919 29.81 16.9125C30.85 15.3421 33.11 12.3314 36.47 10.1808ZM16.72 18.3029C15.96 16.9826 13.79 13.7017 10.06 11.6112C6.74003 15.2021 4.78003 20.0734 5.04003 25.3547C5.24003 29.7159 6.89003 33.7769 9.72003 37.0078C12.85 32.2565 17.29 29.8059 17.49 29.6959C17.4956 29.6903 17.5044 29.6878 17.5146 29.6849C17.5225 29.6827 17.5313 29.6803 17.54 29.6759C17.5815 29.6551 17.6278 29.6439 17.6755 29.6324C17.6968 29.6273 17.7184 29.622 17.74 29.6159C17.7614 29.6123 17.7815 29.6075 17.8013 29.6027C17.8369 29.5941 17.8714 29.5859 17.91 29.5859C17.97 29.5859 18.04 29.5959 18.11 29.6059C18.1292 29.609 18.1473 29.6112 18.165 29.6133C18.2029 29.6179 18.2392 29.6222 18.28 29.6359C18.3172 29.6482 18.3505 29.6683 18.3847 29.6889C18.4058 29.7016 18.4272 29.7145 18.45 29.7259C18.475 29.7459 18.5025 29.7634 18.53 29.7809C18.5575 29.7984 18.585 29.8159 18.61 29.8359C18.63 29.8459 18.65 29.8559 18.66 29.8659C20.09 31.2963 21.99 32.0865 24.01 32.0865C26.03 32.0865 27.93 31.2963 29.36 29.8659C30.79 28.4356 31.58 26.5351 31.58 24.5145C31.58 22.494 30.79 20.5935 29.36 19.1631C26.41 16.2124 21.6 16.2124 18.65 19.1631C17.22 20.5935 16.43 22.494 16.43 24.5145C16.43 25.0647 15.98 25.5148 15.43 25.5148C14.88 25.5148 14.43 25.0647 14.43 24.5145C14.43 22.2139 15.24 20.0334 16.72 18.3029ZM11.18 38.5282C14.93 41.9491 19.77 43.7095 24.85 43.4895C29.52 43.2794 33.72 41.3789 36.9 38.4282C35.01 34.8372 31.57 32.5766 30.2 31.7864C28.47 33.2668 26.3 34.077 24 34.077C21.71 34.077 19.55 33.2768 17.82 31.8064C16.94 32.3666 15.21 33.5869 13.48 35.4374C15.18 37.0678 17.25 38.3081 19.49 39.0083C20.02 39.1684 20.31 39.7285 20.15 40.2586C20.01 40.6887 19.62 40.9588 19.19 40.9588C19.09 40.9588 18.99 40.9488 18.89 40.9188C16.4 40.1386 14.09 38.7782 12.18 36.9678C11.81 37.4479 11.46 37.948 11.13 38.4782L11.18 38.5282ZM10.3501 33.2668C10.1901 33.3569 10.0301 33.3969 9.86009 33.3969C9.51009 33.3969 9.17008 33.2068 8.98008 32.8767C8.47009 31.9665 8.05009 31.0062 7.71008 30.016C7.54009 29.4958 7.82009 28.9257 8.34009 28.7457C8.87009 28.5756 9.43009 28.8557 9.61009 29.3758C9.90008 30.256 10.2801 31.1063 10.7301 31.9065C11.0001 32.3866 10.8301 32.9968 10.3501 33.2668Z"
    />
  </AccessibleSvg>
)

export const LifeBuoy = styled(LifeBuoySvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
