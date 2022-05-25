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

  button {
    height: 6rem;
  }
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
    title: 'Payment Methods',
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
  const { has_allergens, has_house_accounts, has_gift_cards } =
    useSelector(selectBrand)
  let removed = []
  if (!has_gift_cards) removed.push('/account/gift-cards')
  if (!has_allergens) removed.push('/account/allergens')
  if (!has_house_accounts) removed.push('/account/house-accounts')
  const filteredButtons = navButtons.filter((i) => !removed.includes(i.path))
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
