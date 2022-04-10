import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { resetOrder, selectOrder, selectCustomer } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../../iconMap'
import styled from '@emotion/styled'

const AccountButtonsView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem ${(props) => props.theme.layout.paddingMobile} 4rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const AccountButtonsContainer = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 48%;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 48%;
    }
  }
`

const AccountButtons = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const { profile } = useSelector(selectCustomer)
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0
  const buttonSize = isBrowser ? 'default' : 'default'

  const continueCurrent = () => {
    history.push(revenueCenter ? `/menu/${revenueCenter.slug}` : '/order-type')
  }

  const startNewOrder = () => {
    dispatch(resetOrder())
    history.push(`/order-type`)
  }

  const reorder = () => {
    history.push(`/orders`)
  }

  return (
    <AccountButtonsView>
      <AccountButtonsContainer>
        {isCurrentOrder ? (
          <ButtonStyled onClick={continueCurrent} size={buttonSize}>
            Continue Order
          </ButtonStyled>
        ) : (
          <ButtonStyled onClick={startNewOrder} size={buttonSize}>
            New Order
          </ButtonStyled>
        )}
        {profile ? (
          <ButtonStyled onClick={reorder} size={buttonSize}>
            Reorder
          </ButtonStyled>
        ) : (
          <ButtonStyled
            icon={iconMap.ShoppingBag}
            onClick={startNewOrder}
            size={buttonSize}
          >
            Login
          </ButtonStyled>
        )}
      </AccountButtonsContainer>
    </AccountButtonsView>
  )
}

AccountButtons.displayName = 'AccountButtons'

export default AccountButtons
