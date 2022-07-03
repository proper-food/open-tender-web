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
  fetchCustomerFavorites,
  fetchCustomerOrders,
  fetchCustomerRewards,
  fetchDeals,
  selectAnnouncementsPage,
  selectCustomer,
  selectCustomerLoyaltyProgram,
  selectCustomerOrders,
  selectCustomerRewards,
  selectDeals,
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
import AccountSlider from './AccountSlider'

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
  padding: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountMobile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => (props.isSecond ? 'margin: 1rem 0 2rem' : '')}
`

const AccountHero = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 ${(props) => props.theme.layout.paddingMobile};
  margin: 3.5rem 0 ${(props) => (props.isSection ? '3.5rem' : '0')};

  & > div {
    overflow: hidden;
    border-radius: ${(props) => props.theme.border.radius};
  }
`

const hasEntities = (reducer) => {
  if (!reducer) return false
  const { entities, loading, error } = reducer
  if (loading === 'pending' && !entities.length) return false
  return !error && entities.length
}

const checkLoading = (deals, rewards, orders, loyalty) => {
  return (
    deals.loading === 'pending' ||
    rewards.loading === 'pending' ||
    orders.loading === 'pending' ||
    loyalty.loading === 'pending'
  )
}

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const {
    title: siteTitle,
    has_deals,
    has_rewards,
    has_loyalty,
    has_thanx,
    has_levelup,
  } = useSelector(selectBrand)
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
  const showLogo = isMobileOnly ? displayLogoMobile : displayLogo
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('ACCOUNT'))
  const announcements = useSelector(selectAnnouncementsPage('ACCOUNT'))
  const firstName = profile ? profile.first_name : null
  const greeting =
    firstName && showFirstName
      ? `${title}, ${firstName}${punctuation}`
      : `${title}${punctuation}`
  const appendSubtitle = true
  const accountTitle = appendSubtitle ? `${greeting} ${subtitle}` : greeting

  const hasContent = displayed.includes('CONTENT') && content && content.length
  const contentSection = hasContent
    ? (key) => <AccountContent key={key} content={content} />
    : null

  const deals = useSelector(selectDeals)
  const hasDeals = has_deals && displayed.includes('DEALS')
  const displayDeals = hasDeals && hasEntities(deals)
  const dealsSection = displayDeals
    ? (key) => <AccountDeals key={key} deals={deals.entities} />
    : null

  const rewards = useSelector(selectCustomerRewards)
  const hasRewards = has_rewards && displayed.includes('REWARDS')
  const displayRewads = hasRewards && hasEntities(rewards)
  const rewardsSection = displayRewads
    ? (key) => <AccountRewards key={key} rewards={rewards.entities} />
    : null

  const orders = useSelector(selectCustomerOrders)
  const hasOrders = displayed.includes('ORDERS')
  const displayOrders = hasOrders && hasEntities(orders)
  const ordersSection = displayOrders
    ? (key) => <AccountOrders key={key} orders={orders.entities} />
    : null

  const loyalty = useSelector(selectCustomerLoyaltyProgram)
  const hasLoyalty = has_loyalty || has_thanx || has_levelup
  const displayLoyalty = displayed.includes('LOYALTY') && hasLoyalty
  const loyaltySection = displayLoyalty
    ? (key) => <AccountLoyalty key={key} />
    : null

  const isLoading = checkLoading(deals, rewards, orders, loyalty)

  const sections = {
    CONTENT: contentSection,
    LOYALTY: loyaltySection,
    REWARDS: rewardsSection,
    DEALS: dealsSection,
    ORDERS: ordersSection,
  }
  const displayedSections = displayed
    ? displayed.map((i) => sections[i] && sections[i](i)).filter(Boolean)
    : null
  const mobileFirst = displayedSections.length > 1 ? displayedSections[0] : null
  const mobileSecond =
    displayedSections.length > 1 ? displayedSections[1] : displayedSections[0]

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

  useEffect(() => {
    if (hasDeals) dispatch(fetchDeals())
  }, [hasDeals, dispatch])

  useEffect(() => {
    if (hasRewards) dispatch(fetchCustomerRewards())
  }, [hasRewards, dispatch])

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>
          {greeting} | {siteTitle}
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
                <>
                  <AccountMobile isSecond={!!mobileSecond}>
                    {mobileFirst ? (
                      mobileFirst
                    ) : hasAnnouncements && !isLoading ? (
                      <AccountSlider
                        announcements={announcements}
                        style={{
                          marginTop: '3.5rem',
                          marginBottom: !!mobileSecond ? '3.5rem' : '0',
                        }}
                      />
                    ) : !isLoading ? (
                      <AccountHero isSection={!!mobileSecond}>
                        <BackgroundImage imageUrl={mobile} />
                      </AccountHero>
                    ) : null}
                  </AccountMobile>
                  {mobileSecond}
                </>
              )}
              <AccountButtons />
              {!isMobile && displayedSections}
            </AccountView>
          </AccountWrapper>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
