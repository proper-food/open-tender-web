import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { makeUniqueDisplayItems } from '@open-tender/js'
import { ButtonStyled, ButtonToggleGroup } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  ItemCards,
  Loading,
  Main,
  OrderCardItem,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
} from '../..'
import OrdersList from './OrdersList'

const ToggleView = styled('div')`
  text-align: center;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.marginMobile};
  }
`

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const increment = 20
  const limit = 60
  const [toggle, setToggle] = useState('orders')
  const [count, setCount] = useState(increment)
  const [items, setItems] = useState([])
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders
  const [recentOrders, setRecentOrders] = useState(entities.slice(0, count))
  const { title: siteTitle } = useSelector(selectBrand)
  const { orders: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!auth) return navigate('/account')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomerOrders(limit + 1))
  }, [dispatch])

  useEffect(() => {
    setRecentOrders(entities.slice(0, count))
  }, [entities, count])

  useEffect(() => {
    const displayItems = makeUniqueDisplayItems(entities)
    const recentItems = displayItems.slice(0, 100)
    setItems(recentItems)
  }, [entities])

  const loadMore = () => {
    setCount(Math.min(count + increment, limit))
  }

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '100%' }}>
            <PageTitle {...config} />
            <PageError error={error} />
            {recentOrders.length ? (
              <>
                <ToggleView>
                  <ButtonToggleGroup>
                    <ButtonStyled
                      onClick={() => setToggle('orders')}
                      disabled={toggle === 'orders'}
                    >
                      Recent Orders
                    </ButtonStyled>
                    <ButtonStyled
                      onClick={() => setToggle('items')}
                      disabled={toggle === 'items'}
                    >
                      Recent Items
                    </ButtonStyled>
                  </ButtonToggleGroup>
                </ToggleView>
                {toggle === 'orders' ? (
                  <>
                    <OrdersList orders={recentOrders} delay={0} />
                    {entities.length - 1 > count && (
                      <ButtonStyled onClick={loadMore}>
                        Load more recent orders
                      </ButtonStyled>
                    )}
                  </>
                ) : (
                  <ItemCards
                    items={items}
                    delay={0}
                    renderItem={(props) => <OrderCardItem {...props} />}
                  />
                )}
              </>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your order navigate..." />
                ) : (
                  <p>Looks like you don't have any orders yet.</p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Orders.displayName = 'Orders'
export default Orders
