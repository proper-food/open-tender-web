import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
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
import { ButtonStyled, Message, useGeolocation } from '@open-tender/components'

import {
  selectContent,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
  selectSettings,
} from '../../../slices'
import { NavButtons } from '../..'

const OrderTypesView = styled('div')``

const OrderTypesFooter = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.5s forwards;
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }

  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }
`

const OrderTypesLinks = styled('div')`
  margin: 4rem 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 3rem 0 0;
    justify-content: center;
  }

  button {
    display: block;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bgColors.secondary};
    border-color: ${(props) => props.theme.bgColors.secondary};

    &:hover,
    &:active {
      color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.bgColors.tertiary};
      border-color: ${(props) => props.theme.bgColors.tertiary};
    }
  }

  button + button {
    margin: 0 0 0 1rem;
  }
`

const OrderTypes = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { geoLatLng, geoError } = useGeolocation()
  const { orderType: orderTypeContent, home: homeContent } =
    useSelector(selectContent)
  const contentTypes =
    orderTypeContent.orderTypes || homeContent.orderTypes || []
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}
  const orderButtons = orderTypes.filter(
    (i) => !['GIFT_CARDS', 'DONATIONS'].includes(i)
  )
  const orderLinks = orderTypes.filter((i) =>
    ['GIFT_CARDS', 'DONATIONS'].includes(i)
  )
  const hasLinks = orderLinks.length > 0

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
    history.push('/locations')
  }

  const handleWalkin = () => {
    dispatch(setOrderServiceType('OLO', 'WALKIN'))
    history.push('/locations')
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    history.push('/locations')
  }

  const handleCatering = () => {
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    history.push('/catering-address')
  }

  const handleMerch = () => {
    dispatch(setOrderServiceType('MERCH', 'DELIVERY'))
    history.push('/locations')
  }

  const handleGiftCards = () => {
    history.push('/gift-cards')
  }

  const handleDonations = () => {
    history.push('/donations')
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

  const links = orderLinks.map((orderType) => ({
    ...contentTypes[orderType],
    icon: icons[orderType],
    onClick: handlers[orderType],
  }))

  return (
    <OrderTypesView>
      {hasOrderTypes ? (
        <>
          <NavButtons buttons={buttons} />
          {hasLinks && (
            <OrderTypesFooter>
              {/* <Heading as="p">Other stuff...</Heading> */}
              <OrderTypesLinks>
                {links.map((link) => (
                  <ButtonStyled
                    key={link.title}
                    onClick={link.onClick}
                    size="small"
                    color="secondary"
                  >
                    {link.title}
                  </ButtonStyled>
                ))}
              </OrderTypesLinks>
            </OrderTypesFooter>
          )}
        </>
      ) : (
        <Message color="error">
          This brand is not currently accepting online orders.
        </Message>
      )}
    </OrderTypesView>
  )
}

OrderTypes.displayName = 'OrderTypes'
OrderTypes.propTypes = {
  content: propTypes.element,
}

export default OrderTypes
