import React from 'react'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const Back = ({ icon = iconMap.ArrowLeft, text = 'Back', onClick, color }) => {
  return isBrowser ? (
    <ButtonStyled onClick={onClick} icon={icon} color="header" size="header">
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon label={text} color={color} onClick={onClick}>
      {icon}
    </ButtonIcon>
  )
}

Back.displayName = 'Back'
Back.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default Back
