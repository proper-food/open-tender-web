import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser, isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectAnnouncementsPage,
  selectCustomer,
  fetchCustomer,
  fetchCustomerCreditCards,
  fetchCustomerOrders,
  fetchCustomerFavorites,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectConfig } from '../../../slices'
import { Announcements, Content, Greeting, Header, Main } from '../..'
import { Logout, OrderNow } from '../../buttons'
// import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountButtons from './AccountButtons'
import AccountLoyalty from './AccountLoyalty'
import AccountHero from './AccountHero'
import AccountGreeting from './AccountGreeting'
import AccountDeals from './AccountDeals'

const AccountView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // max-width: ${(props) => props.theme.layout.maxWidth};
    // margin: 0 auto;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountLoyaltyView = styled.div`
  flex: 0 0 ${(props) => props.theme.layout.maxWidth};
  @media (max-width: 1360px) {
    flex: 0 0 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex: 1 1 auto;
    width: 100%;
  }
`

const AccountBanner = styled.div`
  flex: 1 1 100%;
  padding-left: ${(props) => props.theme.layout.padding};
  @media (max-width: 1360px) {
    flex: 0 0 50%;
    padding-left: ${(props) => props.theme.layout.padding};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex: 1 1 auto;
    width: 100%;
    padding: 0;
  }
`

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    title: siteTitle,
    has_rewards,
    has_thanx,
    has_levelup,
  } = useSelector(selectBrand)
  const hasLoyalty = has_rewards || has_thanx || has_levelup
  const { error } = useSelector(selectAnnouncementsPage('ACCOUNT'))
  const { account: acctConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle } = acctConfig || {}
  const { auth } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const imageUrl = isMobileOnly ? mobile : background

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
    dispatch(fetchCustomerOrders(20))
    dispatch(fetchCustomerFavorites())
  }, [token, dispatch, history])

  return (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          // style={isBrowser ? null : { backgroundColor: 'transparent' }}
          // left={<AccountScan />}
          left={<Greeting />}
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
          <AccountButtons />
          <AccountView>
            <AccountLoyaltyView>
              {hasLoyalty ? (
                <AccountLoyalty />
              ) : (
                <AccountGreeting title={title} subtitle={subtitle} />
              )}
              <AccountDeals />
            </AccountLoyaltyView>
            <AccountBanner>
              {!error ? (
                <Announcements page="ACCOUNT" />
              ) : (
                <AccountHero imageUrl={imageUrl} />
              )}
            </AccountBanner>
          </AccountView>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
