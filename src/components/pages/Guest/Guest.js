import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  // selectAnnouncementsPage,
  fetchAnnouncementPage,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig, closeModal, selectBrand } from '../../../slices'
import {
  Container,
  Content,
  DealsSection,
  HeaderSite,
  HeroSite,
  HeroSiteCta,
  Main,
  PageIntro,
} from '../..'

const Guest = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const brand = useSelector(selectBrand)
  const { has_deals } = brand
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = home
  const hasContent = !!(content && content.length && content[0].length)
  const hasPageContent = hasContent || has_deals

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('HOME'))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          <HeroSite imageUrl={isBrowser ? background : mobile}>
            <HeroSiteCta title={title} subtitle={subtitle} width="56rem">
              <ButtonStyled onClick={() => history.push('/order-type')}>
                Order Now
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
          <Container>
            <PageIntro dangerouslySetInnerHTML={{ __html: content }} />
          </Container>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
