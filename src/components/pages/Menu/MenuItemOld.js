import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
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
  convertStringToArray,
  makeDisplayPrice,
  slugify,
} from '@open-tender/js'
import { Box, Heading, useBuilder } from '@open-tender/components'

import {
  selectDisplaySettings,
  openModal,
  setTopOffset,
  toggleSidebarModal,
  selectContent,
} from '../../../slices'
import iconMap from '../../iconMap'
import { Tag } from '../..'
import { MenuItemButton, MenuItemImage } from '.'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'react-feather'
import { isBrowser } from 'react-device-detect'

const MenuItemView = styled('div')`
  position: relative;
`

export const MenuItemContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: ${(props) => props.theme.cards.menuItem.borderWidth};
  border-color: ${(props) => props.theme.cards.menuItem.borderColor};
  border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
  background-color: ${(props) => props.theme.cards.menuItem.bgColor};
  box-shadow: ${(props) => props.theme.cards.menuItem.boxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    border: 0;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;
    margin: 0 0 2.5rem;
  }
`

const MenuItemWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const MenuItemOverlay = styled('div')`
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

const MenuItemAdd = styled('button')`
  position: absolute;
  z-index: 3;
  bottom: 1.1rem;
  right: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.6rem;
  height: 2.6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    bottom: 0.6rem;
    right: 0.6rem;
    width: 2.8rem;
    height: 3.2rem;
    align-items: flex-end;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: 10.6rem;
    bottom: auto;
    width: 2.8rem;
    height: 2.8rem;
  }

  span {
    display: block;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 1.3rem;
    padding: 0.2rem;
    border-width: 0.2rem;
    border-style: solid;
    transition: ${(props) => props.theme.links.transition};
    color: ${(props) => props.theme.colors.primary};
    background-color: transparent;
    border-color: ${(props) => props.theme.colors.primary};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 1.4rem;
      padding: 0.2rem;
      border-width: 0.2rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      background-color: ${(props) => props.theme.bgColors.primary};
      padding: 0.3rem;
      border-width: 0.1rem;
    }
  }

  &:hover:enabled,
  &:active:enabled {
    span {
      color: ${(props) => props.theme.colors.light};
      background-color: ${(props) => props.theme.colors.primary};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        color: ${(props) => props.theme.colors.primary};
        background-color: transparent;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        background-color: ${(props) => props.theme.bgColors.primary};
      }
    }
  }

  &:disabled {
    span {
      background-color: transparent;
      opacity: 0.5;
    }
  }
`

const MenuItemCount = styled('div')`
  position: absolute;
  z-index: 3;
  top: -1.1rem;
  right: -1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border-style: solid;
  border-width: ${(props) => props.theme.counts.alerts.borderWidth};
  padding-top: ${(props) => props.theme.counts.alerts.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.alerts.paddingBottom};
  color: ${(props) => props.theme.counts.alerts.color};
  background-color: ${(props) => props.theme.counts.alerts.bgColor};
  border-color: ${(props) => props.theme.counts.alerts.borderColor};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: -1rem;
    right: -0.9rem;
    min-width: 2.2rem;
    height: 2.2rem;
  }

  span {
    display: block;
    line-height: 0;
    font-family: ${(props) => props.theme.counts.alerts.family};
    font-weight: ${(props) => props.theme.counts.alerts.weight};
    font-size: ${(props) => props.theme.counts.alerts.fontSize};
    -webkit-font-smoothing: ${(props) =>
      props.theme.counts.alerts.fontSmoothing};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.counts.alerts.fontSizeMobile};
    }
  }
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

const MenuItemContent = styled('div')`
  position: relative;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 1.5rem 1.5rem 1.2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1.2rem 0.6rem 0rem 0;
  }
`

const MenuItemInfo = styled('div')`
  flex: 1 0 auto;
