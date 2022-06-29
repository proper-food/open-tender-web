import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { resetOrder, selectOrder } from '@open-tender/redux'
import { Body, ButtonStyled, Heading } from '@open-tender/components'

import styled from '@emotion/styled'
import { openModal } from '../../../slices'
import { ArrowRight, User } from 'react-feather'
import { UserCircle } from '../..'

const GuestButtonsView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: ${(props) => props.theme.welcome.mobile.marginBottom} 0 0;
    // margin: ${(props) => props.theme.layout.marginMobile} 0 0;
    // margin: 4rem 0 0;
  }

  button {
    min-width: 16rem;
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
      min-width: 100%;
      margin: 0;
      height: 6rem;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  button:last-of-type {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const GuestButtonContent = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }
`

const GuestButtons = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0
  const buttonSize = isBrowser ? 'big' : 'big'

  const continueCurrent = () => {
    navigate(revenueCenter ? `/menu/${revenueCenter.slug}` : '/order-type')
  }

  const startNewOrder = () => {
    dispatch(resetOrder())
    navigate(`/order-type`)
  }

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <GuestButtonsView>
      <ButtonStyled onClick={login} size={buttonSize} color="secondary">
        <GuestButtonContent>
          <Body>Sign in or sign up</Body>
          {/* <User size={18} /> */}
          <UserCircle size={22} padding={2} strokeWidth={1} />
        </GuestButtonContent>
      </ButtonStyled>
      <ButtonStyled
        onClick={isCurrentOrder ? continueCurrent : startNewOrder}
        size={buttonSize}
        color="primary"
      >
        <GuestButtonContent>
          <Heading>{isCurrentOrder ? 'Continue Order' : 'Order Now'}</Heading>
          <ArrowRight size={22} />
        </GuestButtonContent>
      </ButtonStyled>
    </GuestButtonsView>
  )
}

GuestButtons.displayName = 'GuestButtons'

export default GuestButtons
