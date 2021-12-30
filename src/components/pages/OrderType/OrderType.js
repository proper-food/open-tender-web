import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'
import Helmet from 'react-helmet'
// import { selectAnnouncements, fetchAnnouncementPage } from '@open-tender/redux'

import { selectContent, closeModal, selectBrand } from '../../../slices'
import { Account, Home, Logout } from '../../buttons'
import {
  Background,
  Content,
  Geolocation,
  Header,
  HeaderLogo,
  Main,
} from '../..'
import OrderTypes from './OrderTypes'
import styled from '@emotion/styled'

const OrderTypeView = styled('div')`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const OrderTypeTitle = styled('div')`
  margin: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 ${(props) => props.theme.layout.marginMobile};
  }

  h1 {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const OrderType = () => {
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { orderType } = useSelector(selectContent)
  const { background, title, subtitle } = orderType
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
          title={!isBrowser && auth ? 'Order Type' : null}
          left={auth ? <Home /> : <HeaderLogo />}
          right={auth ? <Logout /> : <Account />}
        />
        <Main>
          <Geolocation />
          <OrderTypeView>
            <OrderTypeTitle>
              {title && <h1>{title}</h1>}
              {subtitle && <p>{subtitle}</p>}
            </OrderTypeTitle>
            <OrderTypes />
          </OrderTypeView>
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
