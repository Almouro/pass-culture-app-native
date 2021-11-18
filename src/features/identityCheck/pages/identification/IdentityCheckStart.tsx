import { t } from '@lingui/macro'
import { getSpacing } from '@pass-culture/id-check'
import React from 'react'

import { DMSInformation } from 'features/identityCheck/atoms/DMSInformation'
import { IdentityVerificationText } from 'features/identityCheck/atoms/IdentityVerificationText'
import { PageWithHeader } from 'features/identityCheck/components/layout/PageWithHeader'
import { SomeAdviceBeforeIdentityCheckModal } from 'features/identityCheck/components/SomeAdviceBeforeIdentityCheckModal'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { useModal } from 'ui/components/modals/useModal'
import { BicolorIdCardWithMagnifyingClass } from 'ui/svg/icons/BicolorIdCardWithMagnifyingClass'
import { Spacer } from 'ui/theme'

export const IdentityCheckStart = () => {
  const { visible, showModal, hideModal } = useModal(false)

  return (
    <React.Fragment>
      <PageWithHeader
        title={t`Identification`}
        scrollChildren={
          <React.Fragment>
            <BicolorIdCardWithMagnifyingClass size={getSpacing(36)} />
            <Spacer.Column numberOfSpaces={6} />
            <IdentityVerificationText />
            <Spacer.Column numberOfSpaces={6} />
            <DMSInformation />
          </React.Fragment>
        }
        fixedBottomChildren={
          <ButtonPrimary onPress={showModal} title={t`Commencer la vérification`} />
        }
      />
      <SomeAdviceBeforeIdentityCheckModal visible={visible} hideModal={hideModal} />
    </React.Fragment>
  )
}