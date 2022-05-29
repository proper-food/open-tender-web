import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Announcements, Content, Header, Main } from '../..'
import { Logout, OrderNow } from '../../buttons'
import AccountTabs from './AccountTabs'
import AccountButtons from './AccountButtons'
import AccountLoyalty from './AccountLoyalty'
import AccountHero from './AccountHero'
import AccountGreeting from './AccountGreeting'
import AccountDeals from './AccountDeals'
import AccountRewards from './AccountRewards'
import AccountLogo from './AccountLogo'
import AccountContent from './AccountContent'

const AccountView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountLoyaltyView = styled.div`
  min-width: 42rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    min-width: 0;
  }
`

const AccountBanner = styled.div`
  flex: 1 1 auto;
  padding-left: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    padding: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    title: siteTitle,
    has_loyalty,
    has_thanx,
    has_levelup,
  } = useSelector(selectBrand)
  const hasLoyalty = has_loyalty || has_thanx || has_levelup
  const { entities: announcements } = useSelector(
    selectAnnouncementsPage('ACCOUNT')
  )
  const hasAnnouncements =
    announcements && announcements.length > 0 ? true : false
  const { account: acctConfig } = useSelector(selectConfig)
  const { background, mobile } = acctConfig || {}
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
  }, [token, dispatch, navigate])

  return (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<AccountLogo />}
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
              <AccountGreeting />
              {hasLoyalty && <AccountLoyalty />}
              <AccountRewards />
              <AccountDeals />
              <AccountContent />
            </AccountLoyaltyView>
            <AccountBanner>
              <Announcements page="ACCOUNT" />
              {!hasAnnouncements && <AccountHero imageUrl={imageUrl} />}
            </AccountBanner>
          </AccountView>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
