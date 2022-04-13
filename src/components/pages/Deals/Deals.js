import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  Header,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
  Rewards,
} from '../..'
import { AccountHome, Logout, OrderNow } from '../../buttons'
import AccountTabs from '../Account/AccountTabs'
import { isBrowser } from 'react-device-detect'

const DealsView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  max-width: ${(props) => props.theme.breakpoints.tablet};
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    max-width: 60rem;
  }
`

const Deals = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { deals: config } = useSelector(selectConfig)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!has_deals) return history.push('/')
  }, [has_deals, history])

  useEffect(() => {
    dispatch(fetchDeals())
  }, [dispatch, customer_id])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <Header
          left={<AccountHome />}
          right={
            isBrowser ? (
              <>
                <AccountTabs />
                <OrderNow />
              </>
            ) : (
              <>
                <OrderNow />
                <Logout />
              </>
            )
          }
        />
        <Main>
          <PageContainer>
            <PageTitle {...config} />
            {error ? (
              <PageError error={error} />
            ) : hasDeals ? (
              <DealsView>
                <Rewards rewards={deals} />
              </DealsView>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving today's deals..." />
                ) : (
                  <p>
                    We're not featuring any deals today. Please check back soon!
                  </p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Deals.displayName = 'Deals'
export default Deals
