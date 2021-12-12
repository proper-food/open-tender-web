import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  loginCustomer,
  selectCustomer,
  selectGuest,
} from '@open-tender/redux'
import { ButtonLink, FormWrapper, SignInForm } from '@open-tender/components'
import Helmet from 'react-helmet'

import { selectBrand } from '../../../slices'
import { Content, Header, Main, PageContainer, PageTitle } from '../..'
import { Back } from '../../buttons'

const defaultText = {
  title: 'Sign into your account',
  subtitle:
    'Looks like you already have an account. Please enter your password below.',
}

const CheckoutSignIn = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { email } = useSelector(selectGuest)
  const { auth, loading, error } = useSelector(selectCustomer)
  const login = useCallback(
    (email, password) => dispatch(loginCustomer(email, password)),
    [dispatch]
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
        <title>Checkout Sign In | {siteTitle}</title>
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
              <SignInForm
                email={email}
                loading={loading}
                error={error}
                login={login}
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
