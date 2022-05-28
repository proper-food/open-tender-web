import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMenuSlug } from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Menu = ({ text = 'Back To Menu', icon = iconMap.ArrowLeft }) => {
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)

  return (
    <ButtonBoth text={text} icon={icon} onClick={() => navigate(menuSlug)} />
  )
}

Menu.displayName = 'Menu'
Menu.propTypes = {
  onClick: propTypes.func,
  icon: propTypes.element,
}

export default Menu
