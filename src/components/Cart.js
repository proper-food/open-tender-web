import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Minus } from 'react-feather'
import {
  setCurrentItem,
  incrementItemInCart,
  decrementItemInCart,
  selectCart,
  removeItemFromCart,
  selectMenuSlug,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { CartItem, BuilderQuantity } from '@open-tender/components'

import {
  openModal,
  selectDisplaySettings,
  setTopOffset,
  toggleSidebar,
  toggleSidebarModal,
} from '../slices'
import { useHistory } from 'react-router-dom'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const Cart = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector(selectCart)
  const menuSlug = useSelector(selectMenuSlug)
  const displaySettings = useSelector(selectDisplaySettings)
  const { builderType } = displaySettings
  const cartDisplaySettings = { ...displaySettings, modifierImage: true }

  const editItem = (item) => {
    dispatch(setCurrentItem(item))
    if (builderType === 'PAGE') {
      dispatch(toggleSidebar())
      const mainElement = document.getElementById('main')
      const mainOffset = mainElement.getBoundingClientRect().top
      dispatch(setTopOffset(-mainOffset))
      history.push(`${menuSlug}/item/${slugify(item.name)}`)
    } else if (builderType === 'SIDEBAR') {
      dispatch(toggleSidebarModal())
    } else {
      dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
    }
  }

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item))
  }

  return cart && cart.length ? (
    <ul>
      {cart.map((item, index) => {
        return (
          <li key={`${item.id}-${index}`}>
            <CartItem
              item={item}
              showModifiers={true}
              editItem={() => editItem(item)}
              removeItem={() => removeItem(item)}
              displaySettings={cartDisplaySettings}
            >
              <BuilderQuantity
                item={item}
                adjust={null}
                increment={() => dispatch(incrementItemInCart(item))}
                decrement={() => dispatch(decrementItemInCart(item))}
                incrementDisabled={item.quantity === item.max}
                decrementDisabled={false}
                iconMap={iconMap}
              />
            </CartItem>
          </li>
        )
      })}
    </ul>
  ) : null
}

Cart.displayName = 'Cart'

export default Cart
