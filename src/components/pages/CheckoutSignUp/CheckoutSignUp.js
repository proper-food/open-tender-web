import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Helmet from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkout,
  resetSignUp,
  selectCheckout,
  selectCustomer,
  selectGuest,
  selectSignUp,
  signUpCustomer,
  updateForm,
} from '@open-tender/redux'
import {
  ButtonLink,
  FormWrapper,
  SignUpGuestForm,
} from '@open-tender/components'

import { selectBrand } from '../../../slices'
import { Content, Header, Main, PageContainer, PageTitle } from '../..'
import { Back } from '../../buttons'

const defaultText = {
  title: 'Sign up or checkout as a guest',
  subtitle:
    'Looks like you already have an account. Please enter your password below.',
}

const CheckoutSignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { form } = useSelector(selectCheckout)
  const { email } = useSelector(selectGuest)
  const { loading, error } = useSelector(selectSignUp)
  const { auth } = useSelector(selectCustomer)

  const signUp = useCallback(
    (data) => dispatch(signUpCustomer(data)),
    [dispatch]
  )

  const submitGuest = useCallback(
    (data) => {
      dispatch(resetSignUp())
      dispatch(updateForm({ customer: data }))
      history.push('/checkout')
    },
    [dispatch, history]
  )

  const changeEmail = () => {
    history.push('/checkout/guest')
  }

  useEffect(() => {
    if (auth) {
      dispatch(checkout())
      history.push('/checkout')
    }
  }, [auth, dispatch, history])

  return (
    <>
      <Helmet>
        <title>Checkout Sign Up | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header left={<Back text="Change Email" onClick={changeEmail} />} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...defaultText}>
              <div style={{ margin: '1rem 0 2rem' }}>
                <p>
                  <ButtonLink onClick={changeEmail}>
                    Or go back & enter a different email address
                  </ButtonLink>
                </p>
              </div>
            </PageTitle>
            <FormWrapper>
              <SignUpGuestForm
                email={email}
                guest={form.customer}
                loading={loading}
                error={error}
                signUp={signUp}
                submitGuest={submitGuest}
                hasThanx={has_thanx}
              />
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutSignIn.displayName = 'CheckoutSignIn'
export default CheckoutSignIn
