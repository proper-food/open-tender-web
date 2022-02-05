import { useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig, selectBrand } from '../../../slices'
import {
  Content,
  HeroSite,
  Main,
  HeaderSite,
  HeroSiteCta,
  PageIntro,
} from '../..'

const AboutView = styled.div``

const About = () => {
  const brand = useSelector(selectBrand)
  const { about } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = about

  const scrollToMenu = () => {
    scroller.scrollTo('aboutCards', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

  return (
    <>
      <Helmet>
        <title>About | {brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          <HeroSite imageUrl={isBrowser ? background : mobile}>
            <HeroSiteCta title={title} subtitle={subtitle}>
              <ButtonStyled onClick={scrollToMenu}>Learn More</ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
          <AboutView>
            <PageIntro content={content} />
            <Element name="aboutCards"></Element>
          </AboutView>
        </Main>
      </Content>
    </>
  )
}

export default About
