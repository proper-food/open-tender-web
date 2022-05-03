import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { NavButtons } from '../..'
import { selectBrand } from '../../../slices'
import iconMap from '../../iconMap'

const AccountButtonsView = styled('div')`
  max-width: 54rem;
  margin: 0 auto;
`

const navButtons = [
  {
    icon: iconMap.User,
    title: 'Profile',
    path: '/account/profile',
  },
  {
    icon: iconMap.Mail,
    title: 'Communicaton Preferences',
    path: '/account/communications',
  },
  {
    icon: iconMap.Sliders,
    title: 'Dietary Preferences',
    path: '/account/allergens',
  },
  {
    icon: iconMap.Gift,
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: iconMap.CreditCard,
    title: 'Credit Cards',
    path: '/account/credit-cards',
  },
  {
    icon: iconMap.MapPin,
    title: 'Addresses',
    path: '/account/addresses',
  },
  {
    icon: iconMap.Home,
    title: 'House Accounts',
    path: '/account/house-accounts',
  },
]

const AccountSettingsButtons = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { has_rewards, has_thanx } = useSelector(selectBrand)
  const filteredButtons =
    has_rewards || has_thanx
      ? navButtons
      : navButtons.filter((i) => i.path !== '/rewards')
  const buttons = filteredButtons.map((i) => ({
    ...i,
    onClick: i.path ? () => history.push(i.path) : () => dispatch(i.func()),
  }))

  return (
    <AccountButtonsView>
      <NavButtons buttons={buttons} />
    </AccountButtonsView>
  )
}

AccountSettingsButtons.displayName = 'AccountSettingsButtons'
export default AccountSettingsButtons
