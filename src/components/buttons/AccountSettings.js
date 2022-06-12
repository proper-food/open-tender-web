import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'
import { openModal } from '../../slices'
// import { ButtonBoth } from '.'

const AccountSettings = ({ text = 'Settings', icon = iconMap.User }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  const goToSettings = () => navigate('/account/settings')

  return (
    <ButtonIcon
      label={text}
      size={isBrowser ? 22 : 18}
      style={isBrowser ? { width: '2.6rem' } : {}}
      onClick={auth ? goToSettings : login}
    >
      {icon}
    </ButtonIcon>
  )
}

AccountSettings.displayName = 'AccountSettings'
AccountSettings.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default AccountSettings
