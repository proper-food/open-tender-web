import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router'
import { selectOrder } from '@open-tender/redux'

import CheckoutSection from './CheckoutSection'

const CheckoutPickup = () => {
  const { revenueCenter } = useSelector(selectOrder)
  const { name, address } = revenueCenter
  const { street, city, state, postal_code } = address
  const addressLine2 = `${city}, ${state} ${postal_code}`

  // const updateInfo = () => {
  //   history.push('/checkout/signup')
  // }

  return (
    <CheckoutSection>
      <h4>Pick-up Details</h4>
      <p>{name}</p>
      <p>{street}</p>
      <p>{addressLine2}</p>
    </CheckoutSection>
  )
}

CheckoutPickup.displayName = 'CheckoutPickup'
CheckoutPickup.propTypes = {}

export default CheckoutPickup
