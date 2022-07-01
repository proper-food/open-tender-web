import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchAnnouncementPage,
  selectCustomer,
  selectAnnouncementsPage,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContentSection } from '../../../slices'
import { Background, BackgroundImage, Content, Main, Welcome } from '../..'
import GuestButtons from './GuestButtons'
import GuestContent from './GuestContent'
import GuestDeals from './GuestDeals'
import HeaderGuest from '../../HeaderGuest'
import GuestSlider from './GuestSlider'

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
  padding: ${(props) => props.theme.layout.padding};
  padding-top: 0;
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

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { title, subtitle, background, mobile, content, showGuest, displayed } =
    useSelector(selectContentSection('guest')) || {}
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('GUEST'))
  const announcements = useSelector(selectAnnouncementsPage('GUEST'))
  const sections = {
    CONTENT: (key) => <GuestContent key={key} content={content} />,
    DEALS: (key) => <GuestDeals key={key} has_deals={has_deals} />,
  }
  const displayedSectons = displayed
    ? displayed.map((i) => sections[i](i))
    : null
  const mobileSection = displayedSectons ? displayedSectons[0] : null

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

  if (auth || !showGuest) return null

  return (
    <>
      <Helmet>
        <title>Welcome | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderGuest />
        <Main>
          <GuestWrapper>
            <GuestView>
              <Welcome title={title} subtitle={subtitle} />
              {isMobile && (
                <GuestMobile>
                  {mobileSection ? (
                    mobileSection
                  ) : hasAnnouncements ? (
                    <GuestSlider
                      announcements={announcements}
                      style={{ marginTop: '3.5rem' }}
                    />
                  ) : (
                    <GuestHero>
                      <BackgroundImage imageUrl={mobile} />
                    </GuestHero>
                  )}
                </GuestMobile>
              )}
              <GuestButtons />
              {!isMobile && displayedSectons}
            </GuestView>
          </GuestWrapper>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
