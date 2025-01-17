import { t } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/native'

import { analytics } from 'libs/firebase/analytics'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { ButtonTertiaryWhite } from 'ui/components/buttons/ButtonTertiaryWhite'
import { TouchableLink } from 'ui/components/touchableLink/TouchableLink'
import { Background } from 'ui/svg/Background'
import { UserFavorite } from 'ui/svg/icons/UserFavorite'
import { getSpacing, Spacer, Typo } from 'ui/theme'

export const NotConnectedFavorites = () => {
  return (
    <Container>
      <Background />
      <Spacer.TopScreen />
      <Spacer.Flex />
      <StyledUserFavorite />
      <CenteredContainer>
        <TypoTitle4>{t`Connecte-toi pour profiter de cette fonctionnalité\u00a0!`}</TypoTitle4>
        <Spacer.Column numberOfSpaces={4} />

        <TextContainer>
          <CenteredText>
            <Body>
              {t`Ton compte te permettra de retrouver tous tes favoris en un clin d'oeil\u00a0!`}
            </Body>
          </CenteredText>
        </TextContainer>
      </CenteredContainer>

      <Row>
        <ButtonContainer>
          <TouchableLink
            as={ButtonPrimaryWhite}
            wording={t`S'inscrire`}
            navigateTo={{ screen: 'SignupForm' }}
            onPress={analytics.logSignUpFromFavorite}
            buttonHeight="tall"
          />
          <Spacer.Column numberOfSpaces={4} />
          <TouchableLink
            as={ButtonTertiaryWhite}
            wording={t`Se connecter`}
            navigateTo={{ screen: 'Login' }}
            onPress={analytics.logSignInFromFavorite}
            buttonHeight="tall"
          />
        </ButtonContainer>
      </Row>
      <Spacer.Column numberOfSpaces={12} />
      <Spacer.Flex />
      <Spacer.BottomScreen />
    </Container>
  )
}

const StyledUserFavorite = styled(UserFavorite).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: theme.illustrations.sizes.fullPage,
}))``

const Container = styled.View({
  flex: 1,
  alignItems: 'center',
})

const Row = styled.View({ flexDirection: 'row' })

const TypoTitle4 = styled(Typo.Title4)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.white,
}))

const CenteredContainer = styled.View({
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginHorizontal: getSpacing(8),
})

const ButtonContainer = styled.View({ flex: 1, maxWidth: getSpacing(44) })

const TextContainer = styled.View({ maxWidth: getSpacing(88) })

const CenteredText = styled(Typo.Body)({
  textAlign: 'center',
})

const Body = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.white,
}))
