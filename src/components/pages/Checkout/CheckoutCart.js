import { useDispatch, useSelector } from 'react-redux'
import {
  resetTip,
  selectCheckout,
  selectOrder,
  validateOrder,
} from '@open-tender/redux'
import styled from '@emotion/styled'
import { ButtonLink, CartSummary, CheckSummary } from '@open-tender/components'

import { toggleSidebar, selectSidebar } from '../../../slices'
import { Loading } from '../..'
import { useEffect } from 'react'

const CheckoutCartView = styled('div')``

const CheckoutCartEdit = styled('div')`
  width: 100%;
  padding: ${(props) => props.theme.layout.padding} 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: block;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) => props.theme.links.dark.color};
    padding: 0 0 0.2rem;
    border-bottom: 0.1rem solid ${(props) => props.theme.colors.primary};

    &:hover,
    &:active {
      color: ${(props) => props.theme.links.dark.hover};
      border-color: ${(props) => props.theme.links.dark.hover};
    }
  }
`

const CheckoutCart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector(selectOrder)
  const { isOpen } = useSelector(selectSidebar)
  const { check, form, loading } = useSelector(selectCheckout)

  const editCart = () => {
    dispatch(toggleSidebar())
  }

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetTip())
      dispatch(validateOrder())
    }
  }, [dispatch, isOpen])

  return (
    <CheckoutCartView>
      <CartSummary cart={cart} />
      {check && (
        <CheckSummary
          check={check}
          tenders={form.tenders}
          updating={loading === 'pending'}
          loader={<Loading />}
        />
      )}
      <CheckoutCartEdit>
        <ButtonLink onClick={editCart}>Edit Cart</ButtonLink>
      </CheckoutCartEdit>
    </CheckoutCartView>
  )
}

CheckoutCart.displayName = 'CheckoutCart'
export default CheckoutCart
