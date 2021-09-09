import { t } from '@lingui/macro'
import React, { FunctionComponent, useRef } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

import { useAppSettings } from 'features/auth/settings'
import { useVenueOffers } from 'features/venue/api/useVenueOffers'
import { VenueIconCaptions } from 'features/venue/components/VenueIconCaptions'
import { VenueOffers } from 'features/venue/components/VenueOffers'
import { analytics } from 'libs/analytics'
import { WhereSection } from 'libs/geolocation/components/WhereSection'
import { parseType } from 'libs/parsers'
import { highlightLinks } from 'libs/parsers/highlightLinks'
import { AccessibilityBlock } from 'ui/components/accessibility/AccessibilityBlock'
import { AccordionItem } from 'ui/components/AccordionItem'
import { ContactBlock } from 'ui/components/contact/ContactBlock'
import { Hero } from 'ui/components/hero/Hero'
import { PartialAccordionDescription } from 'ui/components/PartialAccordionDescription'
import { SectionWithDivider } from 'ui/components/SectionWithDivider'
import { LocationPointer } from 'ui/svg/icons/LocationPointer'
import { getSpacing, Spacer, Typo } from 'ui/theme'

import { useVenue } from '../api/useVenue'

interface Props {
  venueId: number
  onScroll: () => void
}

export const VenueBody: FunctionComponent<Props> = ({ venueId, onScroll }) => {
  const { data: venue } = useVenue(venueId)
  const { data: offers } = useVenueOffers(venueId)
  const { data: settings } = useAppSettings()
  const scrollViewRef = useRef<ScrollView | null>(null)

  if (!venue) return <React.Fragment></React.Fragment>

  const {
    address,
    postalCode,
    city,
    publicName,
    withdrawalDetails,
    latitude,
    longitude,
    venueTypeCode,
    description,
    accessibility,
    contact,
  } = venue

  const venueAddress = address
    ? `${address}, ${postalCode} ${city}`
    : `${publicName}, ${postalCode} ${city}`

  const typeLabel = parseType(venueTypeCode)

  const shouldShowVenueOffers = !!settings?.useAppSearch && !!offers && offers?.hits.length > 0
  const shouldShowAccessibility = Object.values(accessibility).some(
    (value) => value !== undefined && value !== null
  )

  return (
    <Container
      testID="venue-container"
      scrollEventThrottle={20}
      scrollIndicatorInsets={scrollIndicatorInsets}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={scrollViewRef as any}
      bounces={false}
      onScroll={onScroll}>
      {/* TODO(antoinewg, #10099) use the image once we have it */}
      <Hero imageUrl={undefined} type="venue" venueType={venueTypeCode || null} />
      <Spacer.Column numberOfSpaces={4} />
      <MarginContainer>
        <VenueAddressContainer>
          <IconContainer>
            <LocationPointer size={getSpacing(4)} />
          </IconContainer>
          <StyledText numberOfLines={1}>{venueAddress}</StyledText>
        </VenueAddressContainer>
        <Spacer.Column numberOfSpaces={2} />
        <VenueTitle
          testID="venueTitle"
          numberOfLines={2}
          adjustsFontSizeToFit
          allowFontScaling={false}>
          {venue.name}
        </VenueTitle>
        <Spacer.Column numberOfSpaces={4} />
      </MarginContainer>

      <VenueIconCaptions
        type={venueTypeCode || null}
        label={typeLabel}
        locationCoordinates={{ latitude, longitude }}
      />

      {/* Description */}
      <PartialAccordionDescription description={description || ''} />

      {/* Offres */}
      <SectionWithDivider visible={shouldShowVenueOffers}>
        <VenueOffers venueId={venueId} />
      </SectionWithDivider>

      {/* Où */}
      <SectionWithDivider visible margin>
        <WhereSection
          beforeNavigateToItinerary={() =>
            analytics.logConsultItinerary({ venueId, from: 'venue' })
          }
          venue={venue}
          address={venueAddress}
          locationCoordinates={{ latitude, longitude }}
        />
      </SectionWithDivider>

      {/* Modalités de retrait */}
      <SectionWithDivider visible={!!withdrawalDetails}>
        <AccordionItem
          title={t`Modalités de retrait`}
          scrollViewRef={scrollViewRef}
          onOpenOnce={() => analytics.logConsultWithdrawal({ venueId })}>
          <Typo.Body>{withdrawalDetails && highlightLinks(withdrawalDetails)}</Typo.Body>
        </AccordionItem>
      </SectionWithDivider>

      {/* Accessibilité */}
      <SectionWithDivider visible={shouldShowAccessibility}>
        <AccordionItem
          title={t`Accessibilité`}
          scrollViewRef={scrollViewRef}
          onOpenOnce={() => analytics.logConsultAccessibility({ venueId })}>
          <AccessibilityBlock {...accessibility} />
        </AccordionItem>
      </SectionWithDivider>

      {/* Contact */}
      <SectionWithDivider visible={true}>
        <AccordionItem title={t`Contact`} scrollViewRef={scrollViewRef}>
          <ContactBlock {...contact} venue={venue} />
        </AccordionItem>
      </SectionWithDivider>

      <SectionWithDivider visible>
        <Spacer.Column numberOfSpaces={6} />
      </SectionWithDivider>
    </Container>
  )
}

const scrollIndicatorInsets = { right: 1 }

const Container = styled.ScrollView({})
const VenueTitle = styled(Typo.Title3)({ textAlign: 'center' })

const MarginContainer = styled.View({
  marginHorizontal: getSpacing(6),
})

const VenueAddressContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: getSpacing(2),
})

const IconContainer = styled.View({
  marginRight: getSpacing(1),
})

const StyledText = styled(Typo.Caption)({
  flexShrink: 1,
  textTransform: 'capitalize',
})
