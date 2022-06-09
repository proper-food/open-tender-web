import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser, isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { selectAnnouncementsPage, selectCustomer } from '@open-tender/redux'

import { selectBrand, closeModal, selectContent } from '../../../slices'
import { Background, Content, Header, HeaderLogo, Main } from '../..'
import { Logout, NavMenu, OrderNow } from '../../buttons'
import PageTitle from '../../PageTitle'
import GuestButtons from './GuestButtons'

const GuestView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle, has_loyalty } = useSelector(selectBrand)
  const { entities: announcements } = useSelector(
    selectAnnouncementsPage('GUEST')
  )
  const hasAnnouncements =
    announcements && announcements.length > 0 ? true : false
  const { guest } = useSelector(selectContent)
  const { title, subtitle, background, mobile } = guest
  const { auth } = useSelector(selectCustomer)
  const imageUrl = isMobileOnly ? mobile : background
  const showHero = !hasAnnouncements && isMobileOnly

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (auth) navigate('/account')
  }, [auth, navigate])

  if (auth) return null

  return (
    <>
      <Helmet>
        <title>Welcome | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={imageUrl} />
      <Content maxWidth="76.8rem">
        <Header
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={
            <>
              <OrderNow />
              <NavMenu />
            </>
          }
        />
        <Main>
          <GuestView>
            <PageTitle
              title={title}
              subtitle={subtitle}
              style={{ textAlign: 'left', width: '100%', maxWidth: '100%' }}
            />
            <GuestButtons />
          </GuestView>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
