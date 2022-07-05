import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
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
import { Heading } from '@open-tender/components'

import { Container, Content, Loading, Main } from '../..'
import { MenuHeader, MenuFavoriteItem } from '../Menu'
import { Helmet } from 'react-helmet'
import { selectBrand } from '../../../slices'

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
  flex: 0 0 31rem;
  padding: 1.5rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
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
              <MenuFavoritesHeader>
                <MenuFavoritesTitle>Favorites</MenuFavoritesTitle>
              </MenuFavoritesHeader>
              {showLoading || updating ? (
                <Loading />
              ) : (
                <MenuFavoritesItems>
                  {favorites.map((item, index) => (
                    <MenuFavoritesItemsItem key={`${item.id}-${index}`}>
                      <MenuFavoriteItem item={item} />
                    </MenuFavoritesItemsItem>
                  ))}
                </MenuFavoritesItems>
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
