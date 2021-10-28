import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectGroupOrder } from '@open-tender/redux'

import { openModal } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const GroupOrder = ({
  text = 'Group Order',
  icon = iconMap.Users,
  style = { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
  useButton = false,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isCartOwner, cartGuest } = useSelector(selectGroupOrder)
  const { revenueCenter } = useSelector(selectOrder)
  const settings = revenueCenter ? revenueCenter.settings || revenueCenter : {}
  const hasGroupOrdering = settings.group_ordering

  const onClick = () => {
    const reviewOrders = () => history.push(`/review`)
    dispatch(openModal({ type: 'groupOrder', args: { reviewOrders } }))
  }

  if (!hasGroupOrdering || cartGuest) return null

  return (
    <ButtonBoth
      text={text}
      label="Start A Group Order"
      icon={icon}
      onClick={onClick}
      color={isCartOwner ? 'cart' : 'header'}
      style={isCartOwner ? style : null}
      useButton={useButton}
    />
  )
}

GroupOrder.displayName = 'GroupOrder'
GroupOrder.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default GroupOrder
