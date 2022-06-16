import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile, isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchCustomer,
  fetchCustomerCreditCards,
  fetchCustomerOrders,
  fetchCustomerFavorites,
  selectCustomer,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContentSection } from '../../../slices'
import {
  Announcements,
  Background,
  BackgroundImage,
  Content,
  Header,
  HeaderLogo,
  Main,
  Welcome,
} from '../..'
import { AccountSettings, NavMenu, OrderNow } from '../../buttons'
import AccountButtons from './AccountButtons'
import AccountContent from './AccountContent'
import AccountLoyalty from './AccountLoyalty'
import AccountRewards from './AccountRewards'
import AccountDeals from './AccountDeals'
import AccountOrders from './AccountOrders'

const AccountView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    margin: 0 0
      ${(props) => (props.showHero ? props.theme.layout.navHeight : '0')};
  }
`

const AccountHero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${(props) => props.theme.border.radius};
`

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const {
    title,
    subtitle,
    background,
    mobile,
    content,
    displayLogo,
    displayLogoMobile,
    displayed,
    showFirstName,
    punctuation,
  } = useSelector(selectContentSection('account')) || {}
  const firstName = profile ? profile.first_name : null
  const welcome =
    firstName && showFirstName
      ? `${title}, ${firstName}${punctuation}`
      : `${title}${punctuation}`
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('ACCOUNT'))
  const sections = {
    CONTENT: (key) => <AccountContent key={key} content={content} />,
    LOYALTY: (key) => <AccountLoyalty key={key} />,
    REWARDS: (key) => <AccountRewards key={key} />,
    DEALS: (key) => <AccountDeals key={key} has_deals={has_deals} />,
    ORDERS: (key) => <AccountOrders key={key} />,
  }
  const displayedSectons = displayed
    ? displayed.map((i) => sections[i](i))
    : null
  const oneSection = displayedSectons && displayedSectons.length <= 1
  const showHero = !hasAnnouncements && oneSection ? true : false

  const showLogo = isMobileOnly ? displayLogoMobile : displayLogo

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
        <title>
          {welcome} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <Header
          maxWidth="76.8rem"
          left={<AccountSettings />}
          title={showLogo ? <HeaderLogo /> : null}
          right={
            <>
              <OrderNow />
              <NavMenu />
            </>
          }
        />
        <Main>
          <AccountView showHero={showHero}>
            <Welcome title={welcome} subtitle={subtitle} />
            <AccountButtons />
            {displayedSectons}
            {isMobile && (
              <>
                {showHero && (
                  <AccountHero>
                    <BackgroundImage imageUrl={mobile} />
                  </AccountHero>
                )}
                <Announcements page="ACCOUNT" />
              </>
            )}
          </AccountView>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
