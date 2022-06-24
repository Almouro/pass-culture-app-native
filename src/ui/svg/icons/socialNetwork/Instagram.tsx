import * as React from 'react'
import { G, Path, Defs, RadialGradient, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from '../types'

const RADIAL_GRADIENT_1_ID = 'Instagram-RadialGradient1'
const RADIAL_GRADIENT_2_ID = 'Instagram-RadialGradient2'

const InstagramSvg = ({ color: _color, size, accessibilityLabel, testID }: AccessibleIcon) => {
  return (
    <AccessibleSvg
      width={size}
      height={size}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      viewBox="0 0 24 24">
      <Defs>
        <RadialGradient
          id={RADIAL_GRADIENT_1_ID}
          cx="26.563%"
          cy="107.702%"
          r="99.843%"
          fx="26.563%"
          fy="107.702%"
          gradientTransform="matrix(0 -.99264 1 0 -.811 1.34)">
          <Stop offset="0%" stopColor="#FD5" />
          <Stop offset="10%" stopColor="#FD5" />
          <Stop offset="50%" stopColor="#FF543E" />
          <Stop offset="100%" stopColor="#C837AB" />
        </RadialGradient>
        <RadialGradient
          id={RADIAL_GRADIENT_2_ID}
          cx="-16.751%"
          cy="7.204%"
          r="44.617%"
          fx="-16.751%"
          fy="7.204%"
          gradientTransform="scale(1 .99264) rotate(78.762 -.168 .072)">
          <Stop offset="0%" stopColor="#3771C8" />
          <Stop offset="12.8%" stopColor="#3771C8" />
          <Stop offset="100%" stopColor="#60F" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <G fillRule="nonzero" fill="none">
        <Path
          fill={`url(#${RADIAL_GRADIENT_1_ID})`}
          d="M11.915 0c-4.973 0-6.427.005-6.71.029-1.02.085-1.655.247-2.347.594a4.757 4.757 0 00-1.369 1.01C.734 2.423.276 3.396.11 4.552c-.08.561-.103.676-.108 3.542-.002.956 0 2.213 0 3.9 0 5.007.005 6.471.03 6.755.082 1.001.237 1.63.567 2.32a5.027 5.027 0 003.252 2.676c.491.127 1.033.198 1.73.23.295.014 3.3.023 6.31.023 3.007 0 6.016-.004 6.303-.018.806-.039 1.274-.102 1.792-.237a4.994 4.994 0 003.252-2.682c.323-.672.487-1.326.561-2.274.017-.207.023-3.504.023-6.796 0-3.293-.007-6.583-.023-6.79-.075-.964-.24-1.612-.573-2.297a4.755 4.755 0 00-1.02-1.407c-.787-.759-1.751-1.22-2.9-1.387-.556-.081-.667-.105-3.514-.11h-3.876z"
        />
        <Path
          fill={`url(#${RADIAL_GRADIENT_2_ID})`}
          d="M11.915 0c-4.973 0-6.427.005-6.71.029-1.02.085-1.655.247-2.347.594a4.757 4.757 0 00-1.369 1.01C.734 2.423.276 3.396.11 4.552c-.08.561-.103.676-.108 3.542-.002.956 0 2.213 0 3.9 0 5.007.005 6.471.03 6.755.082 1.001.237 1.63.567 2.32a5.027 5.027 0 003.252 2.676c.491.127 1.033.198 1.73.23.295.014 3.3.023 6.31.023 3.007 0 6.016-.004 6.303-.018.806-.039 1.274-.102 1.792-.237a4.994 4.994 0 003.252-2.682c.323-.672.487-1.326.561-2.274.017-.207.023-3.504.023-6.796 0-3.293-.007-6.583-.023-6.79-.075-.964-.24-1.612-.573-2.297a4.755 4.755 0 00-1.02-1.407c-.787-.759-1.751-1.22-2.9-1.387-.556-.081-.667-.105-3.514-.11h-3.876z"
        />
        <Path
          fill="#FFF"
          d="M11.91 3.138c-2.39 0-2.689.011-3.627.054-.936.043-1.575.193-2.134.412a4.284 4.284 0 00-1.558 1.022c-.49.492-.79.986-1.015 1.57-.218.563-.366 1.207-.409 2.15-.042.945-.052 1.247-.052 3.654s.01 2.708.053 3.653c.043.943.19 1.587.408 2.15a4.334 4.334 0 001.014 1.57c.489.493.98.797 1.558 1.023.56.22 1.198.369 2.134.412.938.043 1.238.054 3.626.054s2.687-.011 3.625-.054c.936-.043 1.576-.193 2.136-.412a4.299 4.299 0 001.556-1.022 4.34 4.34 0 001.015-1.57c.217-.564.365-1.208.409-2.15.042-.946.053-1.247.053-3.654s-.01-2.709-.053-3.654c-.044-.943-.192-1.587-.409-2.15a4.324 4.324 0 00-1.015-1.57 4.29 4.29 0 00-1.557-1.022c-.56-.22-1.2-.369-2.136-.412-.938-.043-1.237-.054-3.626-.054h.003zm-.79 1.597h.79c2.347 0 2.625.009 3.553.051.857.04 1.322.184 1.632.306.41.16.703.352 1.01.662.309.31.5.606.659 1.02.12.311.264.78.303 1.644.042.934.051 1.215.051 3.58s-.01 2.646-.051 3.58c-.04.864-.183 1.333-.303 1.645-.16.413-.35.708-.658 1.018-.308.31-.6.502-1.01.662-.31.122-.776.266-1.633.306-.927.042-1.206.051-3.554.051s-2.626-.009-3.553-.051c-.858-.04-1.323-.185-1.633-.306a2.712 2.712 0 01-1.012-.663 2.756 2.756 0 01-.658-1.018c-.12-.312-.263-.781-.302-1.645-.043-.934-.051-1.215-.051-3.581 0-2.367.008-2.646.05-3.58.04-.864.183-1.333.303-1.645.16-.414.35-.71.658-1.02.308-.31.601-.501 1.012-.662.31-.122.775-.266 1.633-.306.81-.037 1.125-.048 2.764-.05v.002zm5.483 1.472c-.582 0-1.055.476-1.055 1.063s.473 1.063 1.055 1.063c.583 0 1.056-.476 1.056-1.063s-.473-1.064-1.056-1.064zM11.91 7.449C9.415 7.45 7.393 9.487 7.393 12c0 2.513 2.022 4.55 4.516 4.55s4.515-2.037 4.515-4.55-2.021-4.55-4.515-4.55zm0 1.597c1.619 0 2.931 1.323 2.931 2.954 0 1.631-1.312 2.954-2.93 2.954-1.62 0-2.932-1.323-2.932-2.954 0-1.631 1.312-2.954 2.931-2.954z"
        />
      </G>
    </AccessibleSvg>
  )
}

export const Instagram = styled(InstagramSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.greyDark,
  size: size ?? theme.icons.sizes.standard,
}))``
