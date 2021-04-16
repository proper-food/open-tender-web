import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  BuilderBody,
  BuilderFooter,
  BuilderHeader,
  BuilderOption,
  useBuilder,
} from '@open-tender/components'

import iconMap from '../../iconMap'

const footerHeight = '8rem'
const footerHeightMobile = '7rem'

const MenuItemBuilderView = styled('form')`
  position: relative;
  display: block;
  width: 50rem;
  height: 100%;
  margin: 0;
  padding: 0 0 ${footerHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 ${footerHeightMobile};
  }
`

const MenuItemBuilderContent = styled('div')`
  // width: 100%;
  // height: 100%;
  // overflow-y: scroll;
`

const MenuItemBuilderFooterContainer = styled('div')`
  // position: absolute;
  // z-index: 1;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // background-color: ${(props) => props.theme.bgColors.primary};
  height: ${footerHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: ${footerHeightMobile};
  }

  & > div {
    height: 100%;
  }
`

const MenuItemBuilder = ({
  menuItem,
  addItemToCart,
  cancel,
  soldOut,
  allergenAlerts,
  displaySettings,
  cartId,
}) => {
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut)
  const headerDisplaySettings = { ...displaySettings, showImage: false }
  return (
    <MenuItemBuilderView>
      <MenuItemBuilderContent>
        <BuilderHeader item={item} displaySettings={headerDisplaySettings} />
        <BuilderBody
          allergens={allergenAlerts}
          renderOption={(props) => <BuilderOption {...props} />}
          iconMap={iconMap}
          displaySettings={displaySettings}
          cartId={cartId}
          item={item}
          setMadeFor={setMadeFor}
          setNotes={setNotes}
          toggleOption={toggleOption}
          incrementOption={incrementOption}
          decrementOption={decrementOption}
          setOptionQuantity={setOptionQuantity}
        />
      </MenuItemBuilderContent>
      <MenuItemBuilderFooterContainer>
        <BuilderFooter
          item={item}
          iconMap={iconMap}
          addItemToCart={addItemToCart}
          setQuantity={setQuantity}
          increment={increment}
          decrement={decrement}
        />
      </MenuItemBuilderFooterContainer>
    </MenuItemBuilderView>
  )
}

MenuItemBuilder.displayName = 'MenuItemBuilder'
MenuItemBuilder.propTypes = {
  menuItem: propTypes.object,
  addItemToCart: propTypes.func,
  cancel: propTypes.func,
  soldOut: propTypes.array,
  allergenAlerts: propTypes.array,
  displaySettings: propTypes.object,
  cartId: propTypes.number,
}

export default MenuItemBuilder
