import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectOrder, selectCustomerOrders } from '@open-tender/redux'
import { getLastOrder } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../iconMap'

const OrderNow = ({
  text = 'Order Now',
  icon = iconMap.ShoppingBag,
  color = 'primary',
}) => {
  const history = useHistory()
  // const { auth } = useSelector(selectCustomer)
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const { entities: orders } = useSelector(selectCustomerOrders)
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0

  const order = () => {
    const slug =
      revenueCenter && (lastOrder || isCurrentOrder)
        ? `/menu/${revenueCenter.slug}`
        : '/order-type'
    history.push(slug)
  }

  return (
    <ButtonStyled onClick={order} icon={icon} color={color} size="small">
      {isCurrentOrder ? 'Continue Order' : text}
    </ButtonStyled>
  )
}

OrderNow.displayName = 'OrderNow'
OrderNow.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  color: propTypes.string,
}

export default OrderNow
