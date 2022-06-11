import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCustomerOrders } from '@open-tender/redux'

import { OrderCard, ScrollableSection } from '../..'
import { selectContentSection } from '../../../slices'
import { isBrowser } from 'react-device-detect'

const AccountOrdersView = styled('div')`
  padding: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 2rem;
  }
`

const OrderCardItem = ({ item }) => <OrderCard order={item} />

const AccountOrders = () => {
  const { entities: orders, error } = useSelector(selectCustomerOrders)
  const { recentOrders } = useSelector(selectContentSection('account'))
  const { title } = recentOrders
  const hasOrders = orders.length > 0 && !error
  const filtered = orders
    .map((i) => ({ ...i, key: i.order_id }))
    .filter((i) => i.order_type !== 'MERCH')
  const count = isBrowser ? 2 : 5
  const displayed = filtered.slice(0, count)
  const isMore = filtered.length > displayed.length

  if (!hasOrders) return null

  return (
    <AccountOrdersView>
      <ScrollableSection
        title={title}
        to={isMore ? '/orders' : null}
        items={displayed}
        renderItem={OrderCardItem}
        keyName="order_id"
      />
    </AccountOrdersView>
  )
}

AccountOrders.displayName = 'AccountOrders'

export default AccountOrders
