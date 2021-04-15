import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const Back = ({
  text = 'Back',
  path = '/',
  icon = iconMap.ArrowLeft,
  color,
}) => {
  const history = useHistory()

  return isBrowser ? (
    <ButtonStyled
      onClick={() => history.push(path)}
      icon={icon}
      color="header"
      size="header"
    >
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon label={text} color={color} onClick={() => history.push(path)}>
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
