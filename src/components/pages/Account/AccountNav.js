import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCustomerGroupOrders } from '@open-tender/redux'

import { selectBrand, selectSettings } from '../../../slices'
import iconMap from '../../iconMap'
import { NavButtons } from '../..'

const AccountNavView = styled('div')`
  // padding: 0 2.5rem 2.5rem;
`

const navButtons = [
  {
    icon: iconMap.Users,
    title: 'Group Orders',
    path: '/group-orders',
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
    icon: iconMap.Gift,
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: iconMap.User,
    title: 'Account',
    path: '/account',
  },
]

const AccountNav = () => {
  const history = useHistory()
  const { has_rewards, has_thanx } = useSelector(selectBrand)
  const { accountSections } = useSelector(selectSettings)
  const hasLevelUp = accountSections.filter((i) => i === 'levelup').length > 0
  const hasRewards = has_rewards || has_thanx || hasLevelUp
  const { entities: groupOrders } = useSelector(selectCustomerGroupOrders)
  let removed = !hasRewards ? ['/rewards'] : []
  if (!groupOrders.length) removed.push('/group-orders')
  const filteredButtons = navButtons.filter((i) => !removed.includes(i.path))
  const buttons = filteredButtons.map((i) => ({
    ...i,
    onClick: () => history.push(i.path),
  }))

  return (
    <AccountNavView>
      <NavButtons buttons={buttons} />
    </AccountNavView>
  )
}

AccountNav.displayName = 'AccountNav'
export default AccountNav
