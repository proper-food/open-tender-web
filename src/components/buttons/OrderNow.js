import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCustomer, selectOrder } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../iconMap'

const OrderNow = ({
  text = 'Order Now',
  icon = iconMap.ShoppingBag,
  color = 'primary',
}) => {
  const history = useHistory()
  const { auth } = useSelector(selectCustomer)
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter } = currentOrder

  const order = () => {
    history.push(
      auth && revenueCenter ? `/menu/${revenueCenter.slug}` : '/order-types'
    )
  }

  return (
    <ButtonStyled onClick={order} icon={icon} color={color} size="small">
      {text}
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
