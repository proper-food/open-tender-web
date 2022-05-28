import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, resetOrder, resetCheckout } from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const CancelEdit = ({
  text = 'Cancel Edit',
  icon = iconMap.XCircle,
  style = null,
  useButton = false,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderId } = useSelector(selectOrder)

  const cancel = () => {
    dispatch(resetOrder())
    dispatch(resetCheckout())
    navigate(`/`)
  }

  if (!orderId) return null

  return (
    <ButtonBoth
      text={text}
      label={`Cancel editing order ${orderId}`}
      icon={icon}
      onClick={cancel}
      style={style}
      useButton={useButton}
    />
  )
}

CancelEdit.displayName = 'CancelEdit'
CancelEdit.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default CancelEdit
