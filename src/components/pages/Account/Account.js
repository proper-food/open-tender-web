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
import { Content, Header, Main, PageHero } from '../..'
import { Logout, OrderNow } from '../../buttons'
import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountGreeting from './AccountGreeting'
import AccountButtons from './AccountButtons'
// import AccountOrders from './AccountOrders'
// import AccountLoyalty from './AccountLoyalty'
// import AccountGroupOrders from './AccountGroupOrders'
// import AccountDeals from './AccountDeals'
// import AccountRewards from './AccountRewards'

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin-top: -${(props) => props.theme.layout.navHeightMobile};
  padding-top: ${(props) => props.theme.layout.navHeightMobile};
  // background-color: palegreen;
`

const AccountWelcome = styled.div`
  flex: 1 1 100%;
  padding: ${(props) => props.theme.layout.paddingMobile};
  // background-color: ${(props) => props.theme.bgColors.tertiary};
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
          left={<AccountScan />}
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
          {/* {!isBrowser && <AccountTabs />} */}
          <AccountContainer>
            <AccountWelcome>
              <AccountGreeting
                title={title}
                subtitle={subtitle}
                profile={profile}
              />
              <AccountButtons />
            </AccountWelcome>
            <PageHero
              announcements={announcements}
              imageUrl={isBrowser ? background : mobile}
              showHero={showHero}
              // style={isBrowser ? null : { paddingBottom: navHeightMobile }}
            />
          </AccountContainer>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
