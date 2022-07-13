import { useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import { selectDisplaySettings } from '../../../slices'
import { Content, Loading, Main, PageHero, ScreenreaderTitle } from '../..'
import { MenuContext } from './Menu'
import MenuHeader from './MenuHeader'
import MenuBrowse from './MenuBrowse'
import MenuFavsRecents from './MenuFavsRecents'

const MenuNewView = styled.div``

const MenuAnnouncements = styled.div``

const MenuLoading = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuNew = () => {
  const heroRef = useRef()
  const {
    announcements,
    categories,
    revenueCenters,
    siteTitle,
    menuContent,
    isLoading,
  } = useContext(MenuContext)
  const { background, mobile, loadingMessage } = menuContent
  const { menuHero, menuHeroMobile } = useSelector(selectDisplaySettings)
  const showHero = isMobile ? menuHeroMobile : menuHero
  const imageUrl = showHero ? (isMobile ? mobile : background) : null
  const heroHeight = isMobile ? '24rem' : '48rem'

  return (
    <>
      <Helmet>
        <title>Menu | {siteTitle}</title>
      </Helmet>
      <Content>
        <MenuHeader />
        <Main>
          <ScreenreaderTitle>Menu</ScreenreaderTitle>
          <MenuNewView>
            <MenuAnnouncements ref={heroRef}>
              <PageHero
                announcements={announcements}
                height={heroHeight}
                imageUrl={imageUrl}
              />
            </MenuAnnouncements>
            {isLoading ? (
              <MenuLoading>
                <Loading text={loadingMessage} />
              </MenuLoading>
            ) : (
              <>
                <MenuFavsRecents />
                <MenuBrowse categories={revenueCenters || categories} />
              </>
            )}
          </MenuNewView>
        </Main>
      </Content>
    </>
  )
}

MenuNew.displayName = 'MenuNew'

export default MenuNew
