import React from 'react'
import styled from 'styled-components/native'

import { accessibilityAndTestId } from 'libs/accessibilityAndTestId'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { Clear } from 'ui/svg/icons/Clear'
import { getSpacing, Typo } from 'ui/theme'

interface Props {
  label: string
  onPress: () => void
  testId: string
  children?: never
}

export const ClippedTag: React.FC<Props> = ({ label, onPress, testId }) => {
  return (
    <Container>
      <VenueLabelContainer>
        <VenueLabel>{label}</VenueLabel>
      </VenueLabelContainer>
      <StyledTouchableOpacity onPress={onPress} testID="retirer-lieu">
        <ClearIcon {...accessibilityAndTestId(testId)} />
      </StyledTouchableOpacity>
    </Container>
  )
}

const ClearIcon = styled(Clear).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: theme.icons.sizes.smaller,
}))``

const Container = styled.View({
  flexDirection: 'row',
})

const VenueLabelContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  paddingVertical: getSpacing(2),
  paddingLeft: getSpacing(3),
  borderTopLeftRadius: theme.borderRadius.checkbox,
  borderBottomLeftRadius: theme.borderRadius.checkbox,
  maxWidth: '70%',
}))

const VenueLabel = styled(Typo.ButtonText).attrs({
  numberOfLines: 1,
})(({ theme }) => ({ color: theme.colors.white }))

const StyledTouchableOpacity = styled(TouchableOpacity)(({ theme }) => ({
  padding: getSpacing(2),
  backgroundColor: theme.colors.primary,
  borderTopRightRadius: theme.borderRadius.button,
  borderBottomRightRadius: theme.borderRadius.button,
}))
