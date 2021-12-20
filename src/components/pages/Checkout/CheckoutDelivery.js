import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectOrder } from '@open-tender/redux'
import { makeRequestedAtStr, timezoneMap } from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'
import { openModal } from '../../../slices'

const CheckoutDelivery = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { address, orderType, requestedAt, revenueCenter, serviceType } =
    useSelector(selectOrder)
  const { street, city, state, postal_code } = address || {}
  const addressLine2 = `${city}, ${state} ${postal_code}`
  const { timezone } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : null
  const requestedTime = tz ? makeRequestedAtStr(requestedAt, tz, true) : null
  const orderTime = requestedTime === 'ASAP' ? 'Deliver ASAP' : requestedTime

  const changeAddress = () => {
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
    <CheckoutSection title="Delivery Address & Time">
      <p>{street}</p>
      <p>{addressLine2}</p>
      <p>{orderTime}</p>
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={changeAddress}>Change address</ButtonLink> or{' '}
          <ButtonLink onClick={adjustTime}>adjust delivery time</ButtonLink>
        </p>
      </CheckoutSectionFootnote>
    </CheckoutSection>
  )
}

CheckoutDelivery.displayName = 'CheckoutDelivery'
CheckoutDelivery.propTypes = {}

export default CheckoutDelivery
