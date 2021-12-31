import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setOrderServiceType,
  setAddress,
  setRevenueCenter,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'

export const RevenueCenterButtons = ({ revenueCenter }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    name,
    slug,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
  } = revenueCenter
  const settings = revenueCenter.settings || revenueCenter
  const { first_times: ft, order_times: ot } = settings
  const menuSlug = `/menu/${slug}`
  const serviceTypes = ['PICKUP', 'DELIVERY']
  const hasPickup =
    ((ft && ft.PICKUP) || (ot && ot.PICKUP)) && serviceTypes.includes('PICKUP')
  const hasWalkin =
    ((ft && ft.PICKUP) || (ot && ot.PICKUP)) && serviceTypes.includes('WALKIN')
  const hasDelivery =
    ((ft && ft.DELIVERY) || (ot && ot.DELIVERY)) &&
    serviceTypes.includes('DELIVERY')

  const handleWalkin = () => {
    dispatch(setOrderServiceType(rcType, 'WALKIN', false))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType(rcType, 'PICKUP', isOutpost))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(setRevenueCenter(revenueCenter))
    history.push(menuSlug)
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType(rcType, 'DELIVERY', isOutpost))
    if (isOutpost) {
      dispatch(setAddress(address))
      dispatch(setRevenueCenter(revenueCenter))
      history.push(menuSlug)
    } else {
      dispatch(setAddress(null))
      dispatch(setRevenueCenter(revenueCenter))
      dispatch(openModal({ type: 'mapsAutocomplete' }))
    }
  }

  return (
    <>
      {hasWalkin && (
        <ButtonStyled
          label={`Order Dine-in from ${name}`}
          icon={iconMap.Coffee}
          onClick={handleWalkin}
        >
          Order {hasDelivery ? 'Dine-in' : 'Here'}
        </ButtonStyled>
      )}
      {hasPickup && (
        <ButtonStyled
          label={`Order Pickup from ${name}`}
          icon={iconMap.ShoppingBag}
          onClick={handlePickup}
        >
          Order {hasDelivery ? 'Pickup' : 'Here'}
        </ButtonStyled>
      )}
      {hasDelivery && (
        <ButtonStyled
          label={`Order Delivery from ${name}`}
          icon={iconMap.Truck}
          onClick={handleDelivery}
        >
          Order Delivery
        </ButtonStyled>
      )}
    </>
  )
}

RevenueCenterButtons.displayName = 'RevenueCenterButtons'
RevenueCenterButtons.propTypes = {
  revenueCenter: propTypes.object,
}

export default RevenueCenterButtons
