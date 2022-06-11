import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile, isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { selectCustomer, selectHasAnnouncementsPage } from '@open-tender/redux'

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
import GuestButtons from './GuestButtons'
import GuestContent from './GuestContent'
import GuestDeals from './GuestDeals'

const GuestView = styled.div`
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

const GuestHero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 16rem;
`

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const {
    title,
    subtitle,
    background,
    mobile,
    content,
    showGuest,
    displayLogo,
    displayLogoMobile,
    displayed,
  } = useSelector(selectContentSection('guest'))
  const { auth } = useSelector(selectCustomer)
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('GUEST'))
  const sections = {
    CONTENT: <GuestContent content={content} />,
    DEALS: <GuestDeals has_deals={has_deals} />,
  }
  const displayedSectons = displayed ? displayed.map((i) => sections[i]) : null
  const showHero =
    !hasAnnouncements && displayedSectons.length <= 1 ? true : false
  const showLogo = isMobileOnly ? displayLogoMobile : displayLogo

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

  if (auth || !showGuest) return null

  return (
    <>
      <Helmet>
        <title>Welcome | {siteTitle}</title>
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
          <GuestView showHero={showHero}>
            <Welcome title={title} subtitle={subtitle} />
            <GuestButtons />
            {displayedSectons}
            {isMobile && (
              <>
                {showHero && (
                  <GuestHero>
                    <BackgroundImage imageUrl={mobile} />
                  </GuestHero>
                )}
                <Announcements page="GUEST" />
              </>
            )}
          </GuestView>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
