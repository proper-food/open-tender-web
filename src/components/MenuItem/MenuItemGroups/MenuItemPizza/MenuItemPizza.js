import { useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuItemPizzaWhole from './MenuItemPizzaWhole'
import MenuItemPizzaLeft from './MenuItemPizzaLeft'
import MenuItemPizzaRight from './MenuItemPizzaRight'
// import { Minus, Plus, X } from './icons'

const MenuItemPizzaView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const nestedMap = {
  LEFT: '1st Half',
  RIGHT: '2nd Half',
  WHOLE: 'Whole Pizza',
}

const makeNestedLookup = (options) => {
  return Object.entries(nestedMap).reduce((obj, [k, v]) => {
    const option = options.find((i) => i.name === v)
    if (!option) return obj
    return { ...obj, [k]: option.id }
  }, {})
}

const MenuItemPizza = ({ option, adjust }) => {
  const [toggle, setToggle] = useState(null)
  const pizzaGroup = option.groups.find((g) => g.isPizza)
  if (!pizzaGroup) return null
  const groupId = pizzaGroup.id
  const nestedLookup = makeNestedLookup(pizzaGroup.options)

  const toggleOption = (arg) => {
    // TODO: need to set other quantities to 0
    const optionId = nestedLookup[arg]
    if (arg === toggle) {
      const nested = { groupId, optionId, quantity: 0 }
      adjust(0, nested)
      setToggle(null)
    } else {
      const nested = { groupId, optionId, quantity: 1 }
      adjust(1, nested)
      setToggle(arg)
    }
  }

  return (
    <MenuItemPizzaView>
      <MenuItemPizzaLeft
        onClick={() => toggleOption('LEFT')}
        isSelected={toggle === 'LEFT'}
      />
      <MenuItemPizzaWhole
        onClick={() => toggleOption('WHOLE')}
        isSelected={toggle === 'WHOLE'}
      />
      <MenuItemPizzaRight
        onClick={() => toggleOption('RIGHT')}
        isSelected={toggle === 'RIGHT'}
      />
    </MenuItemPizzaView>
  )
}

MenuItemPizza.displayName = 'MenuItemPizza'
MenuItemPizza.propTypes = {
  item: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  incrementDisabled: propTypes.bool,
  decrementDisabled: propTypes.bool,
  showAdd: propTypes.bool,
}

export default MenuItemPizza
