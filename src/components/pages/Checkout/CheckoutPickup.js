import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectOrder } from '@open-tender/redux'
import { makeRequestedAtStr, timezoneMap } from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'
import { openModal } from '../../../slices'

const CheckoutPickup = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { orderType, requestedAt, revenueCenter, serviceType } =
    useSelector(selectOrder)
  const { name, address } = revenueCenter
  // const { street, city, state, postal_code } = address
  // const addressLine2 = `${city}, ${state} ${postal_code}`
  const { timezone } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : null
  const requestedTime = tz ? makeRequestedAtStr(requestedAt, tz, true) : null

  const changeLocation = () => {
    history.push('/locations')
  }

  const adjustTime = () => {
    const args = {
      focusFirst: true,
      skipClose: true,
      revenueCenter,
      serviceType,
      orderType,
      requestedAt,
    }
    dispatch(openModal({ type: 'requestedAt', args }))
  }

  return (
    <CheckoutSection>
      <h4>Pick-up Location & Time</h4>
      <p>{name}</p>
      <p>{address.street}</p>
      {/* <p>{addressLine2}</p> */}
      <p>Pick-up Time: {requestedTime}</p>
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={changeLocation}>Change location</ButtonLink> or{' '}
          <ButtonLink onClick={adjustTime}>adjust pick-up time</ButtonLink>
        </p>
      </CheckoutSectionFootnote>
    </CheckoutSection>
  )
}

CheckoutPickup.displayName = 'CheckoutPickup'
CheckoutPickup.propTypes = {}

export default CheckoutPickup
