import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const Locations = ({ text = 'Locations', icon = iconMap.MapPin }) => {
  const history = useHistory()

  const back = () => {
    history.push(`/locations`)
  }

  return isBrowser ? (
    <ButtonStyled icon={icon} onClick={back} color="header" size="header">
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon label={text} onClick={back}>
      {icon}
    </ButtonIcon>
  )
}

Locations.displayName = 'Locations'
Locations.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default Locations
