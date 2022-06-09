import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectCustomer,
  fetchCustomer,
  fetchCustomerCreditCards,
  fetchCustomerOrders,
  fetchCustomerFavorites,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContent } from '../../../slices'
import { Content, Header, Main } from '../..'
import { NavMenu, OrderNow } from '../../buttons'
import AccountButtons from './AccountButtons'
import AccountGreeting from './AccountGreeting'
import AccountDeals from './AccountDeals'
import AccountRewards from './AccountRewards'
import AccountLogo from './AccountLogo'
import AccountContent from './AccountContent'
import Background from '../../Background'
import AccountAnnouncements from './AccountAnnouncements'
import AccountOrders from './AccountOrders'

const AccountView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account } = useSelector(selectContent)
  const imageUrl = account ? account.background : null
  const { auth } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null

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
            <AccountRewards />
            <AccountDeals />
            <AccountOrders />
            {isMobile && <AccountAnnouncements />}
          </AccountView>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
