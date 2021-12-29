import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { toggleSidebar } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Cart = () => {
  const dispatch = useDispatch()

  return (
    <ButtonBoth
      text="View Cart"
      label="View Cart"
      icon={iconMap.ShoppingBag}
      onClick={() => dispatch(toggleSidebar())}
    />
  )
}

Cart.displayName = 'Cart'
Cart.propTypes = {
  toggleCart: propTypes.func,
}

export default Cart
