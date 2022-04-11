import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const AccountHome = () => {
  const history = useHistory()
  const { auth } = useSelector(selectCustomer)
  const path = auth ? '/account' : '/account'
  const icon = auth ? iconMap.User : iconMap.Home
  const text = auth ? 'Account' : 'Home'

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
    <ButtonIcon label={text} onClick={() => history.push(path)}>
      {icon}
    </ButtonIcon>
  )
}

AccountHome.displayName = 'AccountHome'
AccountHome.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default AccountHome
