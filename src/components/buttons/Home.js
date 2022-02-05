import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const Home = ({ text = 'Home', color }) => {
  const history = useHistory()
  const { auth } = useSelector(selectCustomer)
  const path = auth ? '/home' : '/'
  const icon = auth ? iconMap.User : iconMap.Home

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
    <ButtonIcon color={color} label={text} onClick={() => history.push(path)}>
      {icon}
    </ButtonIcon>
  )
}

Home.displayName = 'Home'
Home.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default Home
