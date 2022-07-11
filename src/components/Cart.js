import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { Minus, Plus } from './icons'

const cartIconMap = {
  plus: <Plus strokeWidth={2} />,
  minus: <Minus strokeWidth={2} />,
}

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      navigate(`${menuSlug}/item/${slugify(item.name)}`)
    } else if (builderType === 'SIDEBAR') {
      dispatch(toggleSidebarModal())
    } else {
      dispatch(openModal({ type: 'item', args: { focusFirst: true } }))
    }
  }

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item))
  }

  return cart && cart.length
    ? cart.map((item, index) => {
        return (
          <CartItem
            key={`${item.id}-${index}`}
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
              iconMap={cartIconMap}
            />
          </CartItem>
        )
      })
    : null
}

Cart.displayName = 'Cart'

export default Cart
