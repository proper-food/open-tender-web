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
import { makeUniqueDisplayItems } from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { Container, Loading } from '../..'
import MenuItem from './MenuItem'

export const makeItemLookup = (categories) => {
  const cats = categories.reduce((arr, cat) => {
    return [...arr, cat, ...(cat.children || [])]
  }, [])
  return cats.reduce((obj, category) => {
    const items = category.items.reduce((o, i) => ({ ...o, [i.id]: i }), {})
    return { ...obj, ...items }
  }, {})
}

export const makeGroupsLookup = (menuItem) => {
  if (!menuItem.option_groups) return {}
  return menuItem.option_groups.reduce((grpObj, i) => {
    const options = i.option_items.reduce((optObj, o) => {
      optObj[o.id] = o
      return optObj
    }, {})
    grpObj[i.id] = { ...i, options }
    return grpObj
  }, {})
}

const validateFavorite = (item, menuItem, soldOut) => {
  const groupsLookup = makeGroupsLookup(menuItem)
  let missingGroups = [],
    missingOptions = []
  item.groups.forEach((group) => {
    const menuItemGroup = groupsLookup[group.id]
    if (menuItemGroup) {
      group.options.forEach((option) => {
        const menuItemOption = menuItemGroup.options[option.id]
        if (!menuItemOption || soldOut.includes(option.id)) {
          missingOptions.push(option)
        }
      })
    } else {
      missingGroups.push(group)
    }
  })
  return missingGroups.length || missingOptions.length ? false : true
}

const makeFavorites = (favorites, itemLookup, soldOut) => {
  return favorites.reduce((arr, favorite) => {
    const menuItem = itemLookup[favorite.item.id]
    if (!menuItem) return arr
    const isValid = validateFavorite(favorite.item, menuItem, soldOut)
    return isValid ? [...arr, { ...menuItem, favorite }] : arr
  }, [])
}

const makeRecents = (recents, itemLookup, soldOut) => {
  return recents.reduce((arr, item) => {
    const menuItem = itemLookup[item.id]
    if (!menuItem) return arr
    const isValid = validateFavorite(item, menuItem, soldOut)
    if (!isValid) return arr
    const favorite = { item }
    return isValid
      ? [
          ...arr,
          {
            ...menuItem,
            favorite: { item: { ...favorite.item, quantity: 1 } },
          },
        ]
      : arr
  }, [])
}

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
  const itemLookup = useMemo(() => makeItemLookup(categories), [categories])

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
              <MenuItem key={`${item.id}-${index}`} item={item} />
            ))}
          </MenuFavoritesItems>
        )}
        {selected === 'favorites' && (
          <MenuFavoritesItems>
            {displayedFavs.map((item, index) => (
              <MenuItem key={`${item.id}-${index}`} item={item} />
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
