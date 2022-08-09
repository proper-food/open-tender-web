import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { displayPrice, makeModifierNames } from '@open-tender/js'
import { BgImage, Body, ButtonLink, Heading } from '@open-tender/components'
import { MenuItemNutrition, MenuItemIngredients } from '.'

const CartItemOverlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.overlay[props.overlay]};

  p {
    font-weight: bold;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const CartItemOverlayAlert = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  padding: 0.3rem 0.2rem 0.4rem;
  text-align: center;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.light};
`

const CartItemView = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem 0;
  border-bottom-style: solid;
  border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-color: ${(props) => props.theme.border.color};

  &:last-of-type {
    border: 0;
  }
`

const CartItemImage = styled(BgImage)`
  position: relative;
  width: 6rem;
  min-width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const CartItemInfo = styled.span`
  display: block;
  flex-grow: 1;
  line-height: 1.3;
  padding: 0 1.75rem;
  ${(props) => (!props.showImage ? 'padding-left: 0;' : null)};

  > span {
    display: block;
    ${(props) => (props.isSoldOut ? 'opacity: 0.5;' : null)};
  }
`

const CartItemName = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CartItemSoldOut = styled.span`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.error};
  padding: 0 0 0 1rem;
`

const CartItemDescription = styled(Body)`
  margin-top: 0.3rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const CartItemMadeFor = styled.span`
  margin-top: 0.2rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.primary};
`

const CartItemDetails = styled.span`
  margin-top: 0.6rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CartItemDetailsContainer = styled.span`
  display: flex;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }

  span {
    display: block;
  }

  span + span {
    padding-left: 1rem;
  }

}
`

const CartItemDetailsPrice = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CartItemDetailsTag = styled.span`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors[props.color || 'secondary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100% !important;
    flex-shrink: 0 !important;
    padding: 0.5rem 0 0 !important;
  }
`

const CartItemNutrition = styled.span`
  display: block;
  margin: 0;

  & > span,
  button > span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const SoldOutOverlay = () => (
  <CartItemOverlay overlay="dark">
    <div>
      <p>Sold Out</p>
    </div>
  </CartItemOverlay>
)

const AllergenOverlay = () => (
  <CartItemOverlay overlay="alert">
    <div>
      <CartItemOverlayAlert>
        <span>!</span>
      </CartItemOverlayAlert>
    </div>
  </CartItemOverlay>
)

const CartItemCollapsibleView = styled.div`
  padding: 0 0 1rem;
  margin: 0 0 0;
`

const CartItemCollapsible = ({ key, show, style, children }) => {
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key={key}
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <CartItemCollapsibleView style={style}>
            {children}
          </CartItemCollapsibleView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

const CartItem = ({
  item,
  allergens = [],
  showModifiers,
  editItem,
  removeItem,
  displaySettings,
  hidePrice = false,
  children,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
    modifierImage: showImage = true,
    modifierDescription: showDescription = true,
  } = displaySettings
  const hasCals = showCals && item.cals ? true : false
  const hasIngredients = item.ingredients && item.ingredients.length > 0
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const desc = showModifiers
    ? makeModifierNames(item)
    : showDescription && item.description
  const price = editItem || showModifiers ? item.totalPrice : item.price
  const madeFor = editItem || showModifiers ? item.madeFor : null
  const itemAllergens = item.allergens.length
    ? item.allergens.filter((allergen) => allergens.includes(allergen))
    : []
  const allergenAlert = itemAllergens.length > 0

  const toggleShowInfo = () => {
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
  }

  const toggleShowIngredients = () => {
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
  }

  return (
    <>
      <CartItemView>
        {showImage && (
          <CartItemImage as="span" style={bgStyle}>
            {item.isSoldOut ? (
              <SoldOutOverlay />
            ) : allergenAlert ? (
              <AllergenOverlay />
            ) : null}
          </CartItemImage>
        )}
        <CartItemInfo showImage={showImage} isSoldOut={item.isSoldOut}>
          <CartItemName>
            {item.name}
            {!editItem && !showImage && item.isSoldOut && (
              <CartItemSoldOut>Sold Out</CartItemSoldOut>
            )}
          </CartItemName>
          {desc && <CartItemDescription>{desc}</CartItemDescription>}
          {madeFor && (
            <CartItemMadeFor>
              For <span>{madeFor}</span>
            </CartItemMadeFor>
          )}
          <CartItemDetails>
            <CartItemDetailsContainer>
              {!hidePrice && (
                <CartItemDetailsPrice>
                  ${displayPrice(price)}
                </CartItemDetailsPrice>
              )}
              {editItem ? (
                <>
                  <span>
                    <ButtonLink onClick={editItem}>edit</ButtonLink>
                  </span>
                  <span>
                    <ButtonLink onClick={removeItem}>remove</ButtonLink>
                  </span>
                </>
              ) : (
                <>
                  {showCals && item.cals ? <span>{item.cals} cal</span> : null}
                  {showAllergens && item.allergens.length > 0 && (
                    <CartItemDetailsTag color="alert">
                      {item.allergens.join(', ')}
                    </CartItemDetailsTag>
                  )}
                  {showTags && item.tags.length > 0 && (
                    <CartItemDetailsTag>
                      {item.tags.join(', ')}
                    </CartItemDetailsTag>
                  )}
                </>
              )}
            </CartItemDetailsContainer>
          </CartItemDetails>
          {!editItem && (hasCals || hasIngredients) && (
            <CartItemNutrition>
              {hasCals && (
                <ButtonLink onClick={toggleShowInfo}>
                  <span>{!showInfo ? 'show' : 'hide'} nutritional info</span>
                </ButtonLink>
              )}
              {hasCals && hasIngredients ? <span>{' | '}</span> : null}
              {hasIngredients && (
                <ButtonLink onClick={toggleShowIngredients}>
                  <span>{!showIngredients ? 'show' : 'hide'} ingredients</span>
                </ButtonLink>
              )}
            </CartItemNutrition>
          )}
        </CartItemInfo>
        <span>{children}</span>
      </CartItemView>
      <CartItemCollapsible key="nutritionalInfo" show={showInfo}>
        <MenuItemNutrition nutritionalInfo={item.nutritionalInfo} />
      </CartItemCollapsible>
      <CartItemCollapsible key="ingredients" show={showIngredients}>
        <MenuItemIngredients ingredients={item.ingredients} />
      </CartItemCollapsible>
    </>
  )
}

CartItem.displayName = 'CartItem'
CartItem.propTypes = {
  item: propTypes.object,
  allergens: propTypes.array,
  showModifiers: propTypes.bool,
  editItem: propTypes.func,
  removeItem: propTypes.func,
  displaySettings: propTypes.object,
  hidePrice: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CartItem
