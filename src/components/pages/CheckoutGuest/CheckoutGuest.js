import React, { useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchGuest,
  resetGuestErrors,
  selectCustomer,
  selectGuest,
} from '@open-tender/redux'
import { FormWrapper, GuestForm } from '@open-tender/components'
import Helmet from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Main, PageContainer, PageTitle } from '../..'
import CheckoutHeader from '../Checkout/CheckoutHeader'

const defaultText = {
  title: "Let's be quick about this",
  subtitle: 'Please enter your email address to get started',
}

const CheckoutGuest = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { email, loading, errors } = useSelector(selectGuest)
  const errMsg = errors ? errors.email || errors.form : null
  const notFound = errMsg && errMsg.includes('not associated')
  const callback = useCallback(() => history.push('/checkout/login'), [history])
  const checkGuest = useCallback(
    (email) => dispatch(fetchGuest(email, callback)),
    [dispatch, callback]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  useEffect(() => {
    return () => dispatch(resetGuestErrors())
  }, [dispatch])

  useEffect(() => {
    if (auth) history.push('/checkout')
  }, [auth, history])

  useEffect(() => {
    if (notFound) history.push('/checkout/signup')
  }, [notFound, history])

  return (
    <>
      <Helmet>
        <title>Checkout Guest | {siteTitle}</title>
      </Helmet>
      <Content>
        <CheckoutHeader />
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
