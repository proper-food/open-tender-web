import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, setSubmitting, submitOrder } from '@open-tender/redux'
import { checkAmountRemaining, formatDollars } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'
import CheckoutSection from './CheckoutSection'

const CheckoutSubmit = () => {
  const dispatch = useDispatch()
  const { check, form, submitting, loading } = useSelector(selectCheckout)
  const updating = submitting ? false : loading === 'pending'
  const { total } = check.totals
  const amountRemaining = checkAmountRemaining(total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
  const submitDisabled = submitting || !isPaid || updating
  const hasTotal = total && parseFloat(total) >= 0 ? true : false
  const totalAmount = hasTotal ? ` ${formatDollars(total)}` : ''

  const submitPayment = () => {
    dispatch(setSubmitting(true))
    dispatch(submitOrder())
  }

  return (
    <CheckoutSection>
      <ButtonStyled
        onClick={submitPayment}
        disabled={submitDisabled}
        size="big"
        color="primary"
      >
        Submit Order{totalAmount}
      </ButtonStyled>
    </CheckoutSection>
  )
}

CheckoutSubmit.displayName = 'CheckoutSubmit'
CheckoutSubmit.propTypes = {}

export default CheckoutSubmit
