import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { selectCustomerOrders } from '@open-tender/redux'

import { OrderCard, OrderCardSimple, ScrollableSection } from '../..'
import { selectContentSection } from '../../../slices'

const AccountOrdersView = styled.div`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.margin} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0 0;
  }
`

const OrderCardItem = ({ item }) => <OrderCard order={item} />

const OrderCardSimpleItem = ({ item }) => <OrderCardSimple order={item} />

const AccountOrders = () => {
  const { entities: orders, error } = useSelector(selectCustomerOrders)
  const { recentOrders } = useSelector(selectContentSection('account'))
  const { title } = recentOrders
  const useSimple = true
  const hasOrders = orders.length > 0 && !error
  const filtered = orders
    .map((i) => ({ ...i, key: i.order_id }))
    .filter((i) => i.order_type !== 'MERCH')
  const count = isBrowser ? 2 : 5
  const displayed = filtered.slice(0, count)
  const isMore = filtered.length > 1

  if (!hasOrders) return null

  return (
    <AccountOrdersView>
      <ScrollableSection
        title={title}
        to={isMore ? '/orders' : null}
        items={displayed}
        renderItem={useSimple ? OrderCardSimpleItem : OrderCardItem}
        keyName="order_id"
      />
    </AccountOrdersView>
  )
}

AccountOrders.displayName = 'AccountOrders'

export default AccountOrders
