import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { PlusCircle } from 'react-feather'
import { useDispatch } from 'react-redux'
import { validateOrder } from '@open-tender/redux'
import { openModal } from '../../../slices'
import CheckoutButton from './CheckoutButton'
import { useTheme } from '@emotion/react'

const CheckoutCreditCardAdd = ({ isPaid }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const onClick = (evt) => {
    evt.preventDefault()
    const args = { callback: () => dispatch(validateOrder()) }
    dispatch(openModal({ type: 'creditCard', args }))
  }

  return (
    <CheckoutButton
      icon={<PlusCircle color={theme.colors.primary} width={18} height={18} />}
      title="Add new credit card"
      onPress={onClick}
      isApplied={false}
      disabled={isPaid}
    />
  )
}

CheckoutCreditCardAdd.displayName = 'CheckoutCreditCardAdd'
CheckoutCreditCardAdd.propTypes = {
  isPaid: propTypes.bool,
}

export default CheckoutCreditCardAdd
