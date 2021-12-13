import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router'
import { selectOrder } from '@open-tender/redux'

import CheckoutSection from './CheckoutSection'

const CheckoutDelivery = () => {
  const { address } = useSelector(selectOrder)
  const { street, city, state, postal_code } = address || {}
  const addressLine2 = `${city}, ${state} ${postal_code}`

  // const updateInfo = () => {
  //   history.push('/checkout/signup')
  // }

  return (
    <CheckoutSection>
      <h4>Delivery Details</h4>
      <p>{street}</p>
      <p>{addressLine2}</p>
    </CheckoutSection>
  )
}

CheckoutDelivery.displayName = 'CheckoutDelivery'
CheckoutDelivery.propTypes = {}

export default CheckoutDelivery
