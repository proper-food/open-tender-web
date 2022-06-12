import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    path: '/account',
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
    path: '/account',
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
    icon: iconMap.Smile,
    title: 'Loyalty',
    path: '/loyalty',
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
    icon: iconMap.User,
    title: 'Profile',
    path: '/account/profile',
  },
  {
    icon: iconMap.Mail,
    title: 'Communication Preferences',
    path: '/account/communications',
  },
  {
    icon: iconMap.Sliders,
    title: 'Dietary Preferences',
    path: '/account/allergens',
  },
  {
    icon: iconMap.MapPin,
    title: 'Addresses',
    path: '/account/addresses',
  },
  {
    icon: iconMap.CreditCard,
    title: 'Payment Methods',
    path: '/account/credit-cards',
  },
  {
    icon: iconMap.Home,
    title: 'House Accounts',
    path: '/account/house-accounts',
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
  padding: 1.25rem 1rem 1.25rem 3.5rem;
  color: ${(props) => props.theme.fonts.headings.color};

  span {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }

  &:hover {
    color: ${(props) => props.theme.links.primary.color};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.fonts.headings.color};
    }
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
  font-size: ${(props) => props.theme.fonts.sizes.small};
  line-height: 1.2;
`

const NavFooter = styled('div')`
  width: 100%;
  padding: 0 0 2rem;
`

const Nav = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile } = useSelector(selectCustomer)
  const brand = useSelector(selectBrand)
  const {
    has_rewards,
    has_thanx,
    has_levelup,
    has_deals,
    has_loyalty,
    has_gift_cards,
    has_donations,
    has_allergens,
    has_house_accounts,
    has_favorites,
  } = brand
  const hasRewards = has_rewards || has_thanx || has_levelup
  let removed = []
  if (!hasRewards) removed.push('/rewards')
  if (!has_loyalty) removed.push('/loyalty')
  if (!has_deals) removed.push('/deals')
  if (!has_gift_cards) {
    removed.push('/gift-cards')
    removed.push('/account/gift-cards')
  }
  if (!has_donations) removed.push('/donations')
  if (!has_allergens) removed.push('/account/allergens')
  if (!has_house_accounts) removed.push('/account/house-accounts')
  if (!has_favorites) removed.push('/favorites')
  const buttons = profile ? navButtons : guestButtons
  const filteredButtons = buttons.filter((i) => !removed.includes(i.path))

  const closeGo = (evt, path) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    navigate(path)
  }

  const login = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(openModal({ type: 'login' }))
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
