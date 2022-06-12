import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const AccountHome = () => {
  const navigate = useNavigate()

  return (
    <ButtonIcon
      label="Home"
      onClick={() => navigate('/account')}
      size={isBrowser ? 22 : 20}
      style={isBrowser ? { width: '2.6rem' } : {}}
    >
      {iconMap.Home}
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
