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
import { Logout, NavMenu, OrderNow } from '../../buttons'
import AccountTabs from './AccountTabs'
import AccountButtons from './AccountButtons'
import AccountLoyalty from './AccountLoyalty'
import AccountHero from './AccountHero'
import AccountGreeting from './AccountGreeting'
import AccountDeals from './AccountDeals'
import AccountRewards from './AccountRewards'
import AccountLogo from './AccountLogo'
import AccountContent from './AccountContent'
import Background from '../../Background'
import AccountAnnouncements from './AccountAnnouncements'

const AccountView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
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
  const showHero = !hasAnnouncements && isMobileOnly

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (!auth) navigate('/guest')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
    dispatch(fetchCustomerOrders(20))
    dispatch(fetchCustomerFavorites())
  }, [token, dispatch, navigate])

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={imageUrl} />
      <Content maxWidth="76.8rem">
        <Header
          maxWidth="76.8rem"
          left={<AccountLogo />}
          right={
            <>
              <OrderNow />
              <NavMenu />
            </>
          }
        />
        <Main>
          <AccountView>
            <AccountGreeting />
            <AccountButtons />
            <AccountContent />
            {hasLoyalty && <AccountLoyalty />}
            <AccountRewards />
            <AccountDeals />
            {showHero && <AccountHero imageUrl={imageUrl} />}
            <AccountAnnouncements />
          </AccountView>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
