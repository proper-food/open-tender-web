import { useContext } from 'react'
import styled from '@emotion/styled'
import { MenuContext } from './Menu'
import MenuBrowse from './MenuBrowse'
import MenuFavsRecents from './MenuFavsRecents'

const MenuNewView = styled.div``

const MenuNew = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    isLoading,
    loadingMessage,
    error,
    menuConfig,
    announcements,
  } = useContext(MenuContext)

  return (
    <MenuNewView>
      <MenuFavsRecents />
      <MenuBrowse categories={categories} />
    </MenuNewView>
  )
}

MenuNew.displayName = 'MenuNew'

export default MenuNew
