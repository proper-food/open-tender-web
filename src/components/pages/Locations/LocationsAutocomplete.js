import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMapsAutocomplete } from '@open-tender/components'

import iconMap from '../../iconMap'

const LocationsAutocompleteView = styled('div')`
  position: absolute;
  z-index: 3;
  bottom: ${(props) => props.theme.layout.margin};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.primary};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    bottom: ${(props) => props.theme.layout.marginMobile};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const LocationsAutocomplete = ({
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
    <LocationsAutocompleteView>
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
    </LocationsAutocompleteView>
  )
}

LocationsAutocomplete.displayName = 'LocationsAutocomplete'
LocationsAutocomplete.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default LocationsAutocomplete
