import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  prepareMenuItem,
  rehydrateOrderItem,
  slugify,
} from '@open-tender/js'
import {
  Body,
  ButtonStyled,
  CardMenuItem,
  Heading,
  Preface,
  useBuilder,
} from '@open-tender/components'

import {
  selectDisplaySettings,
  openModal,
  setTopOffset,
  toggleSidebarModal,
  selectContent,
} from '../../../slices'
import iconMap from '../../iconMap'
import { Tag } from '../..'

import MenuItemCount from './MenuItemCount'
import MenuItemImage from './MenuItemImage'

const MenuItemView = styled(CardMenuItem)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MenuItemButton = styled.button`
  flex-grow: 1;
  display: block;
  text-align: left;
  width: 100%;
  margin: 0 0 1.3rem;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0;
    }
  }

  &:disabled {
    opacity: 1;
  }
`

const MenuItemContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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

const MenuItemAlert = styled('div')`
  position: absolute;
  z-index: 2;
  bottom: -1.2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemContent = styled.div`
  padding: ${(props) => (props.hasBox ? '1.1rem 1.1rem 0' : '1.1rem 0 0')};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: ${(props) => (props.hasBox ? '0.9rem 0.9rem' : '0.7rem 0 0')};
    }
  }
`

const MenuItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`

const MenuItemName = styled(Heading)`
  display: block;
  flex: 1 1 auto;
  padding: 0 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.big};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const MenuItemPriceCals = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  text-align: right;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.1rem 0 0;
      text-align: left;
    }
  }
`

const MenuItemPrice = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemCals = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.small};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemTagsAllergens = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.8rem 0 0;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }

  span {
    display: block;
  }

  span + span {
    margin-left: 2rem;
  }
`

const MenuItemTag = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
`

const MenuItemAllergen = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  color: ${(props) => props.theme.colors.allergens};
`

const MenuItemDescription = styled(Body)`
  display: block;
  margin: 0.8rem 0 0;
  line-height: 1.2;
  font-size: ${(props) => props.theme.fonts.sizes.small};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
`

const MenuItemButtons = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.hasBox ? '0 1.1rem 1.1rem' : '0')};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
`

const MenuItemButtonsCustomize = styled.div`
  button {
    border: 0;
    padding-left: 0;
    padding-right: 0;
  }
`

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
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
  const hasTagsAllergens = tags.length || allergens.length ? true : false
  const soldOutMsg = menuContent.soldOutMessage || 'Sold out for day'
  const orderItem = item.favorite
    ? { ...rehydrateOrderItem(item, item.favorite.item), index: -1 }
    : item
  const { item: builtItem } = useBuilder(orderItem, soldOut)
  const { groups, totalPrice, totalCals } = builtItem
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

  const view = () => {
    if (!isSoldOut) {
      dispatch(setCurrentItem(orderItem))
      if (builderType === 'PAGE') {
        const mainElement = document.getElementById('main')
        const mainOffset = mainElement.getBoundingClientRect().top
        dispatch(setTopOffset(-mainOffset))
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
    }
  }

  const itemTag = isSoldOut ? (
    <Tag icon={iconMap.Slash} text={soldOutMsg} bgColor="alert" />
  ) : allergenAlert ? (
    <Tag icon={iconMap.AlertCircle} text={allergenAlert} bgColor="alert" />
  ) : null

  return (
    <MenuItemView className={showTwo ? 'compact' : ''}>
      {cartCount > 0 && (
        <MenuItemCount>
          <span>{cartCount}</span>
        </MenuItemCount>
      )}
      {!imageUrl && itemTag ? <MenuItemAlert>{itemTag}</MenuItemAlert> : null}
      <MenuItemButton onClick={() => view()} disabled={isSoldOut}>
        <MenuItemContainer>
          {imageUrl && (
            <MenuItemImage imageUrl={imageUrl}>
              {itemTag && (
                <MenuItemOverlay isSoldOut={isSoldOut} isAlert={allergenAlert}>
                  <div>{itemTag}</div>
                </MenuItemOverlay>
              )}
            </MenuItemImage>
          )}
          <MenuItemContent hasBox={hasBox}>
            <MenuItemInfo>
              <MenuItemName>
                <Heading>{item.name}</Heading>
              </MenuItemName>
              <MenuItemPriceCals>
                {totalPrice && (
                  <MenuItemPrice>{formatDollars(totalPrice)}</MenuItemPrice>
                )}
                {totalCals && (
                  <MenuItemCals> &mdash; {totalCals} Cal</MenuItemCals>
                )}
              </MenuItemPriceCals>
            </MenuItemInfo>
            {hasTagsAllergens && (
              <MenuItemTagsAllergens>
                {tags.map((tag) => (
                  <MenuItemTag key={tag}>{tag}</MenuItemTag>
                ))}
                {allergens.map((allergen) => (
                  <MenuItemAllergen key={allergen}>{allergen}</MenuItemAllergen>
                ))}
              </MenuItemTagsAllergens>
            )}
            {desc && <MenuItemDescription>{desc}</MenuItemDescription>}
          </MenuItemContent>
        </MenuItemContainer>
      </MenuItemButton>
      <MenuItemButtons hasBox={hasBox}>
        <ButtonStyled
          onClick={add}
          disabled={!showQuickAdd || isIncomplete}
          size="small"
        >
          Add To Order
        </ButtonStyled>
        <MenuItemButtonsCustomize>
          <ButtonStyled
            onClick={view}
            disabled={isSoldOut}
            size="small"
            color="secondary"
          >
            Customize
          </ButtonStyled>
        </MenuItemButtonsCustomize>
      </MenuItemButtons>
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
