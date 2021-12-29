import { useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  resetGuest,
  selectCheckout,
  selectCustomer,
  updateForm,
} from '@open-tender/redux'
import { ButtonLink, DineInForm, FormWrapper } from '@open-tender/components'

import { openModal } from '../../../slices'
import { PageTitle } from '../..'

const CheckoutDineInFormView = styled.div`
  & > div:first-of-type h1 {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  & > div:first-of-type p {
    margin: 2rem 0 0;
  }
`

const CheckoutDineInForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { form } = useSelector(selectCheckout)
  const { first_name, last_name } = form ? form.customer : {}
  const initialData = { first_name, last_name }

  const submitGuest = useCallback(
    (data) => {
      dispatch(resetGuest())
      dispatch(updateForm(data))
      dispatch(checkout())
      history.push('/checkout')
    },
    [dispatch, history]
  )

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  useEffect(() => {
    return () => dispatch(resetGuest())
  }, [dispatch])

  useEffect(() => {
    if (auth) {
      dispatch(checkout())
      history.push('/checkout')
    }
  }, [auth, dispatch, history])

  return (
    <CheckoutDineInFormView>
      <PageTitle title="Please add a name for your order">
        <p>
          Have an account?{' '}
          <ButtonLink onClick={login}>Sign in here.</ButtonLink>
        </p>
      </PageTitle>
      <FormWrapper>
        <DineInForm
          initialData={initialData}
          submitGuest={submitGuest}
          submitText="Continue"
        />
      </FormWrapper>
    </CheckoutDineInFormView>
  )
}

CheckoutDineInForm.displayName = 'CheckoutDineInForm'
export default CheckoutDineInForm
