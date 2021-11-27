import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectTimezone } from '@open-tender/redux'
import { makeRequestedAtStr } from '@open-tender/js'

import { openModal } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const OrderTime = ({
  icon = iconMap.Clock,
  style = null,
  useButton = false,
}) => {
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter, serviceType, orderType } =
    useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const requestedAtText = makeRequestedAtStr(requestedAt, tz)
  const onClick = () => {
    const args = {
      focusFirst: true,
      skipClose: true,
      revenueCenter,
      serviceType,
      orderType,
      requestedAt,
    }
    dispatch(openModal({ type: 'orderTime', args }))
  }

  if (!revenueCenter || !requestedAt) return null

  return (
    <ButtonBoth
      text={requestedAtText}
      icon={icon}
      onClick={onClick}
      style={style}
      useButton={useButton}
    />
  )
}

OrderTime.displayName = 'OrderTime'
OrderTime.propTypes = {
  icon: propTypes.element,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default OrderTime
