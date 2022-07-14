import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
// import { useTheme } from '@emotion/react'
import {
  addItemToCart,
  selectCartCounts,
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
// import MenuItemClose from './MenuItemClose'
import { MenuHeader } from '../Menu'
import { MenuContext } from '../Menu/Menu'

import MenuItemHeader from './MenuItemHeader'
import MenuItemAccordion from './MenuItemAccordion'
import MenuItemFooter from './MenuItemFooter'

const footerHeight = '8rem'
const footerHeightMobile = '7rem'

const MenuItemView = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
`

const MenuItemBuilderView = styled.div`
  width: 64rem;
  padding: ${(props) => props.theme.layout.padding};
  padding-bottom: 9.5rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    // margin: 24rem 0 0;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: ${footerHeightMobile};
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
  const footer = useRef(null)
  // const [footerHeight, setFooterHeight] = useState(null)
  console.log(footer.current?.getBoundingClientRect().height)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
            <MenuItemBuilderView>
              <MenuItemHeader
                builtItem={builtItem}
                displaySettings={displaySettings}
                pointsIcon={pointsIcon}
              />
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
              <MenuItemFooter
                ref={footer}
                builtItem={builtItem}
                addItem={addItem}
              />
              {/* <BuilderBody
                allergens={allergenAlerts}
                renderOption={(props) => <BuilderOption {...props} />}
                iconMap={menuItemsIconMap}
                displaySettings={displaySettings}
                cartId={cartId}
                item={builtItem}
                setMadeFor={setMadeFor}
                setNotes={setNotes}
                toggleOption={toggleOption}
                incrementOption={incrementOption}
                decrementOption={decrementOption}
                setOptionQuantity={setOptionQuantity}
              /> */}
            </MenuItemBuilderView>
          </MenuItemView>
        </Main>
      </Content>
    </>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
