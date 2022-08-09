import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { formatDollars } from '@open-tender/js'
import { selectDisplaySettings } from '../../../../slices'
import { BgImage, Body, ButtonLink, Heading } from '@open-tender/components'
import {
  Collapsible,
  MenuItemIngredients,
  MenuItemNutrition,
  MenuItemPriceCals,
  MenuItemTagsAllergens,
  Quantity,
} from '../../..'
import MenuItemRadio from './MenuItemRadio'

const ItemOptionView = styled.div`
  width: 100%;
  // background-color: pink;
`

const ItemOptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-style: solid;
  border-bottom-width: ${(props) =>
    props.isLast ? '0' : props.theme.border.width};
  border-bottom-color: ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px 0;
  }
`

const ItemOptionImage = styled(BgImage)`
  flex-grow: 0;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 5rem;
    height: 5rem;
  }
`

const ItemOptionText = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 ${(props) => props.showImage && props.theme.layout.paddingMobile} 0;
`

const ItemOptionName = styled(Heading)`
  margin: 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const ItemOptionDescription = styled(Body)`
  margin: 5px 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const ItemOptionQuantity = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 92px;
  justify-content: center;
`
const BuilderNutritionButtons = styled.div`
  margin-top: 3px;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  align-items: center;
`

const ItemOption = ({
  index,
  group,
  option,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
}) => {
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
    modifierImage: showImage = true,
    modifierDescription: showDescription = true,
  } = useSelector(selectDisplaySettings)
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const isLast = index + 1 === group.options.length
  const { name, description, imageUrl, isSoldOut } = option
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const isCheckbox = group.options.filter((i) => i.max !== 1).length === 0
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  const decrementDisabled = option.quantity === 0
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)
  const price = hidePrice ? null : formatDollars(option.price)
  const cals = showCals ? option.cals : null
  const allergens = showAllergens ? option.allergens : null
  const tags = showTags ? option.tags : null
  const isRadio = group.min === 1 && group.max === 1
  const hasIngredients = option.ingredients && option.ingredients.length > 0
  const hasCals = cals !== null

  const toggle = () => {
    toggleOption(group.id, option.id)
  }

  const increment = () => {
    incrementOption(group.id, option.id)
  }

  const decrement = () => {
    decrementOption(group.id, option.id)
  }

  const adjust = (quantity) => {
    setOptionQuantity(group.id, option.id, quantity)
  }

  const toggleShowInfo = () => {
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
  }

  const toggleShowIngredients = () => {
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
  }

  return (
    <ItemOptionView>
      <ItemOptionContainer isLast={isLast}>
        {showImage && <ItemOptionImage style={bgStyle} />}
        <ItemOptionText showImage={showImage}>
          <ItemOptionName>{name}</ItemOptionName>
          {showDescription && description ? (
            <ItemOptionDescription>{description}</ItemOptionDescription>
          ) : null}
          <MenuItemPriceCals
            price={price}
            cals={cals}
            size="xSmall"
            style={{ marginTop: '0.5rem' }}
          />
          <MenuItemTagsAllergens
            tags={tags}
            allergens={allergens}
            style={{ marginTop: '0.5rem' }}
          />
          {hasCals || hasIngredients ? (
            <BuilderNutritionButtons>
              {hasCals ? (
                <ButtonLink onClick={toggleShowInfo} size="xSmall">
                  {!showInfo ? 'show' : 'hide'} nutritional info
                </ButtonLink>
              ) : null}
              {hasCals && hasIngredients ? (
                <Body size="xSmall">{' | '}</Body>
              ) : null}
              {hasIngredients ? (
                <ButtonLink onClick={toggleShowIngredients} size="xSmall">
                  {!showIngredients ? 'show' : 'hide'} ingredients
                </ButtonLink>
              ) : null}
            </BuilderNutritionButtons>
          ) : null}
        </ItemOptionText>
        <ItemOptionQuantity>
          {isSoldOut ? (
            <Body size="xSmall" color="error">
              Out of stock
            </Body>
          ) : isRadio ? (
            <MenuItemRadio option={option} handler={toggle} />
          ) : (
            <Quantity
              item={option}
              increment={increment}
              decrement={decrement}
              adjust={adjust}
              incrementDisabled={incrementDisabled}
              decrementDisabled={decrementDisabled}
              showAdd={true}
              isCheckbox={isCheckbox}
            />
          )}
        </ItemOptionQuantity>
      </ItemOptionContainer>
      {hasCals ? (
        <Collapsible key="nutritionalInfo" show={showInfo}>
          <MenuItemNutrition nutritionalInfo={option.nutritionalInfo} />
        </Collapsible>
      ) : null}
      {hasIngredients ? (
        <Collapsible key="ingredients" show={showIngredients}>
          <MenuItemIngredients ingredients={option.ingredients} />
        </Collapsible>
      ) : null}
    </ItemOptionView>
  )
}

ItemOption.displayName = 'ItemOption'
ItemOption.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  toggleOption: propTypes.func,
  setOptionQuantity: propTypes.func,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
}

export default ItemOption
