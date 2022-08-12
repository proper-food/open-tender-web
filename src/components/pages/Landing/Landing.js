import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isBrowser, isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchAnnouncementPage,
  selectAnnouncementsPage,
  setOrderServiceType,
} from '@open-tender/redux'
import { Box, ButtonStyled } from '@open-tender/components'
import {
  selectConfig,
  selectBrand,
  selectPosts,
  fetchPosts,
  closeModal,
} from '../../../slices'
import {
  Container,
  Content,
  HeaderGuest,
  Main,
  PageHero,
  ScreenreaderTitle,
} from '../..'

const LandingContent = styled('div')`
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

const LandingTitle = styled('div')`
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

const LandingOrderTypes = styled('div')`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  margin: 0 -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
  }
`

const LandingOrderTypeView = styled('div')`
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

const LandingOrderTypeContainer = styled(Box)`
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
const LandingOrderTypeHeader = styled('div')`
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

const LandingLinks = styled('div')`
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

const LandingFooter = styled('div')`
  width: 100%;
  text-align: center;
  margin: 3rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0;
  }
`

const LandingOrderType = ({ title, subtitle, cta, finePrint, onClick }) => {
  return (
    <LandingOrderTypeView>
      <LandingOrderTypeContainer>
        <LandingOrderTypeHeader>
          <h3>{title}</h3>
          <p>{subtitle}</p>
          {finePrint && <p>{finePrint}</p>}
        </LandingOrderTypeHeader>
        <ButtonStyled onClick={onClick}>{cta}</ButtonStyled>
      </LandingOrderTypeContainer>
    </LandingOrderTypeView>
  )
}

LandingOrderType.displayName = 'LandingOrderType'
LandingOrderType.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  cta: propTypes.string,
  onClick: propTypes.func,
}

const LandingOrderTypePost = ({
  title,
  subtitle,
  excerpt,
  content,
  files,
  onClick,
}) => {
  // const image = files.find((i) => i.type === 'FEATURED_IMAGE')
  return (
    <LandingOrderTypeView>
      <LandingOrderTypeContainer>
        <LandingOrderTypeHeader>
          <h3>{title}</h3>
          <ButtonStyled onClick={onClick}>{subtitle}</ButtonStyled>
          <p>{excerpt}</p>
          {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
        </LandingOrderTypeHeader>
      </LandingOrderTypeContainer>
    </LandingOrderTypeView>
  )
}

LandingOrderTypePost.displayName = 'LandingOrderTypePost'
LandingOrderTypePost.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  excerpt: propTypes.string,
  content: propTypes.string,
  files: propTypes.array,
  onClick: propTypes.func,
}

const Landing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const { posts } = useSelector(selectPosts)
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, showHero, orderTypes } = home
  const imageUrl = !showHero ? null : isBrowser ? background : mobile
  const heroHeight = isMobile ? '24rem' : '44rem'

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('HOME'))
    dispatch(fetchPosts('order-types'))
  }, [dispatch])

  const handleOutpost = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    navigate('/locations')
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    navigate('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    navigate('/locations')
  }

  const handleCatering = () => {
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    navigate('/catering-address')
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
        <HeaderGuest maxWidth="100%" />
        <Main>
          <PageHero
            announcements={announcements}
            imageUrl={imageUrl}
            height={heroHeight}
          />
          <ScreenreaderTitle>Home</ScreenreaderTitle>
          <LandingContent>
            <Container style={{ maxWidth: '100%' }}>
              <LandingTitle>
                <h2>{title}</h2>
              </LandingTitle>
              <LandingOrderTypes>
                {posts.map((post) => (
                  <LandingOrderTypePost
                    key={post.slug}
                    {...post}
                    onClick={handlers[post.slug]}
                  />
                ))}
              </LandingOrderTypes>
              <LandingLinks>
                <h3>Other Stuff...</h3>
                <p>
                  <Link to="/gift-cards">{orderTypes.GIFT_CARDS.title}</Link>{' '}
                  <span>or</span>{' '}
                  <Link to="/donations">{orderTypes.DONATIONS.title}</Link>
                </p>
              </LandingLinks>
              <LandingFooter>
                <p>{subtitle}</p>
              </LandingFooter>
            </Container>
          </LandingContent>
        </Main>
      </Content>
    </>
  )
}

Landing.displayName = 'Landing'
export default Landing
