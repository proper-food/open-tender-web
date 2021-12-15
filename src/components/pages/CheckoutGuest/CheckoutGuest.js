import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
import Helmet from 'react-helmet'

import { selectBrand } from '../../../slices'
import { Content, HeaderCheckout, Main, PageContainer, PageTitle } from '../..'

const defaultText = {
  title: "Let's see if you have an account",
  subtitle: 'Please enter your email address below.',
}

const CheckoutGuest = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { form } = useSelector(selectCheckout)
  const { email, loading, errors } = useSelector(selectGuest)
  const { guestIncomplete } = !auth ? checkGuestData(form.customer, email) : {}
  const errMsg = errors ? errors.email || errors.form : null
  const notFound = errMsg && errMsg.includes('not associated')
  const callback = useCallback(
    () => history.push('/checkout/signin'),
    [history]
  )
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
      history.push('/checkout')
    }
  }, [auth, guestIncomplete, dispatch, history])

  useEffect(() => {
    if (notFound) history.push('/checkout/signup')
  }, [notFound, history])

  return (
    <>
      <Helmet>
        <title>Checkout Guest | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderCheckout />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...defaultText} />
            <FormWrapper>
              <GuestForm
                email={email}
                loading={loading}
                errors={errors}
                checkGuest={checkGuest}
                submitText="Continue"
              />
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'
export default CheckoutGuest
