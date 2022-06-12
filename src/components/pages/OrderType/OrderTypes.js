import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Flag,
  ShoppingBag,
  Truck,
  Users,
  Gift,
  Coffee,
  ShoppingCart,
  DollarSign,
} from 'react-feather'
import {
  resetRevenueCenters,
  resetOrderType,
  selectGroupOrder,
  resetGroupOrder,
  setOrderServiceType,
  resetCheckout,
} from '@open-tender/redux'
import { Message, useGeolocation } from '@open-tender/components'

import {
  selectContent,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectSettings,
} from '../../../slices'
import { NavButtons } from '../..'
import OrderTypeLinks from './OrderTypeLinks'

const OrderTypes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { geoLatLng, geoError } = useGeolocation()
  const { orderType: orderTypeContent, home: homeContent } =
    useSelector(selectContent)
  const contentTypes =
    orderTypeContent.orderTypes || homeContent.orderTypes || []
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}
  // const asLinks = ['GIFT_CARDS', 'DONATIONS']
  const asLinks = []
  const orderButtons = orderTypes.filter((i) => !asLinks.includes(i))
  const orderLinks = orderTypes.filter((i) => asLinks.includes(i))

  useEffect(() => {
    dispatch(setGeoLoading())
    dispatch(resetRevenueCenters())
    dispatch(resetOrderType())
    dispatch(resetCheckout())
  }, [dispatch])

  useEffect(() => {
    if (cartGuestId) dispatch(resetGroupOrder())
  }, [dispatch, cartGuestId])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  const handleOutpost = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    navigate('/locations')
  }

  const handleWalkin = () => {
    dispatch(setOrderServiceType('OLO', 'WALKIN'))
    navigate('/locations')
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    navigate('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    navigate('/locations')
  }

  const handleCatering = () => {
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    navigate('/catering-address')
  }

  const handleMerch = () => {
    dispatch(setOrderServiceType('MERCH', 'DELIVERY'))
    navigate('/locations')
  }

  const handleGiftCards = () => {
    navigate('/gift-cards')
  }

  const handleDonations = () => {
    navigate('/donations')
  }

  const handlers = {
    OUTPOST: handleOutpost,
    WALKIN: handleWalkin,
    PICKUP: handlePickup,
    DELIVERY: handleDelivery,
    CATERING: handleCatering,
    MERCH: handleMerch,
    GIFT_CARDS: handleGiftCards,
    DONATIONS: handleDonations,
  }

  const icons = {
    OUTPOST: <Flag size={null} />,
    WALKIN: <Coffee size={null} />,
    PICKUP: <ShoppingBag size={null} />,
    DELIVERY: <Truck size={null} />,
    CATERING: <Users size={null} />,
    MERCH: <ShoppingCart size={null} />,
    GIFT_CARDS: <Gift size={null} />,
    DONATIONS: <DollarSign size={null} />,
  }

  const buttons = orderButtons.map((orderType) => ({
    ...contentTypes[orderType],
    icon: icons[orderType],
    onClick: handlers[orderType],
  }))

  return (
    <div>
      {hasOrderTypes ? (
        <>
          <NavButtons buttons={buttons} />
          <OrderTypeLinks
            orderLinks={orderLinks}
            contentTypes={contentTypes}
            icons={icons}
            handlers={handlers}
          />
        </>
      ) : (
        <Message color="error">
          This brand is not currently accepting online orders.
        </Message>
      )}
    </div>
  )
}

OrderTypes.displayName = 'OrderTypes'

export default OrderTypes
