import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile, isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchAnnouncementPage,
  fetchCustomer,
  fetchCustomerCreditCards,
  fetchCustomerOrders,
  fetchCustomerFavorites,
  selectAnnouncementsPage,
  selectCustomer,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContentSection } from '../../../slices'
import {
  Background,
  BackgroundImage,
  Content,
  Header,
  HeaderLogo,
  Main,
  Welcome,
} from '../..'
import { NavMenu, User } from '../../buttons'
import AccountButtons from './AccountButtons'
import AccountContent from './AccountContent'
import AccountLoyalty from './AccountLoyalty'
import AccountRewards from './AccountRewards'
import AccountDeals from './AccountDeals'
import AccountOrders from './AccountOrders'
import GuestSlider from '../Guest/GuestSlider'

const AccountWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0);
`

const AccountView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.layout.padding};
  padding-top: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountMobile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > div + div {
    margin: 2rem 0 0;
  }
`

const AccountHero = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 ${(props) => props.theme.layout.paddingMobile};

  & > div {
    overflow: hidden;
    border-radius: ${(props) => props.theme.border.radius};
  }
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
  const appendSubtitle = true
  const accountTitle = appendSubtitle ? `${welcome} ${subtitle}` : welcome
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('ACCOUNT'))
  const announcements = useSelector(selectAnnouncementsPage('ACCOUNT'))
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
  const mobileSections = displayedSectons
    ? displayedSectons.slice(0, 2) || null
    : null
  // console.log('displayedSectons', displayedSectons)
  const oneSection = displayedSectons && displayedSectons.length <= 1
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

  useEffect(() => {
    dispatch(fetchAnnouncementPage('ACCOUNT'))
  }, [dispatch])

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>
          {welcome} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem" hasFooter={false}>
        <Header
          maxWidth="76.8rem"
          left={<User />}
          title={showLogo ? <HeaderLogo /> : null}
          right={<NavMenu />}
        />
        <Main>
          <AccountWrapper>
            <AccountView>
              <Welcome
                title={accountTitle}
                subtitle={!appendSubtitle ? subtitle : null}
              />
              {isMobile && (
                <AccountMobile>
                  {mobileSections ? (
                    mobileSections
                  ) : hasAnnouncements ? (
                    <GuestSlider announcements={announcements} />
                  ) : (
                    <AccountHero>
                      <BackgroundImage imageUrl={mobile} />
                    </AccountHero>
                  )}
                </AccountMobile>
              )}
              <AccountButtons />
              {!isMobile && displayedSectons}
            </AccountView>
          </AccountWrapper>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
