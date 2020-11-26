import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components/native'

import { UseNavigationType } from 'features/navigation/RootNavigator'
import { _ } from 'libs/i18n'
import { BottomCard, BottomCardContentContainer } from 'ui/components/BottomCard'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { DateInput } from 'ui/components/inputs/DateInput'
import { InputError } from 'ui/components/inputs/InputError'
import { ModalHeader } from 'ui/components/modals/ModalHeader'
import { Background } from 'ui/svg/Background'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Close } from 'ui/svg/icons/Close'
import { getSpacing } from 'ui/theme'

interface State {
  date: string | null
  hasError: boolean
  isComplete: boolean
}

export const SetBirthday: FunctionComponent = () => {
  const [state, setState] = useState<State>({
    date: '',
    hasError: false,
    isComplete: false,
  })

  const { goBack } = useNavigation<UseNavigationType>()

  function onChangeValue(value: string | null, isComplete: boolean) {
    setState((_state) => ({ ..._state, date: value, isComplete }))
  }

  function onSubmit() {
    setState((_state) => ({ ..._state, hasError: _state.date === null }))
  }

  return (
    <React.Fragment>
      <Background />
      <BottomCard>
        <ModalHeader
          title={_(t`Ton anniversaire`)}
          leftIcon={ArrowPrevious}
          onLeftIconPress={goBack}
          rightIcon={Close}
        />
        <BottomCardContentContainer>
          <DateInputContainer>
            <DateInput onChangeValue={onChangeValue} />
            <InputError
              visible={state.hasError}
              messageId="La date choisie est incorrecte"
              numberOfSpacesTop={5}
            />
          </DateInputContainer>
          <ButtonPrimary title={_(t`Continuer`)} onPress={onSubmit} disabled={!state.isComplete} />
        </BottomCardContentContainer>
      </BottomCard>
    </React.Fragment>
  )
}

const DateInputContainer = styled.View({
  marginVertical: getSpacing(10),
  alignItems: 'center',
  width: '100%',
})
