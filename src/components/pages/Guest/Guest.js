import React, { useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectAnnouncementsPage,
  fetchAnnouncementPage,
  setOrderServiceType,
} from '@open-tender/redux'
import { Box, ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import {
  selectConfig,
  closeModal,
  selectBrand,
  selectPosts,
  fetchPosts,
} from '../../../slices'
import { AppContext } from '../../../App'
import { Account } from '../../buttons'
import { Content, HeaderLogo, Header, Main, PageHero } from '../..'
import Container from '../../Container'
import ScreenreaderTitle from '../../ScreenreaderTitle'

const GuestContent = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  width: 100%;
  margin: 5rem auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 3rem auto;
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const GuestTitle = styled('div')`
  width: 100%;
  text-align: center;
  margin: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 1.5rem;
  }

  h2 {
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }
`

const GuestOrderTypes = styled('div')`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  margin: 0 -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
  }
`

const GuestOrderTypeView = styled('div')`
  width: 25%;
  max-width: 40rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 50%;
  }
  @media (max-width: 1160px) {
    width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 1.5rem 0;
  }
`

const GuestOrderTypeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;
  height: 100%;

  button {
    display: block;
    flex-grow: 0;
    width: 24rem;
    max-width: 100%;
    margin: 2rem auto 2rem;
  }
`
const GuestOrderTypeHeader = styled('div')`
  flex-grow: 1;

  h3,
  p {
    display: block;
    text-align: center;
    width: 100%;
  }

  h3 {
    // font-size: ${(props) => props.theme.fonts.sizes.h3};
    line-height: 1;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  div p {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const GuestLinks = styled('div')`
  width: 100%;
  text-align: center;
  margin: 3rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0;
  }

  h3 {
    margin: 0 0 1rem;
  }
`

const GuestFooter = styled('div')`
  width: 100%;
  text-align: center;
  margin: 3rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0;
  }
`

const GuestOrderType = ({ title, subtitle, cta, finePrint, onClick }) => {
  return (
    <GuestOrderTypeView>
      <GuestOrderTypeContainer>
        <GuestOrderTypeHeader>
          <h3>{title}</h3>
          <p>{subtitle}</p>
          {finePrint && <p>{finePrint}</p>}
        </GuestOrderTypeHeader>
        <ButtonStyled onClick={onClick}>{cta}</ButtonStyled>
      </GuestOrderTypeContainer>
    </GuestOrderTypeView>
  )
}

GuestOrderType.displayName = 'GuestOrderType'
GuestOrderType.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  cta: propTypes.string,
  onClick: propTypes.func,
}

const GuestOrderTypePost = ({
  title,
  subtitle,
  excerpt,
  content,
  files,
  onClick,
}) => {
  // const image = files.find((i) => i.type === 'FEATURED_IMAGE')
  return (
    <GuestOrderTypeView>
      <GuestOrderTypeContainer>
        <GuestOrderTypeHeader>
          <h3>{title}</h3>
          <ButtonStyled onClick={onClick}>{subtitle}</ButtonStyled>
          <p>{excerpt}</p>
          {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
        </GuestOrderTypeHeader>
      </GuestOrderTypeContainer>
    </GuestOrderTypeView>
  )
}

GuestOrderTypePost.displayName = 'GuestOrderTypePost'
GuestOrderTypePost.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  excerpt: propTypes.string,
  content: propTypes.string,
  files: propTypes.array,
  onClick: propTypes.func,
}

const Guest = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { windowRef } = useContext(AppContext)
  const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const { posts } = useSelector(selectPosts)
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, showHero, orderTypes } = home
  // const footnote = "Hint: you don't need an account to place an order."
  // const hasContent = !!(content && content.length && content[0].length)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('HOME'))
    dispatch(fetchPosts('order-types'))
  }, [dispatch])

  const handleOutpost = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    history.push('/locations')
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    history.push('/locations')
  }

  const handleCatering = () => {
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    history.push('/catering')
  }

  const handlers = {
    'order-types/pickup': handlePickup,
    'order-types/delivery': handleDelivery,
    'order-types/catering': handleCatering,
    'order-types/outpost': handleOutpost,
  }

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <Header
          left={<HeaderLogo />}
          right={
            <>
              <Account />
              {/* {isBrowser && <OrderNow />} */}
            </>
          }
        />
        <Main>
          <PageHero
            announcements={announcements}
            imageUrl={isBrowser ? background : mobile}
            showHero={showHero}
          />
          <ScreenreaderTitle>Home</ScreenreaderTitle>
          <GuestContent>
            <Container>
              <GuestTitle>
                <h2>{title}</h2>
              </GuestTitle>
              <GuestOrderTypes>
                {posts.map((post) => (
                  <GuestOrderTypePost
                    key={post.slug}
                    {...post}
                    onClick={handlers[post.slug]}
                  />
                ))}
                {/* <GuestOrderType
                  {...orderTypes.PICKUP}
                  cta="Order Pickup"
                  onClick={handlePickup}
                />
                <GuestOrderType
                  {...orderTypes.DELIVERY}
                  cta="Order Delivery"
                  finePrint={content}
                  onClick={handleDelivery}
                />
                <GuestOrderType
                  {...orderTypes.CATERING}
                  cta="Order for the Team"
                  onClick={handleCatering}
                />
                <GuestOrderType
                  {...orderTypes.OUTPOST}
                  cta="Find Pick-up Point"
                  onClick={handleOutpost}
                /> */}
              </GuestOrderTypes>
              <GuestLinks>
                <h3>Other Stuff...</h3>
                <p>
                  <Link to="/gift-cards">{orderTypes.GIFT_CARDS.title}</Link>{' '}
                  <span>or</span>{' '}
                  <Link to="/donations">{orderTypes.DONATIONS.title}</Link>
                </p>
              </GuestLinks>
              <GuestFooter>
                <p>{subtitle}</p>
              </GuestFooter>
            </Container>
          </GuestContent>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
