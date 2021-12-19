import { useSelector } from 'react-redux'
import { selectOrder, selectCheckout } from '@open-tender/redux'
import styled from '@emotion/styled'
import { CartSummary, CheckSummary } from '@open-tender/components'

import { Loading } from '../..'

const CheckoutCartView = styled('div')``

// const CheckoutCartCheck = styled('div')`
//   padding: 1rem 0 0;
//   border-width: 0;
//   border-style: solid;
//   border-color: ${(props) => props.theme.border.color};
//   border-top-width: ${(props) => props.theme.border.width};
//   margin: 2.5rem 0 0;
// `

const CheckoutCart = () => {
  const { cart } = useSelector(selectOrder)
  const { check, form, loading } = useSelector(selectCheckout)

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
    </CheckoutCartView>
  )
}

CheckoutCart.displayName = 'CheckoutCart'
export default CheckoutCart
