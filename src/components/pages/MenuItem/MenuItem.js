import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  addItemToCart,
  selectCurrentItem,
  selectCustomerPointsProgram,
  selectGroupOrder,
  selectOrder,
  setCurrentItem,
  selectMenuSlug,
  showNotification,
} from '@open-tender/redux'
import { useBuilder } from '@open-tender/components'
import { selectMenuPath } from '../../../slices'
import { Star } from '../../icons'
import { BackgroundImage, Content, Main, ScreenreaderTitle } from '../..'
import { MenuHeader } from '../Menu'
import { MenuContext } from '../Menu/Menu'

import MenuItemHeader from './MenuItemHeader'
import MenuItemAccordion from './MenuItemAccordion'
import MenuItemFooter from './MenuItemFooter'
import MenuItemGroups from './MenuItemGroups'

const MenuItemView = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
`

const MenuItemBuilderView = styled.div`
  width: 64rem;
  // padding: ${(props) => props.theme.layout.padding} 0;
  margin-bottom: ${(props) => props.footerHeight || '10rem'};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    // padding: ${(props) => props.theme.layout.paddingMobile} 0;
    margin-bottom: ${(props) => props.footerHeight || '10rem'};
  }
`

const MenuItemImage = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  top: ${(props) => props.theme.layout.navHeight};
  bottom: 0;
  left: 0;
  right: 64rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

const MenuItem = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isCustomize, setIsCustomize] = useState(false)
  const [footerHeight, setFooterHeight] = useState(null)
  const footerHeightRem = footerHeight
    ? `${(footerHeight / 10).toFixed(1)}rem`
    : null
  const { soldOut, siteTitle, displaySettings, allergenAlerts } =
    useContext(MenuContext)
  const menuPath = useSelector(selectMenuPath)
  const menuSlug = useSelector(selectMenuSlug)
  const item = useSelector(selectCurrentItem)
  const { cartId } = useSelector(selectGroupOrder)
  const { orderType } = useSelector(selectOrder)
  const pointsProgram = useSelector(selectCustomerPointsProgram(orderType))
  const hasPoints = !!pointsProgram
  const pointsIcon = hasPoints ? <Star /> : null
  const {
    item: builtItem,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(item || {}, soldOut, hasPoints)

  const cancel = () => {
    dispatch(setCurrentItem(null))
  }

  const addItem = (builtItem) => {
    const cartItem = { ...builtItem }
    if (cartItem.index === -1) delete cartItem.index
    dispatch(addItemToCart(cartItem))
    dispatch(showNotification(`${cartItem.name} added to cart`))
    dispatch(setCurrentItem(null))
  }

  useEffect(() => {
    if (!item) navigate(menuPath || menuSlug)
  }, [item, navigate, menuSlug, menuPath])

  if (!item) return null

  return (
    <>
      <Helmet>
        <title>
          Menu - {item.name} | {siteTitle}
        </title>
      </Helmet>
      <Content hasFooter={false}>
        <MenuHeader backClick={cancel} />
        <Main>
          <ScreenreaderTitle>{item.name}</ScreenreaderTitle>
          <MenuItemView>
            <MenuItemImage>
              <BackgroundImage imageUrl={builtItem.imageUrl} />
            </MenuItemImage>
            <MenuItemBuilderView footerHeight={footerHeightRem}>
              <MenuItemHeader
                builtItem={builtItem}
                displaySettings={displaySettings}
                pointsIcon={pointsIcon}
                isCustomize={isCustomize}
                setIsCustomize={setIsCustomize}
              />
              {isCustomize ? (
                <MenuItemGroups
                  builtItem={builtItem}
                  allergenAlerts={allergenAlerts}
                  displaySettings={displaySettings}
                  toggleOption={toggleOption}
                  incrementOption={incrementOption}
                  decrementOption={decrementOption}
                  setOptionQuantity={setOptionQuantity}
                />
              ) : (
                <MenuItemAccordion
                  builtItem={builtItem}
                  setQuantity={setQuantity}
                  increment={increment}
                  decrement={decrement}
                  toggleOption={toggleOption}
                  setMadeFor={setMadeFor}
                  setNotes={setNotes}
                  displaySettings={displaySettings}
                  cartId={cartId}
                />
              )}
              <MenuItemFooter
                builtItem={builtItem}
                addItem={addItem}
                isCustomize={isCustomize}
                setIsCustomize={setIsCustomize}
                setFooterHeight={setFooterHeight}
              />
            </MenuItemBuilderView>
          </MenuItemView>
        </Main>
      </Content>
    </>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