`

const MenuItemName = styled('p')`
  line-height: 1.2;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemDescription = styled('p')`
  margin: 0.5rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  color: ${(props) => props.theme.fonts.body.color};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: 600px) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const MenuItemDetails = styled('p')`
  margin: 0.5rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  @media (max-width: 600px) {
    margin: 0.3rem 0 0;
  }

  & > span {
    display: inline-block;
    margin: 0 1.5rem 0 0;
    @media (max-width: 600px) {
      margin: 0 0.75rem 0 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

const MenuItemAllergens = styled('span')`
  color: ${(props) => props.theme.colors.alert};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: 600px) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemTags = styled(MenuItemAllergens)`
  color: ${(props) => props.theme.fonts.body.color};
`

const MenuItemPriceCals = styled('div')`
  flex: 0 0 auto;
  margin: 0.7rem 0 0;
  @media (max-width: 600px) {
    margin: 0.3rem 0 0;
  }

  span + span {
    margin: 0 0 0 1.5rem;
  }
`

const MenuItemPrice = styled('span')`
  color: ${(props) => props.theme.fonts.headings.color};
  font-weight: ${(props) => props.theme.boldWeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    font-weight: ${(props) => props.theme.fonts.body.weight};
  }
`

const MenuItemCals = styled(MenuItemPrice)`
  color: ${(props) => props.theme.fonts.body.color};
`

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { menu: menuContent } = useSelector(selectContent)
  const { soldOut } = useSelector(selectMenu)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const {
    menuImages: showImage,
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
    builderType,
    quickAdd = true,
    quickAddMobile = true,
  } = useSelector(selectDisplaySettings)
  const menuSlug = useSelector(selectMenuSlug)
  const soldOutMsg = menuContent.soldOutMessage || 'Sold out for day'
  const cartCounts = useSelector(selectCartCounts)
  const isSoldOut = soldOut.includes(item.id)
  const cartCount = cartCounts[item.id] || 0
  const smallImg =
    item.small_image_url || item.app_image_url || item.big_image_url
  const imageUrl = showImage ? smallImg : null
  const price = makeDisplayPrice(item)
  const cals =
    showCals && item.nutritional_info
      ? parseInt(item.nutritional_info.calories) || null
      : null
  const allergens = showAllergens ? convertStringToArray(item.allergens) : []
  const tags = showTags ? convertStringToArray(item.tags) : []
  const hasTags = tags.length > 0
  const allergenAlert = allergens.length
    ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
    : []
  const hasAllergensAlert = allergenAlert.length > 0
  const hasAllergens = allergens.length > 0
  const { item: builtItem } = useBuilder(item, soldOut)
  const { groups, totalPrice } = builtItem
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const hasQuickAdd = isBrowser ? quickAdd : quickAddMobile
  const showQuickAdd = hasQuickAdd && !isIncomplete && !isSoldOut

  const view = (evt) => {
    evt.preventDefault()
    if (!isSoldOut) {
      dispatch(setCurrentItem(item))
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

  const add = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!isSoldOut && !isIncomplete) {
      dispatch(addItemToCart(builtItem))
      dispatch(showNotification(`${builtItem.name} added to cart!`))
    }
  }

  const itemTag = isSoldOut ? (
    <Tag icon={iconMap.Slash} text={soldOutMsg} bgColor="alert" />
  ) : hasAllergensAlert ? (
    <Tag
      icon={iconMap.AlertCircle}
      text={allergenAlert.join(', ')}
      bgColor="alert"
    />
  ) : null

  return (
    <MenuItemView>
      <MenuItemContainer>
        {cartCount > 0 && (
          <MenuItemCount>
            <span>{cartCount}</span>
          </MenuItemCount>
        )}
        {!showImage && itemTag ? (
          <MenuItemAlert>{itemTag}</MenuItemAlert>
        ) : null}
        <MenuItemButton onClick={view} isSoldOut={isSoldOut}>
          <MenuItemWrapper>
            {showImage && (
              <MenuItemImage imageUrl={imageUrl}>
                {itemTag && (
                  <MenuItemOverlay
                    isSoldOut={isSoldOut}
                    isAlert={hasAllergensAlert}
                  >
                    <div>{itemTag}</div>
                  </MenuItemOverlay>
                )}
              </MenuItemImage>
            )}
            <MenuItemContent>
              <MenuItemInfo>
                <MenuItemName>
                  <Heading>{item.name}</Heading>
                </MenuItemName>
                {item.description && (
                  <MenuItemDescription>{item.description}</MenuItemDescription>
                )}
                {(hasAllergens || hasTags) && (
                  <MenuItemDetails showQuickAdd={showQuickAdd}>
                    {hasAllergens && (
                      <MenuItemAllergens>
                        {allergens.join(', ')}
                      </MenuItemAllergens>
                    )}
                    {hasTags && <MenuItemTags>{tags.join(', ')}</MenuItemTags>}
                  </MenuItemDetails>
                )}
              </MenuItemInfo>
              <MenuItemPriceCals>
                {price && <MenuItemPrice>{price}</MenuItemPrice>}
                {cals && <MenuItemCals>{cals} cals</MenuItemCals>}
              </MenuItemPriceCals>
            </MenuItemContent>
          </MenuItemWrapper>
        </MenuItemButton>
        {showQuickAdd && (
          <MenuItemAdd onClick={add} disabled={isIncomplete} title="Quick Add">
            <span>
              <Plus size={null} />
            </span>
          </MenuItemAdd>
        )}
      </MenuItemContainer>
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
