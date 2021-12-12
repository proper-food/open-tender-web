import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  fetchGuest,
  resetGuestErrors,
  selectCustomer,
  selectGuest,
} from '@open-tender/redux'
import { FormWrapper, GuestForm } from '@open-tender/components'
import Helmet from 'react-helmet'

import { selectBrand } from '../../../slices'
import { Content, HeaderCheckout, Main, PageContainer, PageTitle } from '../..'

const defaultText = {
  title: "Let's be quick about this",
  subtitle: 'Please enter your email address to get started',
}

const CheckoutGuest = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { email, loading, errors } = useSelector(selectGuest)
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
    if (auth) {
      dispatch(checkout())
      history.push('/checkout')
    }
  }, [auth, dispatch, history])

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
