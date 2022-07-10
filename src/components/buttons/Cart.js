import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ShoppingBag } from 'react-feather'
import styled from '@emotion/styled'
import { selectOrder, selectCartQuantity } from '@open-tender/redux'
import { contains } from '@open-tender/js'
import { ButtonIcon } from '@open-tender/components'
import { useTheme } from '@emotion/react'
import { toggleSidebar } from '../../slices'

const CartIcon = styled('div')`
  position: relative;
  margin: 0 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -0.5rem 0 0.5rem;
  }

  button {
    margin: -0.2rem 0 0;

    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.colors.primary};
  }
`

const CartCount = styled.div`
  position: absolute;
  z-index: 1;
  top: 0.5rem;
  right: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.2rem;
  padding-bottom: 0.1rem;
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  color: ${(props) => props.theme.counts.alerts.color};
  background-color: ${(props) => props.theme.counts.alerts.bgColor};
`

const Cart = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const theme = useTheme()
  const { pathname } = useLocation()
  const cartQuantity = useSelector(selectCartQuantity)
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType } = currentOrder
  // const { entities: orders } = useSelector(selectCustomerOrders)
  // const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  const isCurrentOrder = revenueCenter && serviceType && cartQuantity > 0
  const fill = isCurrentOrder
    ? theme.buttons.colors.cart.bgColor
    : 'transparent'
  // const showMenu = revenueCenter && (lastOrder || isCurrentOrder)
  // const isItem = pathname.includes('/item/')
  const hideCart = contains(pathname, ['/item/', 'review'])
  const showCart =
    (isCurrentOrder || contains(pathname, ['menu', 'checkout'])) && !hideCart

  // const order = () => {
  //   const path = showMenu
  //     ? `/menu/${revenueCenter.slug}`
  //     : pathname === '/account'
  //     ? '/order-type'
  //     : '/account'
  //   navigate(path)
  // }

  return showCart ? (
    <CartIcon>
      {cartQuantity > 0 && <CartCount>{cartQuantity}</CartCount>}
      <ButtonIcon
        label={`Cart with ${cartQuantity} items`}
        onClick={() => dispatch(toggleSidebar())}
        size={isBrowser ? 24 : 24}
      >
        <ShoppingBag size={null} strokeWidth={1} fill={fill} />
      </ButtonIcon>
    </CartIcon>
  ) : null
}

Cart.displayName = 'Cart'

export default Cart
