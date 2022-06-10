import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectCustomer,
  selectDeals,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContent } from '../../../slices'
import {
  Announcements,
  Background,
  BackgroundImage,
  Content,
  Deals,
  Header,
  HeaderLogo,
  HtmlContent,
  Main,
  Welcome,
} from '../..'
import { AccountSettings, NavMenu, OrderNow } from '../../buttons'
import GuestButtons from './GuestButtons'

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

const GuestContent = styled.div`
  margin: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 3rem;
  }
`

// const GuestDeals = styled.div`
//   margin: ${(props) => (props.addMargin ? '3rem 0 0' : '0')};
//   @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
//     margin: 0;
//   }
// `

const GuestHero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 16rem;
  // margin: ${(props) => (props.addMargin ? '3rem 0 0' : '0')};
`

const checkContent = (content) => {
  const hasContent = !!(content && content.length)
  return !hasContent || content === '<p><br></p>' ? false : true
}

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { guest } = useSelector(selectContent)
  const { title, subtitle, background, mobile, content, showGuest } = guest
  const hasContent = checkContent(content)
  const { auth } = useSelector(selectCustomer)
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('GUEST'))
  const { entities } = useSelector(selectDeals)
  const hasDeals = has_deals && entities.length
  const showHero = hasAnnouncements || (hasDeals && hasContent) ? false : true

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

  if (auth) return null

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
          title={<HeaderLogo />}
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
            {hasContent && (
              <GuestContent>
                <HtmlContent content={content} />
              </GuestContent>
            )}
            <Deals />
            {isMobile && (
              <>
                {showHero && (
                  <GuestHero addMargin={hasContent || hasDeals}>
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
