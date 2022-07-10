import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchAnnouncementPage,
  fetchDeals,
  selectCustomer,
  selectAnnouncementsPage,
  selectDeals,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContentSection } from '../../../slices'
import { Background, BackgroundImage, Content, Main, Welcome } from '../..'
import HeaderGuest from '../../HeaderGuest'
import AccountSlider from '../Account/AccountSlider'
import AccountContent from '../Account/AccountContent'
import AccountDeals from '../Account/AccountDeals'
import AccountLoyalty from '../Account/AccountLoyalty'
import GuestButtons from './GuestButtons'

const GuestWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0);
`

const GuestView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const GuestMobile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GuestHero = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 ${(props) => props.theme.layout.paddingMobile};
  margin-top: 3.5rem;

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

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const {
    title: siteTitle,
    has_deals,
    has_loyalty,
    has_thanx,
    has_levelup,
  } = useSelector(selectBrand)
  const { title, subtitle, background, mobile, content, showGuest, displayed } =
    useSelector(selectContentSection('guest')) || {}
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('GUEST'))
  const announcements = useSelector(selectAnnouncementsPage('GUEST'))

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

  const hasLoyalty = has_loyalty || has_thanx || has_levelup
  const displayLoyalty = displayed.includes('LOYALTY') && hasLoyalty
  const loyaltySection = displayLoyalty
    ? (key) => <AccountLoyalty key={key} />
    : null

  const isLoading = deals.loading === 'pending'

  const sections = {
    CONTENT: contentSection,
    LOYALTY: loyaltySection,
    DEALS: dealsSection,
  }
  const displayedSections = displayed
    ? displayed.map((i) => sections[i] && sections[i](i)).filter(Boolean)
    : null
  const mobileSection = displayedSections ? displayedSections[0] : null

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (auth) {
      navigate('/account')
    } else if (!showGuest) {
      navigate('/order-type')
    }
  }, [auth, showGuest, navigate])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('GUEST'))
  }, [dispatch])

  useEffect(() => {
    if (hasDeals) dispatch(fetchDeals())
  }, [hasDeals, dispatch])

  if (auth || !showGuest) return null

  return (
    <>
      <Helmet>
        <title>Welcome | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem" hasFooter={isMobile ? false : true}>
        <HeaderGuest />
        <Main>
          <GuestWrapper>
            <GuestView>
              <Welcome title={title} subtitle={subtitle} />
              {isMobile && (
                <GuestMobile>
                  {mobileSection ? (
                    mobileSection
                  ) : hasAnnouncements && !isLoading ? (
                    <AccountSlider
                      announcements={announcements}
                      style={{ marginTop: '3.5rem' }}
                    />
                  ) : !isLoading ? (
                    <GuestHero>
                      <BackgroundImage imageUrl={mobile} />
                    </GuestHero>
                  ) : null}
                </GuestMobile>
              )}
              <GuestButtons />
              {!isMobile && displayedSections}
            </GuestView>
          </GuestWrapper>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
