import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  fetchGuest,
  resetGuestErrors,
  selectCheckout,
  selectCustomer,
  selectGuest,
} from '@open-tender/redux'
import { checkGuestData } from '@open-tender/js'
import { FormWrapper, GuestForm } from '@open-tender/components'

import { selectContent } from '../../../slices'
import { PageTitle } from '../..'

const defaultText = {
  title: "Let's see if you have an account",
  subtitle: 'Please enter your email address below.',
}

const CheckoutGuestForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { checkoutFlow } = useSelector(selectContent)
  const config = checkoutFlow ? checkoutFlow.sections['email'] : defaultText
  const { auth } = useSelector(selectCustomer)
  const { form } = useSelector(selectCheckout)
  const { email, loading, errors } = useSelector(selectGuest)
  const { guestIncomplete } = !auth ? checkGuestData(form.customer, email) : {}
  const errMsg = errors ? errors.email || errors.form : null
  const notFound = errMsg && errMsg.includes('not associated')
  const callback = useCallback(() => navigate('/checkout/signin'), [navigate])
  const checkGuest = useCallback(
    (email) => dispatch(fetchGuest(email, callback)),
    [dispatch, callback]
  )

  useEffect(() => {
    return () => dispatch(resetGuestErrors())
  }, [dispatch])

  useEffect(() => {
    if (auth || !guestIncomplete) {
      dispatch(checkout())
      navigate('/checkout')
    }
  }, [auth, guestIncomplete, dispatch, navigate])

  useEffect(() => {
    if (notFound) navigate('/checkout/signup')
  }, [notFound, navigate])

  return (
    <>
      <PageTitle {...config} />
      <FormWrapper>
        <GuestForm
          email={email}
          loading={loading}
          errors={errors}
          checkGuest={checkGuest}
          submitText="Continue"
        />
      </FormWrapper>
    </>
  )
}

CheckoutGuestForm.displayName = 'CheckoutGuestForm'
export default CheckoutGuestForm
