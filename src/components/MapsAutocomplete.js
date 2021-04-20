import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import { Box, GoogleMapsAutocomplete } from '@open-tender/components'

import iconMap from './iconMap'

const MapsAutocompleteView = styled('div')`
  position: relative;
  z-index: 2;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: 0.2rem 0 ${(props) => props.theme.layout.padding};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: fixed;
    z-index: 15;
    top: 6rem;
    left: 0;
    right: 0;
    height: 7.2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    background-color: 0 ${(props) => props.theme.bgColors.primary};
  }
`

const MapsAutocompleteInput = styled(Box)`
  padding: ${(props) => props.theme.layout.paddingMobile};
`

const MapsAutocomplete = ({
  setCenter,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const { address, serviceType } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'

  return (
    <MapsAutocompleteView>
      <MapsAutocompleteInput>
        <GoogleMapsAutocomplete
          maps={maps}
          map={map}
          sessionToken={sessionToken}
          autocomplete={autocomplete}
          formattedAddress={formattedAddress}
          setAddress={(address) => dispatch(setAddress(address))}
          setCenter={setCenter}
          icon={iconMap.Navigation}
          placeholder={placeholder}
        />
      </MapsAutocompleteInput>
    </MapsAutocompleteView>
  )
}

MapsAutocomplete.displayName = 'MapsAutocomplete'
MapsAutocomplete.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default MapsAutocomplete
