import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
// import {
//   selectAnnouncementsPage,
//   fetchAnnouncementPage,
// } from '@open-tender/redux'
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

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = home
  const hasContent = !!(content && content.length)

  useEffect(() => {
    dispatch(closeModal())
    history.push('/account')
  }, [dispatch, history])

  // useEffect(() => {
  //   dispatch(fetchAnnouncementPage('HOME'))
  // }, [dispatch])

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
              <ButtonStyled onClick={() => history.push('/account')}>
                Order Now
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
          {hasContent && <PageIntro content={content} />}
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home
