import { useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { MenuContext } from './Menu'
import MenuBrowse from './MenuBrowse'
import MenuFavsRecents from './MenuFavsRecents'
import PageHero from '../../PageHero'
import { selectContentSection, selectDisplaySettings } from '../../../slices'
import { isMobile } from 'react-device-detect'

const MenuNewView = styled.div``

const MenuAnnouncements = styled.div``

const MenuNew = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    isLoading,
    loadingMessage,
    error,
  } = useContext(MenuContext)
  const heroRef = useRef()
  const { menuHero, menuHeroMobile } = useSelector(selectDisplaySettings)
  const { background, mobile } = useSelector(selectContentSection('menu'))
  const showHero = isMobile ? menuHeroMobile : menuHero
  const imageUrl = showHero ? (isMobile ? mobile : background) : null
  const heroHeight = isMobile ? '24rem' : '48rem'

  return (
    <MenuNewView>
      <MenuAnnouncements ref={heroRef}>
        <PageHero page="MENU" height={heroHeight} imageUrl={imageUrl} />
      </MenuAnnouncements>
      <MenuFavsRecents />
      <MenuBrowse categories={categories} />
    </MenuNewView>
  )
}

MenuNew.displayName = 'MenuNew'

export default MenuNew
