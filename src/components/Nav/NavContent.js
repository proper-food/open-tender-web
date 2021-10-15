import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import styled from '@emotion/styled'

import { openModal, selectBrand, toggleNav } from '../../slices'
import NavClose from './NavClose'
import iconMap from '../iconMap'

const guestButtons = [
  {
    icon: iconMap.Home,
    title: 'Home',
    path: '/',
  },
  {
    icon: iconMap.Tag,
    title: 'Deals',
    path: '/deals',
  },
  {
    icon: iconMap.Gift,
    title: 'Gift Cards',
    path: '/gift-cards',
  },
  {
    icon: iconMap.DollarSign,
    title: 'Donations',
    path: '/donations',
  },
  {
    icon: iconMap.PlusCircle,
    title: 'Sign Up',
    path: '/signup',
  },
]

const navButtons = [
  {
    icon: iconMap.Home,
    title: 'Home',
    path: '/',
  },
  {
    icon: iconMap.ShoppingBag,
    title: 'Order History',
    path: '/orders',
  },
  {
    icon: iconMap.Heart,
    title: 'Favorites',
    path: '/favorites',
  },
  {
    icon: iconMap.Award,
    title: 'Rewards',
    path: '/rewards',
  },
  {
    icon: iconMap.Tag,
    title: 'Deals',
    path: '/deals',
  },
  {
    icon: iconMap.Gift,
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: iconMap.DollarSign,
    title: 'Donations',
    path: '/donations',
  },
  {
    icon: iconMap.Sliders,
    title: 'Allergens',
    path: '/account/allergens',
  },
  {
    icon: iconMap.MapPin,
    title: 'Addresses',
    path: '/account/addresses',
  },
  {
    icon: iconMap.CreditCard,
    title: 'Credit Cards',
    path: '/account/credit-cards',
  },
  {
    icon: iconMap.Home,
    title: 'House Accounts',
    path: '/account/house-accounts',
  },
  {
    icon: iconMap.Settings,
    title: 'Profile & Preferences',
    path: '/account/profile',
  },
]

const NavView = styled('nav')`
  position: fixed;
  z-index: 101;
  top: 0;
  bottom: 0;
  right: 0;
  width: 28rem;
  max-width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: ${(props) => props.theme.bgColors.primary};
`

const NavContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

// const NavHeader = styled('div')`
//   width: 100%;
//   padding: 2.5rem 0 1rem;

//   button span {
//     font-size: ${(props) => props.theme.fonts.sizes.h3};
//   }
// `

const NavItems = styled('nav')`
  width: 100%;
  padding: 2rem 0 2rem;
`

const NavItem = styled('button')`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  line-height: 0;
  padding: 1rem 1rem 1rem 3.5rem;
  color: ${(props) => props.theme.fonts.headings.color};

  span {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const NavIcon = styled('span')`
  display: block;
  line-height: 0;
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 1.7rem 0 0;
  line-height: 0;
`

const NavTitle = styled('p')`
  flex-grow: 1;
  font-size: ${(props) => props.theme.fonts.sizes.main};
  line-height: 1.2;
`

const NavFooter = styled('div')`
  width: 100%;
  padding: 0 0 2rem;
`

const Nav = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { profile } = useSelector(selectCustomer)
  const brand = useSelector(selectBrand)
  const { has_rewards, has_thanx, has_levelup, has_deals } = brand
  const hasRewards = has_rewards || has_thanx || has_levelup
  let removed = []
  if (!hasRewards) removed.push('/rewards')
  if (!has_deals) removed.push('/deals')
  const buttons = profile ? navButtons : guestButtons
  const filteredButtons = buttons.filter((i) => !removed.includes(i.path))
  const callback = useCallback(
    () => dispatch(openModal({ type: 'loginThanx' })),
    [dispatch]
  )
  const args = has_thanx ? { callback } : {}

  const closeGo = (evt, path) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    history.push(path)
  }

  const login = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(openModal({ type: 'login', args }))
  }

  const logout = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(logoutCustomer())
  }

  return (
    <NavView ref={ref}>
      <NavContainer>
        <NavClose />
        {/* <NavHeader>
          {profile && (
            <>
              <NavItem onClick={(evt) => closeGo(evt, '/')}>
                <NavIcon>{iconMap.Smile}</NavIcon>
                <NavTitle style={{ marginLeft: '-0.2rem' }}>
                  Hi, {profile.first_name}
                </NavTitle>
              </NavItem>
            </>
          )}
        </NavHeader> */}
        <NavItems>
          {filteredButtons.map((i) => (
            <NavItem key={i.path} onClick={(evt) => closeGo(evt, i.path)}>
              <NavIcon>{i.icon}</NavIcon>
              <NavTitle>{i.title}</NavTitle>
            </NavItem>
          ))}
        </NavItems>
        <NavFooter>
          {profile ? (
            <NavItem onClick={logout}>
              <NavIcon>{iconMap.LogOut}</NavIcon>
              <NavTitle>Logout</NavTitle>
            </NavItem>
          ) : (
            <NavItem onClick={login}>
              <NavIcon>{iconMap.User}</NavIcon>
              <NavTitle>Login</NavTitle>
            </NavItem>
          )}
        </NavFooter>
      </NavContainer>
    </NavView>
  )
})

Nav.displayName = 'Nav'

export default Nav
