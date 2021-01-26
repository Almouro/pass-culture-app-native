import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import {
  getLocationChoiceName,
  getLocationChoiceIcon,
} from 'features/search/components/locationChoice.utils'
import { LocationType } from 'libs/algolia'
import { Validate } from 'ui/svg/icons/Validate'
import { getSpacing, Spacer, Typo, ColorsEnum } from 'ui/theme'
import { ACTIVE_OPACITY } from 'ui/theme/colors'

import { useSearch } from '../pages/SearchWrapper'

type Props = {
  type: LocationType
}

export const LocationChoice: React.FC<Props> = ({ type }) => {
  const { searchState, dispatch } = useSearch()
  const isSelected = searchState.searchAround === type
  const iconColor2 = isSelected ? ColorsEnum.PRIMARY : ColorsEnum.SECONDARY
  const LocationChoiceIcon = getLocationChoiceIcon(type)
  const onPress = () => dispatch({ type: 'LOCATION_TYPE', payload: type })
  return (
    <Container onPress={onPress}>
      <FirstPart>
        <LocationChoiceIcon size={48} color2={iconColor2} />
        <Spacer.Row numberOfSpaces={2} />
        <Typo.ButtonText color={isSelected ? ColorsEnum.PRIMARY : ColorsEnum.BLACK}>
          {getLocationChoiceName(type)}
        </Typo.ButtonText>
      </FirstPart>
      {isSelected && (
        <IconContainer>
          <Validate color={ColorsEnum.PRIMARY} />
        </IconContainer>
      )}
    </Container>
  )
}

const FirstPart = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: ACTIVE_OPACITY,
}))({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginHorizontal: getSpacing(6),
})

const IconContainer = styled.View({
  paddingRight: getSpacing(10),
})
