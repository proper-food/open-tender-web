import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  resetOrderType,
  resetOrder,
  selectOrder,
  fetchCustomerOrders,
  selectCustomerOrders,
  fetchCustomerFavorites,
  fetchRevenueCenter,
  setOrderServiceType,
  setAddress,
  selectCartQuantity,
  fetchMenuItems,
} from '@open-tender/redux'
import { getLastOrder, makeOrderTypeName } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../../iconMap'
import { ButtonText, Loading, PageButtons } from '../..'

const Continue = ({ size, icon, current, startNew }) => {
  return (
    <>
      <ButtonStyled icon={icon} onClick={current} size={size}>
        <ButtonText>Continue Current Order</ButtonText>
      </ButtonStyled>
      <ButtonStyled
        icon={iconMap.RefreshCw}
        onClick={startNew}
        size={size}
        color="secondary"
      >
        <ButtonText>Start a New Order</ButtonText>
      </ButtonStyled>
    </>
  )
}

const Reorder = ({ size, icon, orderTypeName, reorder, switchType }) => {
  return (
    <>
      <ButtonStyled icon={icon} onClick={reorder} size={size}>
        <ButtonText>Order {orderTypeName} Again</ButtonText>
      </ButtonStyled>
      <ButtonStyled
        icon={iconMap.RefreshCw}
        onClick={switchType}
        size={size}
        color="secondary"
      >
        <ButtonText>Switch Order Type</ButtonText>
      </ButtonStyled>
    </>
  )
}

const makeOrderTypeIcon = (orderType, serviceType) => {
  return orderType === 'CATERING'
    ? iconMap.Users
    : serviceType === 'DELIVERY'
    ? iconMap.Truck
    : iconMap.ShoppingBag
}

const AccountActions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, orderType, serviceType, cart } = currentOrder
  const { entities: orders, loading } = useSelector(selectCustomerOrders)
  const cartQuantity = useSelector(selectCartQuantity)
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  let orderTypeName = null
  let orderTypeIcon = iconMap.ShoppingBag
  if (isCurrentOrder) {
    orderTypeIcon = makeOrderTypeIcon(orderType, serviceType)
  } else if (lastOrder) {
    const { order_type, service_type } = lastOrder
    orderTypeName = makeOrderTypeName(order_type, service_type)
    orderTypeIcon = makeOrderTypeIcon(order_type, service_type)
  }
  const reloadLast = lastOrder && !isCurrentOrder
  const isLoading = loading === 'pending' && !isCurrentOrder && !lastOrder
  const buttonSize = isBrowser ? 'default' : 'small'

  useEffect(() => {
    dispatch(fetchCustomerOrders(20))
    dispatch(fetchCustomerFavorites())
  }, [dispatch])

  useEffect(() => {
    if (reloadLast) {
      const {
        revenue_center,
        service_type: serviceType,
        order_type,
        address,
      } = lastOrder
      const { revenue_center_id: revenueCenterId, is_outpost } = revenue_center
      if (!cartQuantity) {
        dispatch(fetchRevenueCenter(revenueCenterId))
        dispatch(setOrderServiceType(order_type, serviceType, is_outpost))
        dispatch(setAddress(address || null))
      }
      dispatch(fetchMenuItems({ revenueCenterId, serviceType }))
    }
  }, [reloadLast, lastOrder, cartQuantity, dispatch])

  const startNewOrder = () => {
    dispatch(resetOrder())
    history.push(`/order-type`)
  }

  const switchOrderType = () => {
    dispatch(resetOrderType())
    history.push(`/order-type`)
  }

  const continueCurrent = () => {
    history.push(revenueCenter ? `/menu/${revenueCenter.slug}` : '/')
  }

  return (
    <PageButtons>
      {isLoading ? (
        <Loading text="Retrieving your account info..." />
      ) : isCurrentOrder ? (
        <Continue
          icon={orderTypeIcon}
          size={buttonSize}
          current={continueCurrent}
          startNew={startNewOrder}
        />
      ) : lastOrder ? (
        <Reorder
          icon={orderTypeIcon}
          size={buttonSize}
          orderTypeName={orderTypeName}
          reorder={continueCurrent}
          switchType={switchOrderType}
        />
      ) : (
        <ButtonStyled
          icon={iconMap.ShoppingBag}
          onClick={startNewOrder}
          size={buttonSize}
        >
          <ButtonText>Start a New Order</ButtonText>
        </ButtonStyled>
      )}
    </PageButtons>
  )
}

AccountActions.displayName = 'AccountActions'

export default AccountActions
