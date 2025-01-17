import { t } from '@lingui/macro'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { navigateToHomeConfig } from 'features/navigation/helpers'
import { RootStackParamList } from 'features/navigation/RootNavigator'
import { formatToReadableFrenchDate } from 'libs/dates'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { GenericInfoPage } from 'ui/components/GenericInfoPage'
import { TouchableLink } from 'ui/components/touchableLink/TouchableLink'
import { CalendarIllustration } from 'ui/svg/icons/CalendarIllustration'
import { Typo } from 'ui/theme'

type Props = StackScreenProps<RootStackParamList, 'NotYetUnderageEligibility'>

export const NotYetUnderageEligibility: FunctionComponent<Props> = (props) => {
  return (
    <GenericInfoPage
      title={t`C'est pour bientôt\u00a0!`}
      icon={CalendarIllustration}
      buttons={[
        <TouchableLink
          key={1}
          as={ButtonPrimaryWhite}
          wording={t`Retourner à l'accueil`}
          navigateTo={navigateToHomeConfig}
        />,
      ]}>
      <StyledBody>
        {t({
          id: 'reviens a partir du',
          values: {
            formatedDate: formatToReadableFrenchDate(props.route.params.eligibilityStartDatetime),
          },
          message:
            'Reviens à partir du {formatedDate} pour poursuivre ton inscription et bénéficier des offres du pass Culture.',
        })}
      </StyledBody>
    </GenericInfoPage>
  )
}

const StyledBody = styled(Typo.Body)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.white,
}))
