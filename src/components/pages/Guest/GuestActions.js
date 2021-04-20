import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { resetOrder } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../../iconMap'
import { openModal } from '../../../slices'
import { PageButtons } from '../..'

const GuestActions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const buttonSize = isBrowser ? 'default' : 'small'

  const startNewOrder = () => {
    dispatch(resetOrder())
    history.push(`/order-type`)
  }

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <PageButtons>
      <ButtonStyled
        icon={iconMap.ShoppingBag}
        onClick={startNewOrder}
        size={buttonSize}
      >
        Start New Order
      </ButtonStyled>
      <ButtonStyled
        icon={iconMap.User}
        onClick={login}
        size={buttonSize}
        color="secondary"
      >
        Log In / Sign Up
      </ButtonStyled>
    </PageButtons>
  )
}

GuestActions.displayName = 'GuestActions'

export default GuestActions
