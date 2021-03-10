import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Content,
  Deals as DealsList,
  HeaderDefault,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
} from '../..'
import { AppContext } from '../../../App'
import AccountTabs from '../Account/AccountTabs'

const defaultConfig = {
  title: 'Deals',
  subtitle: 'Daily offers available to all customers. Check back daily!',
}

const Deals = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const config = { ...accountConfig, ...defaultConfig }
  const { background } = config
  const { auth, profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { windowRef } = useContext(AppContext)
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0
  const isLoading = loading === 'pending'

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

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
      <Background imageUrl={background} />
      <Content>
        {auth ? (
          <HeaderUser title={isBrowser ? null : config.title} />
        ) : (
          <HeaderDefault title={isBrowser ? null : config.title} />
        )}
        <Main>
          {!isBrowser && auth && <AccountTabs />}
          <PageContainer>
            <PageTitle {...config} />
            {error ? (
              <PageError error={error} />
            ) : hasDeals ? (
              <DealsList deals={deals} />
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading
                    text="Retrieving today's deals..."
                    style={{ textAlign: 'center' }}
                  />
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
