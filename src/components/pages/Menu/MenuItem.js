import { useState } from 'react'
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import {
  addItemToCart,
  selectCartCounts,
  selectMenu,
  selectMenuSlug,
  selectPointsProgram,
  selectSelectedAllergenNames,
  setCurrentItem,
  showNotification,
} from '@open-tender/redux'
import { makeOrderItem, rehydrateOrderItem, slugify } from '@open-tender/js'
import { useOrderItem } from '@open-tender/hooks'
import { Body, ButtonStyled, CardMenuItem } from '@open-tender/components'
import {
  selectDisplaySettings,
  openModal,
  toggleSidebarModal,
  setMenuPath,
} from '../../../slices'
import { MenuItemButton, MenuItemOverlay, MenuItemTagAlert } from '../..'
import MenuItemCount from './MenuItemCount'

const MenuItemView = styled(CardMenuItem)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MenuItemButtons = styled.div`
  flex-grow: 0;
  padding: ${(props) => (props.hasBox ? '0 1.3rem 1.5rem' : '0')};

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
    button, button:active, button:hover, button:disabled {
    opacity: 1;
    color: ${props.theme.colors.primary};
    background-color: ${props.theme.bgColors.tertiary};
    border-color: ${props.theme.bgColors.tertiary};
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.05);
  }`
      : ''}
`

const MenuItemButtonsCustomize = styled.div`
  ${(props) =>
    !props.customizeIsPrimary
      ? `
  button, button:active, button:hover, button:disabled {
    border: 0;
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
  }`
      : ''}
`

const MenuItem = ({
  item,
  isSimple = false,
  isCentered = false,
  displayOnly = false,
  addCallback,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)
  const theme = useTheme()
  const { pathname } = useLocation()
  const hasBox = theme.cards.menuItem.bgColor !== 'transparent'
  const menuSlug = useSelector(selectMenuSlug)
  const cartCounts = useSelector(selectCartCounts)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const { soldOut } = useSelector(selectMenu)
  const displaySettings = useSelector(selectDisplaySettings)
  const pointsProgram = useSelector(selectPointsProgram)
  const hasPoints = !!pointsProgram
  const orderItem = item.favorite
    ? { ...rehydrateOrderItem(item, item.favorite.item), index: -1 }
    : makeOrderItem(item, null, soldOut, null, hasPoints)
  const {
    name,
    showImage,
    imageUrl,
    displayDesc,
    displayTags,
    displayAllergens,
    displayPrice,
    displayCals,
    isIncomplete,
    isSoldOut,
    allergenAlert,
    showQuickAdd,
    sizeOnly,
    cartCount,
  } = useOrderItem(
    orderItem,
    item.favorite,
    soldOut,
    allergenAlerts,
    displaySettings,
    cartCounts,
    isMobile
  )
  const builderType = 'PAGE'
  const isBig = !isSimple && !isCentered ? true : false
  const showButtons = !displayOnly && isBig && showQuickAdd ? true : false
  const addDisabled = isIncomplete || isSoldOut
  const customizeIsPrimary = addDisabled && !isSoldOut

  const view = () => {
    if (!isSoldOut) {
      dispatch(setMenuPath(pathname || menuSlug))
      dispatch(setCurrentItem(orderItem))
      if (builderType === 'PAGE') {
        navigate(`${menuSlug}/item/${slugify(name)}`)
      } else if (builderType === 'SIDEBAR') {
        dispatch(toggleSidebarModal())
      } else {
        dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
      }
    }
  }

  const add = () => {
    if (!isSoldOut && !isIncomplete) {
      const cartItem = { ...orderItem }
      if (cartItem.index === -1) delete cartItem.index
      dispatch(addItemToCart(cartItem))
      dispatch(showNotification(`${name} added to cart!`))
      if (addCallback) addCallback()
    }
  }

  const imageOverlay = showImage ? (
    <MenuItemOverlay isSoldOut={isSoldOut} allergenAlert={allergenAlert} />
  ) : null

  return (
    <MenuItemView className={isSimple ? 'compact' : ''}>
      {cartCount > 0 && (
        <MenuItemCount>
          <span>{cartCount}</span>
        </MenuItemCount>
      )}
      <MenuItemButton
        onClick={view}
        disabled={isSoldOut || displayOnly}
        showImage={showImage}
        imageUrl={imageUrl}
        imageOverlay={imageOverlay}
        name={item.name}
        desc={displayDesc}
        price={displayPrice}
        cals={displayCals}
        tags={displayTags}
        allergens={displayAllergens}
      />
      {!showImage ? (
        <MenuItemTagAlert isSoldOut={isSoldOut} allergenAlert={allergenAlert} />
      ) : null}
      {showButtons && (
        <MenuItemButtons hasBox={hasBox}>
          {clicked && (
            <MenuItemButtonsWarning>
              Item requires customization. Tap "Customize".
            </MenuItemButtonsWarning>
          )}
          <MenuItemButtonsContainer>
            <MenuItemButtonsAdd disabled={addDisabled}>
              <ButtonStyled
                onClick={isIncomplete ? () => setClicked(true) : add}
                size="small"
                disabled={isSoldOut}
              >
                Add To Order
              </ButtonStyled>
            </MenuItemButtonsAdd>
            <MenuItemButtonsCustomize customizeIsPrimary={customizeIsPrimary}>
              <ButtonStyled
                onClick={view}
                disabled={isSoldOut}
                size="small"
                color={customizeIsPrimary ? 'primary' : 'secondary'}
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
  isSimple: propTypes.bool,
  isCentered: propTypes.bool,
  displayOnly: propTypes.bool,
  addCallback: propTypes.func,
}

export default MenuItem
