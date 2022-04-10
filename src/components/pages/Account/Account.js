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
  fetchCustomerOrders,
  fetchCustomerFavorites,
} from '@open-tender/redux'

import { selectBrand, closeModal } from '../../../slices'
import { Announcements, Content, Greeting, Header, Main } from '../..'
import { Logout, OrderNow } from '../../buttons'
// import AccountScan from './AccountScan'
import AccountTabs from './AccountTabs'
import AccountButtons from './AccountButtons'
import AccountLoyalty from './AccountLoyalty'

const AccountView = styled('div')`
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  // const { account: accountConfig } = useSelector(selectConfig)
  // const { background, mobile, title, subtitle, showHero } = accountConfig
  const { auth } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null

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
          <AccountView>
            <AccountButtons />
            <AccountLoyalty />
            <Announcements />
          </AccountView>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
