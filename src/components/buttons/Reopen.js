import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrder,
  setCart,
  selectGroupOrder,
  closeGroupOrder,
} from '@open-tender/redux'

import { Icon } from '.'
import { ChevronLeftCircle } from '../icons'

const Reopen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)

  const reopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      navigate('/review')
    })
  }

  return (
    <Icon margin="0 0 0 -1.25rem" onClick={reopen}>
      <ChevronLeftCircle />
    </Icon>
  )
}

Reopen.displayName = 'Reopen'
Reopen.propTypes = {}

export default Reopen
