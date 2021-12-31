import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectTimezone } from '@open-tender/redux'
import { makeRequestedAtStr } from '@open-tender/js'

import { openModal } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const RequestedAt = ({
  icon = iconMap.Clock,
  style = null,
  useButton = false,
}) => {
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter, serviceType, orderType } =
    useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const requestedAtText = makeRequestedAtStr(requestedAt, tz)
  const { order_times } = revenueCenter || {}
  const orderTimes = order_times ? order_times[serviceType] : null
  const args = {
    focusFirst: true,
    skipClose: true,
    style: orderTimes ? { alignItems: 'flex-start' } : {},
    revenueCenter,
    serviceType,
    orderType,
    requestedAt,
  }

  if (!revenueCenter || !requestedAt) return null

  return (
    <ButtonBoth
      text={requestedAtText}
      icon={icon}
      onClick={() => dispatch(openModal({ type: 'requestedAt', args }))}
      style={style}
      useButton={useButton}
    />
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  icon: propTypes.element,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default RequestedAt
