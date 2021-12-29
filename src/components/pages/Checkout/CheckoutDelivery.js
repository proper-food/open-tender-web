import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectOrder } from '@open-tender/redux'
import { makeRequestedAtStr, timezoneMap } from '@open-tender/js'
import { ButtonLink, Heading } from '@open-tender/components'

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
  const { timezone, first_times } = revenueCenter || {}
  const firstTime = first_times ? first_times['DELIVERY'] : {}
  const tz = timezone ? timezoneMap[timezone] : null
  const requestedTime = tz ? makeRequestedAtStr(requestedAt, tz, true) : null
  const isAsap = requestedTime === 'ASAP'
  const waitTime = isAsap ? firstTime.wait_minutes || null : null
  const orderTime = isAsap
    ? `Deliver ASAP (about ${waitTime} mins)`
    : requestedTime

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
      <Heading as="p">{street}</Heading>
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
