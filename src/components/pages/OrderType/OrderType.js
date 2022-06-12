import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { isMobileOnly } from 'react-device-detect'
import Helmet from 'react-helmet'
// import { selectAnnouncements, fetchAnnouncementPage } from '@open-tender/redux'

import { selectContent, closeModal, selectBrand } from '../../../slices'
import { AccountHome, AccountSettings, NavMenu } from '../../buttons'
import {
  Background,
  Content,
  Geolocation,
  Header,
  HeaderLogo,
  HtmlContent,
  Main,
  PageTitle,
} from '../..'
import OrderTypes from './OrderTypes'

const OrderTypeView = styled('div')`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const OrderTypeContent = styled('div')`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const OrderType = () => {
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { orderType, guest } = useSelector(selectContent)
  const { showGuest, displayLogo, displayLogoMobile } = guest || {}
  const showLogo = isMobileOnly ? displayLogoMobile : displayLogo
  const { background, title, subtitle, content } = orderType
  const hasContent = !!(content && content.length)
  // const announcements = useSelector(selectAnnouncements)

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(fetchAnnouncementPage('ORDER_TYPE'))
  // }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Order Type | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <Header
          maxWidth="76.8rem"
          title={!showGuest && showLogo ? <HeaderLogo /> : null}
          left={showGuest ? <AccountHome /> : <AccountSettings />}
          right={<NavMenu />}
        />
        <Main>
          <Geolocation />
          <OrderTypeView>
            <PageTitle
              title={title}
              subtitle={subtitle}
              style={{ textAlign: 'left', maxWidth: '100%' }}
            />
            <OrderTypes />
            {hasContent && (
              <OrderTypeContent>
                <HtmlContent content={content} />
              </OrderTypeContent>
            )}
          </OrderTypeView>
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
