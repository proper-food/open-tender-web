import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, closeModal, selectContent } from '../../../slices'
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

const GuestView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    margin: 0 0 ${(props) => props.theme.layout.navHeight};
  }
`

const GuestHero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle, has_loyalty } = useSelector(selectBrand)
  const { guest } = useSelector(selectContent)
  const { title, subtitle, background, mobile } = guest
  const { auth } = useSelector(selectCustomer)

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
          <GuestView>
            <Welcome title={title} subtitle={subtitle} />
            <GuestButtons />
            {isMobile && (
              <>
                <GuestHero>
                  <BackgroundImage imageUrl={mobile} />
                </GuestHero>
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
