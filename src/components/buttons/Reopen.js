import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  setCart,
  selectGroupOrder,
  closeGroupOrder,
} from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Reopen = ({ text = 'Reopen Group Order', icon = iconMap.ArrowLeft }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)

  const reopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      navigate('/review')
    })
  }

  return <ButtonBoth text={text} icon={icon} onClick={reopen} />
}

Reopen.displayName = 'Reopen'
Reopen.propTypes = {
  onClick: propTypes.func,
  icon: propTypes.element,
}

export default Reopen
