import { useState } from 'react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  addItemToCart,
  selectCartCounts,
  selectMenu,
  selectMenuSlug,
  selectSelectedAllergenNames,
  setCurrentItem,
  showNotification,
} from '@open-tender/redux'
import {
  formatDollars,
  formatQuantity,
  prepareMenuItem,
  rehydrateOrderItem,
  slugify,
} from '@open-tender/js'
import {
  Body,
  ButtonStyled,
  CardMenuItem,
  useBuilder,
} from '@open-tender/components'
import {
  selectDisplaySettings,
  openModal,
  toggleSidebarModal,
  selectContent,
  setMenuPath,
} from '../../../slices'
import { AlertCircle, Slash } from '../../icons'
import { MenuItemButton, Tag } from '../..'
import MenuItemCount from './MenuItemCount'

const MenuItemView = styled(CardMenuItem)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MenuItemOverlay = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${(props) => props.theme.border.radius};
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: ${(props) =>
    props.isSoldOut
      ? props.theme.overlay.dark
      : props.isAlert
      ? props.theme.overlay.alert
      : 'transparent'};
`

const MenuItemAlert = styled.div`
  position: absolute;
  z-index: 2;
  bottom: -1.2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemButtons = styled.div`
  flex-grow: 0;
  padding: ${(props) => (props.hasBox ? '0 1.1rem 1.1rem' : '0')};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
`

const MenuItemButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuItemButtonsWarning = styled(Body)`
  display: block;
  width: 100%;
  margin: 0 0 1rem;
  // text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.error};
`

const MenuItemButtonsAdd = styled.div`
  ${(props) =>
    props.disabled
      ? `
    button, button:active, button:hover {
    opacity: 0.5;
    color: ${props.theme.colors.primary};
    background-color: ${props.theme.bgColors.tertiary};
    border-color: ${props.theme.bgColors.tertiary};
  }`
      : ''}
`

const MenuItemButtonsCustomize = styled.div`
  button {
    border: 0;
    padding-left: 0;
    padding-right: 0;
  }
`

const MenuItem = ({ item, displayOnly = false, addCallback }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)
  const theme = useTheme()
  const { pathname } = useLocation()
  const hasBox = theme.cards.menuItem.bgColor !== 'transparent'
  const { menu: menuContent } = useSelector(selectContent)
  const menuSlug = useSelector(selectMenuSlug)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const { soldOut } = useSelector(selectMenu)
  const displaySettings = useSelector(selectDisplaySettings)
  const { builderType } = displaySettings
  const cartCounts = useSelector(selectCartCounts)
  const {
    imageUrl,
    price,
    tags,
    allergens,
    allergenAlert,
    isSoldOut,
    showQuickAdd,
    cartCount,
    showTwo,
  } = prepareMenuItem(
    item,
    allergenAlerts,
    soldOut,
    displaySettings,
    cartCounts,
    isBrowser
  )
  const soldOutMsg = isBrowser
    ? menuContent.soldOutMessage || 'Sold out for day'
    : 'Sold out'
  const orderItem = item.favorite
    ? { ...rehydrateOrderItem(item, item.favorite.item), index: -1 }
    : item
  const { item: builtItem } = useBuilder(orderItem, soldOut)
  const { groups, totalPrice, totalCals } = builtItem
  const sizeGroup = groups.find((i) => i.isSize)
  const sizeOnly = sizeGroup && groups.length === 1
  const displayPrice = totalPrice ? formatDollars(totalPrice) : price
  const displayCals = totalCals ? formatQuantity(totalCals) : null
  const optionNames = item.favorite
    ? item.favorite.item.groups
        .reduce((arr, group) => {
          const names = group.options.map((o) => o.name)
          return [...arr, ...names]
        }, [])
        .join(', ')
    : null
  const desc = optionNames || item.description
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const showButtons = !!(!displayOnly && showQuickAdd)

  const view = () => {
    if (!isSoldOut) {
      dispatch(setMenuPath(pathname || menuSlug))
      dispatch(setCurrentItem(orderItem))
      if (builderType === 'PAGE') {
        navigate(`${menuSlug}/item/${slugify(item.name)}`)
      } else if (builderType === 'SIDEBAR') {
        dispatch(toggleSidebarModal())
      } else {
        dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
      }
    }
  }

  const add = () => {
    if (!isSoldOut && !isIncomplete) {
      const cartItem = { ...builtItem }
      if (cartItem.index === -1) delete cartItem.index
      dispatch(addItemToCart(cartItem))
      dispatch(showNotification(`${builtItem.name} added to cart!`))
      if (addCallback) addCallback()
    }
  }

  const itemTag = isSoldOut ? (
    <Tag icon={<Slash />} text={soldOutMsg} bgColor="alert" />
  ) : allergenAlert ? (
    <Tag icon={<AlertCircle />} text={allergenAlert} bgColor="alert" />
  ) : null

  const imageOverlay = itemTag ? (
    <MenuItemOverlay isSoldOut={isSoldOut} isAlert={allergenAlert}>
      <div>{itemTag}</div>
    </MenuItemOverlay>
  ) : null

  return (
    <MenuItemView className={showTwo ? 'compact' : ''}>
      {cartCount > 0 && (
        <MenuItemCount>
          <span>{cartCount}</span>
        </MenuItemCount>
      )}
      {!imageUrl && itemTag ? <MenuItemAlert>{itemTag}</MenuItemAlert> : null}
      <MenuItemButton
        onClick={view}
        disabled={isSoldOut || displayOnly}
        imageUrl={imageUrl}
        imageOverlay={imageOverlay}
        name={item.name}
        desc={desc}
        price={displayPrice}
        cals={displayCals}
        tags={tags}
        allergens={allergens}
      />
      {showButtons && (
        <MenuItemButtons hasBox={hasBox}>
          {clicked && (
            <MenuItemButtonsWarning>
              Item requires customization. Tap "Customize".
            </MenuItemButtonsWarning>
          )}
          <MenuItemButtonsContainer>
            <MenuItemButtonsAdd disabled={isIncomplete}>
              <ButtonStyled
                onClick={isIncomplete ? () => setClicked(true) : add}
                size="small"
              >
                Add To Order
              </ButtonStyled>
            </MenuItemButtonsAdd>
            <MenuItemButtonsCustomize>
              <ButtonStyled
                onClick={view}
                disabled={isSoldOut}
                size="small"
                color="secondary"
              >
                {sizeOnly ? 'Choose Size' : 'Customize'}
              </ButtonStyled>
            </MenuItemButtonsCustomize>
          </MenuItemButtonsContainer>
        </MenuItemButtons>
      )}
    </MenuItemView>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  item: propTypes.object,
  soldOut: propTypes.array,
  menuConfig: propTypes.object,
  allergenAlerts: propTypes.array,
}

export default MenuItem
