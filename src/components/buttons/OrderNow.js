import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  selectOrder,
  selectCustomerOrders,
  selectCartQuantity,
} from '@open-tender/redux'
import { getLastOrder } from '@open-tender/js'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const OrderNowIcon = styled('div')`
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -0.5rem 0 0.5rem;
  }
`

const OrderNowCount = styled('div')`
  position: absolute;
  z-index: 1;
  top: -0.3rem;
  right: -0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.6rem;
  height: 2.6rem;
  border-radius: 1.3rem;
  padding-bottom: 0.1rem;
  border-width: 0.2rem;
  border-style: solid;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.alert};
  border-color: ${(props) => props.theme.colors.light};
  font-weight: ${(props) => props.theme.boldWeight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: 0.5rem;
    right: 0.5rem;
    min-width: 1.9rem;
    height: 1.9rem;
    border-radius: 1rem;
    font-size: 1rem;
    border: 0;
  }
`

const OrderNow = ({
  text = 'Order Now',
  icon = iconMap.ShoppingBag,
  color = 'primary',
  size = 'small',
}) => {
  const navigate = useNavigate()
  // const { auth } = useSelector(selectCustomer)
  const { pathname } = useLocation()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const { entities: orders } = useSelector(selectCustomerOrders)
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0
  const cartQuantity = useSelector(selectCartQuantity)
  const showMenu = revenueCenter && (lastOrder || isCurrentOrder)

  const order = () => {
    const path = showMenu
      ? `/menu/${revenueCenter.slug}`
      : pathname === '/account'
      ? '/order-type'
      : '/account'
    navigate(path)
  }

  return isCurrentOrder ? (
    <OrderNowIcon>
      <OrderNowCount>{cartQuantity}</OrderNowCount>
      <ButtonIcon
        label={isCurrentOrder ? 'Continue Order' : text}
        onClick={order}
        size={isBrowser ? 26 : 20}
      >
        {icon}
      </ButtonIcon>
    </OrderNowIcon>
  ) : null
}

OrderNow.displayName = 'OrderNow'
OrderNow.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  color: propTypes.string,
  size: propTypes.string,
}

export default OrderNow
