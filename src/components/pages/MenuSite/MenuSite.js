import { useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig, selectBrand } from '../../../slices'
import {
  Container,
  Content,
  HeroSite,
  Main,
  HeaderSite,
  HeroSiteCta,
} from '../..'

const MenuSiteView = styled.div``

const MenuSiteIntro = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: ${(props) => props.theme.layout.margin} auto;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} auto;
  }

  p {
    margin: 1em 0;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const MenuSiteMenu = styled.div`
  padding: 10rem;
  background-color: palegreen;
`

const MenuSite = () => {
  const brand = useSelector(selectBrand)
  const { menuSite } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = menuSite

  const scrollToMenu = () => {
    scroller.scrollTo('menuSite', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

  return (
    <>
      <Helmet>
        <title>Menu | {brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          <HeroSite imageUrl={isBrowser ? background : mobile}>
            <HeroSiteCta title={title} subtitle={subtitle}>
              <ButtonStyled onClick={scrollToMenu}>
                Browse Our Menu
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
          <MenuSiteView>
            <Container>
              <MenuSiteIntro dangerouslySetInnerHTML={{ __html: content }} />
              <Element name="menuSite">
                <MenuSiteMenu />
              </Element>
            </Container>
          </MenuSiteView>
        </Main>
      </Content>
    </>
  )
}

export default MenuSite
