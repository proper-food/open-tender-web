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
} from '@open-tender/redux'
import {
  makeUniqueDisplayItems,
  makeMenuItemLookup,
  makeFavorites,
  makeRecents,
} from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { Container, Loading } from '../..'
import MenuItem from './MenuItem'
import MenuFavoriteItem from './MenuFavoriteItem'

const MenuFavoritesView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuFavoritesHeader = styled.div`
  margin: 0 0 2rem;
`

const MenuFavoritesButton = styled.button`
  padding: 0 0 0.5rem;
  margin: 0 2rem 0 0;

  span {
    font-weight: ${(props) =>
      props.theme.fonts[props.isActive ? 'headings' : 'body'].weight};
  }
`

const MenuFavoritesTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuFavoritesItems = styled.div`
  // display: flex;
  // justify-content: flex-start;
  // align-items: stretch;
  display: grid;
  justify-content: center;
  align-items: stretch;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const MenuFavorites = () => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState('recents')
  const { auth } = useSelector(selectCustomer)
  const hasCustomer = auth ? true : false
  const { categories, soldOut } = useSelector(selectMenu)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])

  // handle favorites
  const favs = useSelector(selectCustomerFavorites)
  const favorites = useMemo(
    () => makeFavorites(favs.entities, itemLookup, soldOut),
    [favs.entities, itemLookup, soldOut]
  )
  console.log(favorites)
  const hasFavorites = favorites && favorites.length > 0
  const favCount = hasFavorites ? favorites.length : 0
  const displayedFavs = hasFavorites ? favorites.slice(0, 4) : []
  const updating = favCount !== count
  const showLoading = favs.loading === 'pending' && !hasFavorites

  const orders = useSelector(selectCustomerOrders)
  const displayItems = useMemo(
    () => makeUniqueDisplayItems(orders.entities),
    [orders.entities]
  )
  const recents = useMemo(
    () => makeRecents(displayItems, itemLookup, soldOut),
    [displayItems, itemLookup, soldOut]
  )
  // const showLoading = !entities.length && orders.loading === 'pending' ? true : false
  const hasRecents = recents && recents.length > 0
  const displayedRecents = hasRecents ? recents.slice(0, 4) : []

  useEffect(() => {
    if (hasCustomer) {
      dispatch(fetchCustomerFavorites())
      dispatch(fetchCustomerOrders(11))
    }
  }, [dispatch, hasCustomer])

  useEffect(() => {
    setCount(favCount)
  }, [favCount])

  return (
    <MenuFavoritesView>
      {/* {showLoading || updating ? (
        <Loading isLoading={showLoading} />
      ) : hasFavorites ? (
        <ScrollableSection
        title={title}
        to={deals.length > 2 ? '/deals' : null}
        items={favorites}
        renderItem={Reward}
        keyName="discount_id"
      />
      ) : null} */}
      <Container>
        <MenuFavoritesHeader>
          {hasRecents && (
            <MenuFavoritesButton
              isActive={selected === 'recents'}
              onClick={() => setSelected('recents')}
            >
              <MenuFavoritesTitle>Recents</MenuFavoritesTitle>
            </MenuFavoritesButton>
          )}
          {hasFavorites && (
            <MenuFavoritesButton
              isActive={selected === 'favorites'}
              onClick={() => setSelected('favorites')}
            >
              <MenuFavoritesTitle>Favorites</MenuFavoritesTitle>
            </MenuFavoritesButton>
          )}
        </MenuFavoritesHeader>
        {selected === 'recents' && (
          <MenuFavoritesItems>
            {displayedRecents.map((item, index) => (
              <MenuFavoriteItem key={`${item.id}-${index}`} item={item} />
            ))}
          </MenuFavoritesItems>
        )}
        {selected === 'favorites' && (
          <MenuFavoritesItems>
            {displayedFavs.map((item, index) => (
              <MenuFavoriteItem key={`${item.id}-${index}`} item={item} />
            ))}
          </MenuFavoritesItems>
        )}
      </Container>
    </MenuFavoritesView>
  )
}

MenuFavorites.displayName = 'MenuFavorites'
MenuFavorites.propTypes = {}

export default MenuFavorites
