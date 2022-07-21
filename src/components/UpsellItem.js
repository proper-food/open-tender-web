import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { addItemToCart, showNotification } from '@open-tender/redux'
import { formatDollars, formatQuantity } from '@open-tender/js'
import { ButtonStyled, CardMenuItem, useBuilder } from '@open-tender/components'
import MenuItemButton from './MenuItemButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectDisplaySettings } from '../slices'
import { useTheme } from '@emotion/react'

const UpsellItemView = styled(CardMenuItem)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UpsellItemButtons = styled.div`
  flex-grow: 0;
  padding: ${(props) => (props.hasBox ? '0 1.1rem 1.1rem' : '0')};
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: block;
  }
`

const UpsellItemSizes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: -0.25rem -0.5rem;

  button {
    margin: 0.25rem 0.5rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
`

const UpsellItem = ({ menuItem, addCallback, showDesc = true }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const hasBox = theme.cards.menuItem.bgColor !== 'transparent'
  const [hasSize, setHasSize] = useState(false)
  const displaySettings = useSelector(selectDisplaySettings)
  const {
    menuImages: showImage,
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const { item: builtItem, toggleOption } = useBuilder(menuItem)
  /* imageUrl is menuItem.large_image_url */
  const {
    name,
    description,
    imageUrl,
    quantity,
    price,
    totalPrice,
    cals,
    totalCals,
    tags,
    allergens,
    groups,
  } = builtItem
  const desc = showDesc ? description : null
  const displayImage = showImage ? imageUrl : null
  const sizeGroup = groups.find((i) => i.isSize)
  const defaultOption = !sizeGroup
    ? null
    : sizeGroup.options.find((i) => i.isDefault) || sizeGroup.options[0]
  const currentPrice = totalPrice
    ? totalPrice
    : defaultOption
    ? defaultOption.price
    : price
  const displayPrice = formatDollars(currentPrice)
  const displayCals = showCals
    ? formatQuantity(totalPrice ? totalCals : cals)
    : null
  const displayTags = showTags ? tags : []
  const displayAllergens = showAllergens ? allergens : []
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete = totalPrice === 0 || quantity === '' || groupsBelowMin

  const add = () => {
    if (!isIncomplete) {
      dispatch(addItemToCart(builtItem))
      dispatch(showNotification(`${builtItem.name} added to cart!`))
      if (addCallback) addCallback()
    }
  }

  const addSize = (optionId) => {
    toggleOption(sizeGroup.id, optionId)
    setHasSize(true)
  }

  useEffect(() => {
    if (hasSize && !isIncomplete) {
      dispatch(addItemToCart(builtItem))
      dispatch(showNotification(`${builtItem.name} added to cart!`))
      if (addCallback) addCallback()
    }
  }, [hasSize, isIncomplete, builtItem, addCallback, dispatch])

  return (
    <UpsellItemView>
      <MenuItemButton
        onClick={null}
        disabled={true}
        imageUrl={displayImage}
        imageOverlay={null}
        name={name}
        desc={desc}
        price={displayPrice}
        cals={displayCals}
        tags={displayTags}
        allergens={displayAllergens}
      />
      <UpsellItemButtons hasBox={hasBox}>
        {!isIncomplete ? (
          <ButtonStyled onClick={add} size="small">
            Add To Order
          </ButtonStyled>
        ) : (
          <UpsellItemSizes>
            {sizeGroup.options.map((option) => (
              <ButtonStyled
                key={option.id}
                onClick={() => addSize(option.id)}
                size="small"
              >
                {option.name}
              </ButtonStyled>
            ))}
          </UpsellItemSizes>
        )}
      </UpsellItemButtons>
    </UpsellItemView>
  )
}

UpsellItem.displayName = 'UpsellItem'
UpsellItem.propTypes = {
  menuItem: propTypes.object,
  addCallback: propTypes.func,
}

export default UpsellItem
