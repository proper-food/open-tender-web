import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectGroupOrder } from '@open-tender/redux'

import { selectDisplaySettings } from '../../../slices'
import {
  RevenueCenter,
  RevenueCenterChild,
  NavSticky,
  Loading,
  PageHero,
  SidebarModal,
} from '../..'
import { MenuContext } from './Menu'
import MenuRevenueCenters from './MenuRevenueCenters'
import MenuCategories from './MenuCategories'
// import MenuLoading from './MenuLoading'
import MenuError from './MenuError'
import MenuHero from './MenuHero'
import styled from '@emotion/styled'
import MenuDeals from './MenuDeals'
import { MenuItem } from '../../sidebarModals'

const MenuView = styled('div')`
  position: relative;
`

const MenuAnnouncements = styled('div')`
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-height: 32rem;
  }
`

const MenuContent = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    isLoading,
    loadingMessage,
    error,
    menuConfig,
    deals,
    announcements,
  } = useContext(MenuContext)
  const { menuHero, menuHeroMobile, menuHeroChild, menuHeroChildMobile } =
    useSelector(selectDisplaySettings)
  const { cartGuest } = useSelector(selectGroupOrder)
  const showHero =
    menuHero === undefined ? true : isMobile ? menuHeroMobile : menuHero
  const showHeroChild =
    menuHeroChild === undefined
      ? true
      : isMobile
      ? menuHeroChildMobile
      : menuHeroChild
  const topRef = useRef()
  const heroRef = useRef()
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState([])
  let navItems = visible ? visible.map((i) => i.name) : []
  navItems = deals && deals.length > 0 ? ['Deals', ...navItems] : navItems
  const heroHeight = heroRef.current
    ? heroRef.current.getBoundingClientRect().height
    : 0
  const hasAnnouncements = announcements && announcements.entities.length > 0

  useEffect(() => {
    if (revenueCenters) {
      if (selected) {
        const id = selected.revenue_center_id
        setVisible(categories.filter((i) => i.revenue_center_id === id))
      } else {
        setVisible([])
      }
    } else {
      setVisible(categories)
    }
  }, [revenueCenters, categories, selected])

  const change = (revenueCenter) => {
    setSelected(revenueCenter)
    if (!revenueCenter) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {hasAnnouncements ? (
        <MenuAnnouncements ref={heroRef}>
          <PageHero announcements={announcements} />
        </MenuAnnouncements>
      ) : selected && showHeroChild ? (
        <div ref={heroRef}>
          <MenuHero imageUrl={selected.large_image_url}>
            <RevenueCenterChild
              revenueCenter={selected}
              style={{ maxWidth: '44rem' }}
            />
          </MenuHero>
        </div>
      ) : (
        !selected &&
        revenueCenter &&
        showHero && (
          <div ref={heroRef}>
            <MenuHero imageUrl={menuConfig.background}>
              <RevenueCenter
                revenueCenter={revenueCenter}
                isMenu={true}
                style={{ maxWidth: '44rem' }}
              />
            </MenuHero>
          </div>
        )
      )}
      {!error ? (
        <>
          <MenuView>
            <div ref={topRef}>
              <MenuRevenueCenters
                revenueCenters={revenueCenters}
                selected={selected}
                change={change}
              />
              {visible.length > 0 ? (
                <>
                  <NavSticky
                    items={navItems}
                    offset={heroHeight}
                    revenueCenter={selected}
                    change={change}
                  />
                  {!cartGuest && <MenuDeals deals={deals} />}
                  <MenuCategories categories={visible} />
                </>
              ) : isLoading ? (
                <Loading text={loadingMessage} style={{ margin: '5rem 0 0' }} />
              ) : null}
            </div>
          </MenuView>
          <SidebarModal>
            <MenuItem />
          </SidebarModal>
        </>
      ) : !isLoading ? (
        <MenuError />
      ) : null}
    </>
  )
}

MenuContent.displayName = 'MenuContent'

export default MenuContent
