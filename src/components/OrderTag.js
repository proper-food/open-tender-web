import React from 'react'
import propTypes from 'prop-types'
import Tag from './Tag'

import iconMap from './iconMap'
import styled from '@emotion/styled'

const OrderTagView = styled('div')`
  position: absolute;
  top: -1.1rem;
  right: 1.5rem;
`

const OrderTag = ({ isUpcoming, status }) => {
  const tag = isUpcoming
    ? {
        text: status === 'IN_PROGRESS' ? 'In Progress' : 'Coming up',
        icon: iconMap.AlertCircle,
        bgColor: 'alert',
      }
    : status === 'REFUNDED'
    ? {
        text: 'Refunded',
        bgColor: 'error',
      }
    : {
        text: 'Completed',
        icon: iconMap.CheckCircle,
        bgColor: 'success',
      }

  if (tag.text === 'Completed') return null

  return (
    <OrderTagView>
      <Tag text={tag.text} icon={tag.icon} bgColor={tag.bgColor} />
    </OrderTagView>
  )
}

OrderTag.displayName = 'OrderTag'
OrderTag.propTypes = {
  isUpcoming: propTypes.bool,
  status: propTypes.string,
}

export default OrderTag
