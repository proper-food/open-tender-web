import { useContext } from 'react'
import styled from '@emotion/styled'
import { MenuContext } from './Menu'
import MenuBrowse from './MenuBrowse'
import MenuFavorites from './MenuFavorites'

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
      <MenuFavorites />
      <MenuBrowse categories={categories} />
    </MenuNewView>
  )
}

MenuNew.displayName = 'MenuNew'

export default MenuNew
