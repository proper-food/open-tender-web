import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Deals = ({ text = 'Deals', icon = iconMap.DollarSign }) => {
  const navigate = useNavigate()

  return (
    <ButtonBoth
      text={text}
      label="Check out today's deals"
      icon={icon}
      onClick={() => navigate('/deals')}
    />
  )
}

Deals.displayName = 'Deals'
Deals.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default Deals
