import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { resetOrder, selectOrder } from '@open-tender/redux'
import { Body, ButtonStyled, Heading } from '@open-tender/components'

import styled from '@emotion/styled'
import { openModal } from '../../../slices'
import { UserCircle } from '../../icons'
import { ArrowRight } from 'react-feather'

const GuestButtonsView = styled('div')`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 4rem 0 0;
  }

  button {
    width: 25rem;
    max-width: calc(50% - 1rem);
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      margin: 0;
    }
  }

  button + button {
    margin: 0 2rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const GuestButtonContent = styled.span`
  width: 100%;
  height: 2.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }
`

const GuestButtonContentPrimary = styled(Heading)`
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.primary.color};

  &:hover {
    color: ${(props) => props.theme.buttons.colors.primaryHover.color};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.buttons.colors.primary.color};
    }
  }
`

const GuestButtonContentSecondary = styled(Body)`
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.secondary.color};

  &:hover {
    color: ${(props) => props.theme.buttons.colors.secondaryHover.color};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.buttons.colors.secondary.color};
    }
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
          <GuestButtonContentSecondary>
            Sign in or sign up
          </GuestButtonContentSecondary>
          <UserCircle size={22} />
        </GuestButtonContent>
      </ButtonStyled>
      <ButtonStyled
        onClick={isCurrentOrder ? continueCurrent : startNewOrder}
        size={buttonSize}
        color="primary"
      >
        <GuestButtonContent>
          <GuestButtonContentPrimary>
            {isCurrentOrder ? 'Continue Order' : 'Order Now'}
          </GuestButtonContentPrimary>
          <ArrowRight size={22} />
        </GuestButtonContent>
      </ButtonStyled>
    </GuestButtonsView>
  )
}

GuestButtons.displayName = 'GuestButtons'

export default GuestButtons
