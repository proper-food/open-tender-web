import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
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
import { prepareMenuItem } from '@open-tender/js'
import {
  BuilderBody,
  BuilderFooter,
  BuilderHeader,
  BuilderOption,
  ButtonStyled,
  useBuilder,
} from '@open-tender/components'
import { selectMenuPath } from '../../../slices'
import { ArrowLeft, Minus, Plus, Star } from '../../icons'
import { BackgroundImage, Content, Main, ScreenreaderTitle } from '../..'
import MenuItemBuilder from './MenuItemBuilder'
import MenuItemClose from './MenuItemClose'
import { MenuHeader } from '../Menu'
import { MenuContext } from '../Menu/Menu'
import { useTheme } from '@emotion/react'
import MenuItemHeader from './MenuItemHeader'
import MenuItemAccordion from './MenuItemAccordion'

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
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    margin: 24rem 0 0;
    padding: ${(props) => props.theme.layout.paddingMobile};
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
    top: ${(props) => props.theme.layout.navHeightMobile};
    right: 0;
    bottom: auto;
    height: 24rem;
  }
`

const MenuItemBack = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  display: flex;
  align-items: center;
  left: ${(props) => props.theme.layout.padding};
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }

  button {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bgColors.primary};

    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.bgColors.tertiary};
    }
  }
`

// const MenuItemAdd = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   justify-content: flex-end;
//   background-color: ${(props) => props.theme.bgColors.primary};
// `

// const MenuItemAddContent = styled.div`
//   flex: 0 0 100%;
//   max-width: ${(props) => props.maxWidth};
//   padding: ${(props) => props.theme.layout.padding};
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     flex: 0 0 100%;
//     padding: ${(props) => props.theme.layout.paddingMobile};
//   }
// `

// const MenuItemCustomize = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   justify-content: flex-start;
//   overflow-y: scroll;
//   background-color: ${(props) => props.theme.bgColors.tertiary};
// `

// const MenuItemCustomizeContent = styled.div`
//   flex: 0 0 100%;
//   max-width: ${(props) => props.maxWidth};
//   padding: 0 ${(props) => props.theme.layout.padding};
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     flex: 0 0 100%;
//     padding: 0 ${(props) => props.theme.layout.paddingMobile};
//   }
// `

const MenuItem = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { layout } = useTheme()
  const maxWidth = parseInt(layout.containerMaxWidth.replace('rem', '')) / 2
  const maxWidthRem = `${maxWidth.toFixed(0)}rem`
  const { soldOut, siteTitle, displaySettings, allergenAlerts } =
    useContext(MenuContext)
  const menuPath = useSelector(selectMenuPath)
  const menuSlug = useSelector(selectMenuSlug)
  const item = useSelector(selectCurrentItem)
  const { cartId } = useSelector(selectGroupOrder)
  const { orderType } = useSelector(selectOrder)
  const cartCounts = useSelector(selectCartCounts)
  const pointsProgram = useSelector(selectCustomerPointsProgram(orderType))
  const hasPoints = !!pointsProgram
  const pointsIcon = hasPoints ? <Star /> : null
  const menuItem = prepareMenuItem(
    item || {},
    allergenAlerts,
    soldOut,
    displaySettings,
    cartCounts,
    isBrowser
  )
  const { imageUrl } = menuItem
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

  const addItem = (item) => {
    dispatch(addItemToCart(item))
    dispatch(showNotification(`${item.name} added to cart`))
    dispatch(setCurrentItem(null))
  }

  useEffect(() => {
    if (!item) navigate(menuPath || menuSlug)
  }, [item, navigate, menuSlug, menuPath])

  // console.log(builtItem.groups)
  if (!item) return null

  return (
    <>
      <Helmet>
        <title>
          Menu - {item.name} | {siteTitle}
        </title>
      </Helmet>
      <Content hasFooter={false}>
        {/* {isBrowser && (
          <MenuItemBack>
            <ButtonStyled
              onClick={cancel}
              icon={<ArrowLeft />}
              color="header"
              size="small"
            >
              Back to Menu
            </ButtonStyled>
          </MenuItemBack>
        )} */}
        <MenuHeader backClick={cancel} />
        <Main>
          <ScreenreaderTitle>{item.name}</ScreenreaderTitle>
          <MenuItemView>
            {/* <MenuItemClose onClick={cancel} isButton={!isBrowser} /> */}
            {/* <MenuItemAdd>
              <MenuItemAddContent maxWidth={maxWidthRem}></MenuItemAddContent>
            </MenuItemAdd>
            <MenuItemCustomize>
              <MenuItemCustomizeContent
                maxWidth={maxWidthRem}
              ></MenuItemCustomizeContent>
            </MenuItemCustomize> */}
            <MenuItemImage>
              <BackgroundImage imageUrl={imageUrl} />
            </MenuItemImage>
            <MenuItemBuilderView>
              <MenuItemHeader
                menuItem={menuItem}
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
              {/* <BuilderFooter
                item={builtItem}
                iconMap={menuItemsIconMap}
                addItemToCart={addItem}
                setQuantity={setQuantity}
                increment={increment}
                decrement={decrement}
                pointsIcon={pointsIcon}
              />
              <BuilderBody
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
              />
              <MenuItemBuilder
                menuItem={builtItem}
                addItemToCart={addItem}
                cancel={cancel}
                soldOut={soldOut}
                allergenAlerts={allergenAlerts}
                displaySettings={displaySettings}
                cartId={cartId}
                hasPoints={!!pointsProgram}
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
