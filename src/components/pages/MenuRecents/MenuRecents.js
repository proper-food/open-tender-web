import { useContext, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerOrders,
  selectCustomer,
  selectCustomerOrders,
  selectMenuSlug,
} from '@open-tender/redux'
import {
  makeMenuItemLookup,
  makeRecents,
  makeUniqueDisplayItems,
} from '@open-tender/js'
import { Container, Content, Loading, Main } from '../..'
import { MenuCategoryHeader, MenuHeader, MenuItems, MenuItem } from '../Menu'
import { MenuContext } from '../Menu/Menu'

const MenuRecentsView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuRecents = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories, soldOut, siteTitle, displaySettings } =
    useContext(MenuContext)
  const { itemsTwoPerRowMobile: showTwo } = displaySettings
  const menuSlug = useSelector(selectMenuSlug)
  const { auth } = useSelector(selectCustomer)
  const hasCustomer = auth ? true : false

  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
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
  const showLoading = orders.loading === 'pending' && !hasRecents ? true : false

  const shouldRedirect =
    !hasCustomer || (!hasRecents && orders.loading !== 'pending')

  useEffect(() => {
    if (hasCustomer) {
      dispatch(fetchCustomerOrders(11))
    }
  }, [dispatch, hasCustomer])

  useEffect(() => {
    if (shouldRedirect) navigate(menuSlug)
  }, [navigate, shouldRedirect, menuSlug])

  if (showLoading) return null

  return (
    <>
      <Helmet>
        <title>Recents | {siteTitle}</title>
      </Helmet>
      <Content scrollTop={false}>
        <MenuHeader backPath={menuSlug} />
        <Main>
          <MenuRecentsView>
            <Container>
              <MenuCategoryHeader
                title="Recents"
                subtitle="All of the items you've ordered across your last 10 orders"
              />
              {showLoading ? (
                <Loading />
              ) : (
                <MenuItems perRow={showTwo ? 2 : 1}>
                  {recents.map((item, index) => (
                    <MenuItem
                      key={`${item.id}-${index}`}
                      item={item}
                      isSimple={showTwo}
                    />
                  ))}
                </MenuItems>
              )}
            </Container>
          </MenuRecentsView>
        </Main>
      </Content>
    </>
  )
}

MenuRecents.displayName = 'MenuRecents'
MenuRecents.propTypes = {}

export default MenuRecents
