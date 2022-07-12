import { useEffect, createContext, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { animateScroll as scroll } from 'react-scroll'
import {
  selectOrder,
  selectMenuVars,
  selectGroupOrderClosed,
  selectGroupOrder,
  selectMenu,
  selectSelectedAllergenNames,
  selectCustomer,
  selectDeals,
  resetRevenueCenter,
  fetchLocation,
  fetchMenu,
  fetchAllergens,
  fetchDeals,
  // fetchAnnouncementPage,
  fetchCustomerLoyalty,
  selectCustomerPointsProgram,
} from '@open-tender/redux'
import { makeValidDeals } from '@open-tender/js'

import {
  selectBrand,
  selectConfig,
  selectMenuBrowse,
  setMenuBrowse,
} from '../../../slices'
import { Content, Main, ScreenreaderTitle } from '../..'
import MenuHeader from './MenuHeader'
import MenuNew from './MenuNew'
// import MenuContent from './MenuContent'

export const MenuContext = createContext(null)

const MenuPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const menuBrowse = useSelector(selectMenuBrowse)
  const [init, setInit] = useState(true)
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { menu: menuConfig } = useSelector(selectConfig)
  const { loadingMessage } = menuConfig
  const order = useSelector(selectOrder)
  const { orderType, revenueCenter } = order
  const pointsProgram = useSelector(selectCustomerPointsProgram(orderType))
  const { revenueCenterId, serviceType, requestedAt } =
    useSelector(selectMenuVars)
  let { revenueCenters, categories, soldOut, error, loading } =
    useSelector(selectMenu)
  const isLoading = loading === 'pending'
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const groupOrderClosed = useSelector(selectGroupOrderClosed)
  const { cartGuest } = useSelector(selectGroupOrder)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { entities } = useSelector(selectDeals)
  const deals = has_deals && entities.length ? entities : null
  const validDeals = useMemo(
    () => makeValidDeals(deals, orderType, serviceType, revenueCenterId),
    [deals, orderType, serviceType, revenueCenterId]
  )
  console.log('init', init)
  console.log('menuBrowse', menuBrowse)

  useEffect(() => {
    if (!revenueCenterId) {
      return navigate('/locations')
    } else if (groupOrderClosed) {
      return navigate('/review')
    } else if (menuBrowse) {
      console.log('returning to menu page')
      dispatch(setMenuBrowse(false))
      setInit(false)
    } else if (init) {
      console.log('this is happening')
      scroll.scrollTo(0, { duration: 0, smooth: false })
      setInit(false)
      dispatch(fetchAllergens())
      dispatch(fetchLocation(revenueCenterId))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      // dispatch(fetchAnnouncementPage('MENU'))
    }
  }, [
    revenueCenterId,
    orderType,
    serviceType,
    requestedAt,
    dispatch,
    navigate,
    groupOrderClosed,
    menuBrowse,
    init,
  ])

  useEffect(() => {
    if (has_deals && !isLoading && !cartGuest) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, isLoading, dispatch, cartGuest])

  useEffect(() => {
    if (init && customer_id) {
      dispatch(fetchCustomerLoyalty())
    }
  }, [init, customer_id, dispatch])

  const changeRevenueCenter = () => {
    dispatch(resetRevenueCenter())
  }

  return (
    <>
      <Helmet>
        <title>Menu | {siteTitle}</title>
      </Helmet>
      <Content>
        <MenuHeader />
        <Main>
          <MenuContext.Provider
            value={{
              menuConfig,
              revenueCenter,
              categories,
              revenueCenters,
              changeRevenueCenter,
              soldOut,
              allergenAlerts,
              isLoading,
              loadingMessage,
              error,
              deals: validDeals,
              pointsProgram,
            }}
          >
            <ScreenreaderTitle>Menu</ScreenreaderTitle>
            {/* <MenuContent /> */}
            <MenuNew />
          </MenuContext.Provider>
        </Main>
      </Content>
    </>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
