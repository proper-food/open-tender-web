import React, { useMemo } from 'react'
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
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const ContinueOrderIcon = styled('div')`
  position: relative;
  margin: 0 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -0.5rem 0 0.5rem;
  }
`

const ContinueOrderCount = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0.1rem;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.1rem;
  height: 2.1rem;
  border-radius: 1.2rem;
  padding-bottom: 0.1rem;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.alert};
  font-weight: ${(props) => props.theme.boldWeight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: 0.5rem;
    right: 0.5rem;
    min-width: 1.9rem;
    height: 1.9rem;
    border-radius: 1rem;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const ContinueOrder = () => {
  const navigate = useNavigate()
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
    <ContinueOrderIcon>
      <ContinueOrderCount>{cartQuantity}</ContinueOrderCount>
      <ButtonIcon
        label="Continue Order"
        onClick={order}
        size={isBrowser ? 24 : 20}
      >
        {iconMap.ShoppingBag}
      </ButtonIcon>
    </ContinueOrderIcon>
  ) : null
}

ContinueOrder.displayName = 'ContinueOrder'

export default ContinueOrder
