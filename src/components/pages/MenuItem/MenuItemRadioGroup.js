import propTypes from 'prop-types'
import { CartItem } from '@open-tender/components'
import MenuItemRadio from './MenuItemRadio'

const MenuItemRadioGroup = ({ group, handler, displaySettings }) => {
  const hidePrice = group.included !== 0 && group.included === group.max
  return (
    <fieldset>
      {group.options.map((option) => (
        <CartItem
          key={`${group.id}-${option.id}`}
          item={option}
          displaySettings={displaySettings}
          hidePrice={hidePrice}
        >
          <MenuItemRadio
            key={option.id}
            option={option}
            handler={() => handler(group.id, option.id)}
          />
        </CartItem>
      ))}
    </fieldset>
  )
}

MenuItemRadioGroup.displayName = 'MenuItemRadioGroup'
MenuItemRadioGroup.propTypes = {
  group: propTypes.object,
  handler: propTypes.func,
  displaySettings: propTypes.object,
}

export default MenuItemRadioGroup
