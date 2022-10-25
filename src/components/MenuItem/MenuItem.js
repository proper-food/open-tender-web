import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectCartIds,
  selectCurrentItem,
  selectCustomerPointsProgram,
  selectGroupOrder,
  selectOrder,
  selectSelectedAllergenNames,
  selectSoldOut,
} from '@open-tender/redux'
import { useBuilder } from '@open-tender/hooks'
import { selectContentSection, selectDisplaySettings } from '../../slices'
import { Star } from '../icons'
import MenuItemHeader from './MenuItemHeader'
import MenuItemAccordion from './MenuItemAccordion'
import MenuItemFooter from './MenuItemFooter'
import MenuItemGroups from './MenuItemGroups'
import MenuItemUpsell from './MenuItemUpsell'

const MenuItemView = styled.div`
  label: MenuItemView;
  position: relative;
  // z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
`

const MenuItemContent = styled.div`
  label: MenuItemContent;
  flex: 1 1 auto;
  background-color: lightblue;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.bgColors.primary};

  &::-webkit-scrollbar {
    display: none;
  }
`

const MenuItem = ({ addItem, cancel }) => {
  const itemRef = useRef(null)
  const itemScroll = useRef(null)
  const hasCustomize = false
  const [showUpsell, setShowUpsell] = useState(false)
  const [isCustomize, setIsCustomize] = useState(false)
  const [topOffset, setTopOffset] = useState(null)
  const [headerHeight, setHeaderHeight] = useState(null)
  const [headerOffset, setHeaderOffset] = useState(null)
  const [footerHeight, setFooterHeight] = useState(null)
  const footerHeightRem = footerHeight
    ? `${(footerHeight / 10).toFixed(1)}rem`
    : null
  const soldOut = useSelector(selectSoldOut)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const displaySettings = useSelector(selectDisplaySettings)
  const item = useSelector(selectCurrentItem)
  const upsells = useSelector(selectContentSection('upsells')) || {}
  const cartIds = useSelector(selectCartIds)
  const upsellItems = item ? item.upsell_items || item.upsellItems : null
  const upsellItemIds =
    upsellItems && upsells?.item?.show
      ? upsellItems.filter(
          (id) => !cartIds.includes(id) && !soldOut.includes(id)
        )
      : []
  const hasUpsell = upsellItemIds.length > 0
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
  } = useBuilder(item || {})

  const onRefChange = useCallback((node) => {
    if (node !== null) {
      setTopOffset(node.getBoundingClientRect().top)
    }
  }, [])

  if (!item) return null

  return (
    <>
      <MenuItemView ref={onRefChange}>
        <MenuItemContent
          id="menu-item-content"
          ref={itemScroll}
          footerHeight={footerHeightRem}
        >
          <MenuItemHeader
            builtItem={builtItem}
            decrementOption={decrementOption}
            displaySettings={displaySettings}
            pointsIcon={pointsIcon}
            hasCustomize={hasCustomize}
            isCustomize={isCustomize}
            setIsCustomize={setIsCustomize}
            setHeaderOffset={setHeaderOffset}
            setHeaderHeight={setHeaderHeight}
            topOffset={topOffset}
            scrollContainer={itemScroll.current}
          />
          {!hasCustomize || !isCustomize ? (
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
          ) : null}
          {!hasCustomize || isCustomize ? (
            <MenuItemGroups
              builtItem={builtItem}
              allergenAlerts={allergenAlerts}
              displaySettings={displaySettings}
              toggleOption={toggleOption}
              incrementOption={incrementOption}
              decrementOption={decrementOption}
              setOptionQuantity={setOptionQuantity}
              scrollContainer={itemScroll.current}
              headerOffset={headerOffset}
              headerHeight={headerHeight}
            />
          ) : null}
        </MenuItemContent>
        <MenuItemFooter
          builtItem={builtItem}
          addItem={addItem}
          cancel={cancel}
          isCustomize={isCustomize}
          setIsCustomize={setIsCustomize}
          setFooterHeight={setFooterHeight}
        />
      </MenuItemView>
      {/* {hasUpsell && (
        <MenuItemUpsell
          showUpsell={showUpsell}
          setShowUpsell={setShowUpsell}
          upsellItemIds={upsellItemIds}
        />
      )} */}
    </>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
