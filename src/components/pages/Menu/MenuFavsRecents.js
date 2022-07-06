import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerFavorites,
  fetchCustomerOrders,
  selectCustomer,
  selectCustomerFavorites,
  selectCustomerOrders,
  selectMenu,
  selectMenuSlug,
} from '@open-tender/redux'
import {
  makeUniqueDisplayItems,
  makeMenuItemLookup,
  makeFavorites,
  makeRecents,
} from '@open-tender/js'
import { Heading } from '@open-tender/components'

import { selectMenuSection, setMenuSection } from '../../../slices'
import { Container, SeeMoreLink } from '../..'
import MenuItem from './MenuItem'

const MenuFavoritesView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuFavoritesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 0rem;
  }
`

const MenuFavoritesNav = styled.div`
  flex: 1;
`

const MenuFavoritesMore = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`

const MenuFavoritesButton = styled.button`
  padding: 0 0 0.2rem;
  margin: 0 4rem 0 0;
  border-bottom: ${(props) => props.theme.border.width} solid transparent;
  border-color: ${(props) =>
    props.isActive ? props.theme.border.color : 'transparent'};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 3rem 0 0;
  }

  span {
    font-weight: ${(props) =>
      props.theme.fonts[props.isActive ? 'headings' : 'body'].weight};
  }
`

const MenuFavoritesTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuFavoritesItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  margin: 0 -${(props) => props.theme.layout.padding} -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile} -1.5rem;
  }
`

const MenuFavoritesItemsItem = styled.div`
  flex: 1 0 31rem;
  padding: 1.5rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: 1390px) {
    flex: 0 0 31rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 20rem;
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  & > div {
    height: 100%;
  }
`

const MenuFavorites = () => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const menuSection = useSelector(selectMenuSection)
  const { auth } = useSelector(selectCustomer)
  const hasCustomer = auth ? true : false
  const menuSlug = useSelector(selectMenuSlug)
  const { categories, soldOut } = useSelector(selectMenu)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])

  // handle favorites
  const favs = useSelector(selectCustomerFavorites)
  const favorites = useMemo(
    () => makeFavorites(favs.entities, itemLookup, soldOut),
    [favs.entities, itemLookup, soldOut]
  )
  const hasFavorites = favorites && favorites.length > 0
  const favCount = hasFavorites ? favorites.length : 0
  const displayedFavs = hasFavorites ? favorites.slice(0, 4) : []
  const updating = favCount !== count
  const loadingFavs = favs.loading === 'pending' && !hasFavorites ? true : false
  const moreFavorites = favorites.length > 1 && menuSection === 'favorites'
  const favoritesPath = `${menuSlug}/favorites`

  // handle recents
  const orders = useSelector(selectCustomerOrders)
  const displayItems = useMemo(
    () => makeUniqueDisplayItems(orders.entities),
    [orders.entities]
  )
  const recents = useMemo(
    () => makeRecents(displayItems, itemLookup, soldOut),
    [displayItems, itemLookup, soldOut]
  )
  const hasRecents = recents && recents.length > 0
  const loadingRecents =
    orders.loading === 'pending' && !hasRecents ? true : false
  const displayedRecents = hasRecents ? recents.slice(0, 4) : []
  const moreRecents = recents.length > 4 && menuSection === 'recents'
  const recentsPath = `${menuSlug}/recents`

  const showLoading = loadingRecents || loadingFavs
  const hasItems = hasRecents || hasFavorites

  useEffect(() => {
    if (hasCustomer) {
      dispatch(fetchCustomerFavorites())
      dispatch(fetchCustomerOrders(11))
    }
  }, [dispatch, hasCustomer])

  useEffect(() => {
    setCount(favCount)
  }, [favCount])

  if (showLoading || updating || !hasItems) return null

  return (
    <MenuFavoritesView>
      <Container>
        <MenuFavoritesHeader>
          <MenuFavoritesNav>
            {hasRecents && (
              <MenuFavoritesButton
                isActive={menuSection === 'recents'}
                onClick={() => dispatch(setMenuSection('recents'))}
              >
                <MenuFavoritesTitle>Recents</MenuFavoritesTitle>
              </MenuFavoritesButton>
            )}
            {hasFavorites && (
              <MenuFavoritesButton
                isActive={menuSection === 'favorites'}
                onClick={() => dispatch(setMenuSection('favorites'))}
              >
                <MenuFavoritesTitle>Favorites</MenuFavoritesTitle>
              </MenuFavoritesButton>
            )}
          </MenuFavoritesNav>
          <MenuFavoritesMore>
            {moreFavorites && (
              <SeeMoreLink text="View All" to={favoritesPath} />
            )}
            {moreRecents && <SeeMoreLink text="View All" to={recentsPath} />}
          </MenuFavoritesMore>
        </MenuFavoritesHeader>
        {hasRecents && menuSection === 'recents' ? (
          <MenuFavoritesItems>
            {displayedRecents.map((item, index) => (
              <MenuFavoritesItemsItem key={`${item.id}-${index}`}>
                <MenuItem item={item} />
              </MenuFavoritesItemsItem>
            ))}
          </MenuFavoritesItems>
        ) : null}
        {hasFavorites && menuSection === 'favorites' ? (
          <MenuFavoritesItems>
            {displayedFavs.map((item, index) => (
              <MenuFavoritesItemsItem key={`${item.id}-${index}`}>
                <MenuItem item={item} />
              </MenuFavoritesItemsItem>
            ))}
          </MenuFavoritesItems>
        ) : null}
      </Container>
    </MenuFavoritesView>
  )
}

MenuFavorites.displayName = 'MenuFavorites'
MenuFavorites.propTypes = {}

export default MenuFavorites
