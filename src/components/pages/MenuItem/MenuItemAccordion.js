import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  makeDisplayPrice,
  formatDollars,
  formatQuantity,
} from '@open-tender/js'
import { Body, Heading, Preface } from '@open-tender/components'
import { ChevronDown, ChevronUp } from '../../icons'
import MenuItemQuantity from './MenuItemQuantity'
import MenuItemNutrition from './MenuItemNutrition'
import MenuItemIngredients from './MenuItemIngredients'
import MenuItemPriceCals from './MenuItemPriceCals'

const MenuItemAccordionView = styled.div`
  border-bottom: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
`

const MenuItemAccordionRow = styled.div`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
`

const MenuItemAccordionSectionView = styled.div`
  padding: 0 0 1rem;
  margin: -1rem 0 0;
`

const MenuItemAccordionSection = ({ show = false, children }) => {
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="nutritionalInfo"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <MenuItemAccordionSectionView>
            {children}
          </MenuItemAccordionSectionView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

const MenuItemAccordionLabel = styled.div``

const MenuItemAccordionToggleView = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MenuItemAccordionToggleButton = styled.button`
  width: 3.8rem;
  height: 3.8rem;
  padding: 0.4rem 0 0 1.4rem;
`

const MenuItemAccordionToggle = ({ name, open, setOpen, children }) => {
  const isOpen = name === open
  const onClick = () => {
    setOpen(isOpen ? null : name)
  }
  return (
    <MenuItemAccordionToggleView>
      {children}
      <MenuItemAccordionToggleButton onClick={onClick}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </MenuItemAccordionToggleButton>
    </MenuItemAccordionToggleView>
  )
}

const MenuItemAccordionSelectedSize = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const MenuItemAccordionMissingSize = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.error};
`

const MenuItemAccordionOptionButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0.8rem;
  margin: 0.6rem 0 0;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  // border-color: ${(props) => props.theme.border.color};
  border-color: ${(props) => props.theme.bgColors.success};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) =>
    props.checked ? props.theme.bgColors.success : 'transparent'};

  span {
    transition: ${(props) => props.theme.links.transition};
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover,
  &:active {
    border-color: ${(props) => props.theme.bgColors.success};
    background-color: ${(props) => props.theme.bgColors.success};

    span {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

const MenuItemAccordionOptionName = styled(Heading)`
  display: block;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  text-transform: uppercase;
`

const MenuItemAccordionOption = ({ name, price, cals, quantity, toggle }) => {
  const displayPrice = price ? formatDollars(price) : null
  return (
    <MenuItemAccordionOptionButton onClick={toggle} checked={quantity >= 1}>
      <MenuItemAccordionOptionName>{name}</MenuItemAccordionOptionName>
      <MenuItemPriceCals price={displayPrice} cals={cals} />
    </MenuItemAccordionOptionButton>
  )
}

const MenuItemAccordion = ({
  builtItem,
  setQuantity,
  increment,
  decrement,
  toggleOption,
}) => {
  const [open, setOpen] = useState(null)
  // const [showInfo, setShowInfo] = useState(false)
  // const [showIngredients, setShowIngredients] = useState(false)
  const { groups, totalPrice, ingredients, nutritionalInfo } = builtItem
  console.log(groups)
  const sizeGroup = groups.find((i) => i.isSize)
  const selectedSize = sizeGroup
    ? sizeGroup.options.find((i) => i.quantity >= 1)
    : null
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || builtItem.quantity === '' || groupsBelowMin

  // const toggleShowInfo = () => {
  //   if (showIngredients) setShowIngredients(false)
  //   setShowInfo(!showInfo)
  // }

  // const toggleShowIngredients = () => {
  //   if (showInfo) setShowInfo(false)
  //   setShowIngredients(!showIngredients)
  // }

  return (
    <MenuItemAccordionView>
      {sizeGroup && (
        <>
          <MenuItemAccordionRow>
            <MenuItemAccordionLabel>Size</MenuItemAccordionLabel>
            <MenuItemAccordionToggle name="SIZE" open={open} setOpen={setOpen}>
              {selectedSize ? (
                <MenuItemAccordionSelectedSize>
                  {selectedSize.name}
                </MenuItemAccordionSelectedSize>
              ) : (
                <MenuItemAccordionMissingSize>
                  Select Size...
                </MenuItemAccordionMissingSize>
              )}
            </MenuItemAccordionToggle>
          </MenuItemAccordionRow>
          <MenuItemAccordionSection show={open === 'SIZE'}>
            {sizeGroup.options.map((option) => (
              <MenuItemAccordionOption
                key={option.id}
                toggle={() => toggleOption(sizeGroup.id, option.id)}
                {...option}
              />
            ))}
          </MenuItemAccordionSection>
        </>
      )}
      <MenuItemAccordionRow>
        <MenuItemAccordionLabel>Quantity</MenuItemAccordionLabel>
        <MenuItemQuantity
          item={builtItem}
          adjust={setQuantity}
          increment={increment}
          decrement={decrement}
        />
      </MenuItemAccordionRow>
      {/* {showCals && (
        <MenuItemNutrition nutritionalInfo={nutritionalInfo} show={showInfo} />
      )}
      {hasIngredients && (
        <MenuItemIngredients ingredients={ingredients} show={showIngredients} />
      )} */}
    </MenuItemAccordionView>
  )
}

MenuItemAccordion.displayName = 'MenuItemAccordion'
MenuItemAccordion.propTypes = {
  builtItem: propTypes.object,
  setQuantity: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
}

export default MenuItemAccordion
