import React from 'react'
import propTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartTotal, checkout } from '@open-tender/redux'
import {
  timezoneMap,
  isoToDateStr,
  capitalize,
  makeOrderAddress,
} from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import iconMap from './iconMap'
import { Card, OrderImages, OrderTag } from '.'

const OrderCardCurrent = ({ order }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderType, serviceType, revenueCenter, requestedAt, address, cart } =
    order
  const cartTotal = useSelector(selectCartTotal)
  const tz = timezoneMap[revenueCenter.timezone]
  const requestedAtStr =
    requestedAt === 'asap'
      ? 'ASAP'
      : isoToDateStr(requestedAt, tz, 'MMMM d, yyyy @ h:mma')
  const orderTypeStr = orderType === 'OLO' ? serviceType : orderType
  const streetAddress = makeOrderAddress(address)
  const itemImages = cart
    .filter((i) => i.imageUrl)
    .map((i) => ({ title: i.name, ...i }))
  const itemNames = cart.map((i) => i.name).join(', ')

  const handleCheckout = () => {
    dispatch(checkout())
    navigate('/checkout')
  }

  const backToMenu = () => {
    navigate(`/menu/${revenueCenter.slug}`)
  }

  return (
    <Card
      tag={<OrderTag isUpcoming={true} status="IN_PROGRESS" />}
      preface="Your Current Order"
      title={`${capitalize(orderTypeStr)} from ${revenueCenter.name}`}
      content={
        <>
          <p>
            {requestedAtStr} &nbsp;|&nbsp; ${cartTotal.toFixed(2)}
          </p>
          <p>{streetAddress}</p>
          <p>
            <Link to="/account/addresses">Change your address</Link>
          </p>
          <OrderImages images={itemImages} names={itemNames} />
        </>
      }
      footer={
        <>
          <ButtonStyled
            icon={iconMap.DollarSign}
            onClick={handleCheckout}
            size="small"
          >
            Checkout
          </ButtonStyled>
          <ButtonStyled
            icon={iconMap.Map}
            onClick={backToMenu}
            size="small"
            color="secondary"
          >
            Menu
          </ButtonStyled>
        </>
      }
    />
  )
}

OrderCardCurrent.displayName = 'OrderCardCurrent'
OrderCardCurrent.propTypes = {
  order: propTypes.object,
}

export default OrderCardCurrent
