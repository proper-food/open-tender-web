import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerFavorites,
  fetchCustomerOrders,
  selectCustomer,
  selectCustomerFavorites,
  selectMenu,
  selectMenuSlug,
} from '@open-tender/redux'
import { makeMenuItemLookup, makeFavorites } from '@open-tender/js'

import { selectBrand } from '../../../slices'
import { Container, Content, Loading, Main } from '../..'
import { MenuCategoryHeader, MenuHeader, MenuItems, MenuItem } from '../Menu'

const MenuFavoritesView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuFavorites = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const { title: siteTitle } = useSelector(selectBrand)
  const menuSlug = useSelector(selectMenuSlug)
  const { auth } = useSelector(selectCustomer)
  const hasCustomer = auth ? true : false
  const { categories, soldOut } = useSelector(selectMenu)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
  const favs = useSelector(selectCustomerFavorites)
  const favorites = useMemo(
    () => makeFavorites(favs.entities, itemLookup, soldOut),
    [favs.entities, itemLookup, soldOut]
  )
  const hasFavorites = favorites && favorites.length > 0
  const favCount = hasFavorites ? favorites.length : 0
  const updating = favCount !== count
  const showLoading = favs.loading === 'pending' && !hasFavorites ? true : false
  const shouldRedirect =
    !hasCustomer || (!hasFavorites && favs.loading !== 'pending')

  useEffect(() => {
    if (hasCustomer) {
      dispatch(fetchCustomerFavorites())
      dispatch(fetchCustomerOrders(11))
    }
  }, [dispatch, hasCustomer])

  useEffect(() => {
    setCount(favCount)
  }, [favCount])

  useEffect(() => {
    if (shouldRedirect) navigate(menuSlug)
  }, [navigate, shouldRedirect, menuSlug])

  if (showLoading || updating) return null

  return (
    <>
      <Helmet>
        <title>Favorites | {siteTitle}</title>
      </Helmet>
      <Content scrollTop={false}>
        <MenuHeader backPath={menuSlug} />
        <Main>
          <MenuFavoritesView>
            <Container>
              <MenuCategoryHeader title="Favorites" />
              {showLoading || updating ? (
                <Loading />
              ) : (
                <MenuItems>
                  {favorites.map((item, index) => (
                    <MenuItem key={`${item.id}-${index}`} item={item} />
                  ))}
                </MenuItems>
              )}
            </Container>
          </MenuFavoritesView>
        </Main>
      </Content>
    </>
  )
}

MenuFavorites.displayName = 'MenuFavorites'
MenuFavorites.propTypes = {}

export default MenuFavorites
