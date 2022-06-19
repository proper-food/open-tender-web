import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'

import { ButtonStyled } from '@open-tender/components'

import { selectConfig, closeModal, selectBrand } from '../../../slices'
import {
  Content,
  HeaderSite,
  HeroSite,
  HeroSiteCta,
  Main,
  PageIntro,
} from '../..'
import PageHero from '../../PageHero'

const Home = () => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = home
  const hasContent = !!(content && content.length)

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {}, [dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          {/* <HeroSite imageUrl={isBrowser ? background : mobile}>
            <HeroSiteCta title={title} subtitle={subtitle} width="56rem">
              <ButtonStyled onClick={() => navigate('/account')}>
                Order Now
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite> */}
          <PageHero page="HOME" imageUrl={isBrowser ? background : mobile} />
          {hasContent && <PageIntro content={content} />}
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home
