import { useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import { selectContentSection, selectDisplaySettings } from '../../../slices'
import PageHero from '../../PageHero'
import { MenuContext } from './Menu'
import MenuBrowse from './MenuBrowse'
import MenuFavsRecents from './MenuFavsRecents'

const MenuNewView = styled.div``

const MenuAnnouncements = styled.div``

const MenuNew = () => {
  const heroRef = useRef()
  const { categories, revenueCenters } = useContext(MenuContext)
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
      <MenuBrowse categories={revenueCenters || categories} />
    </MenuNewView>
  )
}

MenuNew.displayName = 'MenuNew'

export default MenuNew
