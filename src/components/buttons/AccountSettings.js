import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const AccountSettings = ({
  text = 'Account',
  path = '/account',
  icon = iconMap.User,
}) => {
  const navigate = useNavigate()

  return <ButtonBoth text={text} icon={icon} onClick={() => navigate(path)} />
}

AccountSettings.displayName = 'AccountSettings'
AccountSettings.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default AccountSettings
