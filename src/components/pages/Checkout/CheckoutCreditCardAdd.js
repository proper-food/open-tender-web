import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { validateOrder } from '@open-tender/redux'

import { openModal } from '../../../slices'
import { cardIconMap } from '../../../assets/cardIcons'
import CheckoutButton from './CheckoutButton'

const CheckoutCreditCardAdd = ({ isPaid }) => {
  const dispatch = useDispatch()

  const onClick = (evt) => {
    evt.preventDefault()
    const args = { callback: () => dispatch(validateOrder()) }
    dispatch(openModal({ type: 'creditCard', args }))
  }

  return (
    <CheckoutButton
      icon={<img src={cardIconMap['OTHER']} alt="New Credit Card" />}
      title="Add new credit card"
      onPress={onClick}
      isApplied={false}
      disabled={isPaid}
      applyText="Add"
    />
  )
}

CheckoutCreditCardAdd.displayName = 'CheckoutCreditCardAdd'
CheckoutCreditCardAdd.propTypes = {
  isPaid: propTypes.bool,
}

export default CheckoutCreditCardAdd
