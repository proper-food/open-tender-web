import React from 'react'
import propTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import {
  selectCustomer,
  logoutCustomer,
  selectGroupOrder,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { openModal } from '../../slices'
import iconMap from '../iconMap'
import { NavMenu } from '.'

const Account = ({ color, style = null, useButton = false }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { cartGuest } = useSelector(selectGroupOrder)
  const { pathname } = useLocation()
  const isAccount = pathname.includes('account')
  const isJoinGroup = pathname.includes('join')

  if (cartGuest || isJoinGroup) return null

  return isMobile && !useButton ? (
    <NavMenu color={color} />
  ) : auth ? (
    isAccount ? (
      <ButtonStyled
        onClick={() => dispatch(logoutCustomer())}
        icon={iconMap.UserX}
        color="header"
        size="header"
        style={style}
        useButton={useButton}
      >
        Logout
      </ButtonStyled>
    ) : (
      <ButtonStyled
        onClick={() => history.push(`/`)}
        label="Manage your account"
        icon={iconMap.User}
        color="header"
        size="header"
        style={style}
        useButton={useButton}
      >
        Account
      </ButtonStyled>
    )
  ) : (
    <ButtonStyled
      onClick={() => dispatch(openModal({ type: 'login' }))}
      label="Log into your account"
      icon={iconMap.UserPlus}
      color="header"
      size="header"
      style={style}
      useButton={useButton}
    >
      Login
    </ButtonStyled>
  )
}

Account.displayName = 'Account'
Account.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default Account
