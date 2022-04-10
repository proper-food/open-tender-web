import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectCustomer,
  fetchCustomer,
  fetchCustomerCreditCards,
  selectAnnouncementsPage,
  fetchAnnouncementPage,
  fetchCustomerOrders,
  fetchCustomerFavorites,
} from '@open-tender/redux'

import { selectBrand, selectConfig, closeModal } from '../../../slices'
import { Announcements, Content, Header, Main, PageHero } from '../..'
import { Logout, OrderNow } from '../../buttons'
// import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountButtons from './AccountButtons'
import AccountLoyalty from './AccountLoyalty'
import AccountWelcome from './AccountWelcome'
// import AccountOrders from './AccountOrders'
// import AccountGroupOrders from './AccountGroupOrders'
// import AccountDeals from './AccountDeals'
// import AccountRewards from './AccountRewards'

const AccountView = styled('div')`
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, showHero } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchAnnouncementPage('HOME'))
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
    dispatch(fetchCustomerOrders(20))
    dispatch(fetchCustomerFavorites())
  }, [token, dispatch, history])

  return profile ? (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          // style={isBrowser ? null : { backgroundColor: 'transparent' }}
          // left={<AccountScan />}
          left={<AccountWelcome title={title} profile={profile} />}
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
          <AccountView>
            {/* {!isBrowser && <AccountTabs />} */}
            <AccountButtons />
            <Announcements />
            {/* <AccountLoyalty /> */}
          </AccountView>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
