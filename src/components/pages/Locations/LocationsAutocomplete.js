import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  setAddress,
  selectOrder,
  setOrderServiceType,
} from '@open-tender/redux'
import { ButtonStyled, GoogleMapsAutocomplete } from '@open-tender/components'

import iconMap from '../../iconMap'
import { useHistory } from 'react-router-dom'

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
  // background-color: ${(props) => props.theme.bgColors.primary};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    bottom: ${(props) => props.theme.layout.marginMobile};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const LocationsAutocompleteForm = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 2rem;
  // border-radius: 1rem;
  // background-color: ${(props) => props.theme.overlay.dark};

  label {
    display: block
    flex: 1 1 auto;
    color: ${(props) => props.theme.colors.light};
  }

  input {
    color: ${(props) => props.theme.colors.light};
    background-color: transparent;
    border-color: ${(props) => props.theme.colors.light};

    &:active,
    &:focus {
      background-color: transparent;
      border-color: ${(props) => props.theme.colors.light};
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const LocationsAutocompleteButtons = styled.div`
  flex: 0 0 auto;
  margin: 0 0 0 2rem;

  button {
    color: ${(props) => props.theme.colors.light};
    border-color: ${(props) => props.theme.colors.light};
    background: transparent;

    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }

    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
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
  const history = useHistory()
  const { address, serviceType } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    history.push('/locations')
  }

  return (
    <LocationsAutocompleteView>
      <LocationsAutocompleteForm>
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
        <LocationsAutocompleteButtons>
          <ButtonStyled onClick={handlePickup} size="small" disabled={!address}>
            Pickup
          </ButtonStyled>
          <ButtonStyled
            onClick={handleDelivery}
            size="small"
            disabled={!address}
          >
            Delivery
          </ButtonStyled>
        </LocationsAutocompleteButtons>
      </LocationsAutocompleteForm>
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
