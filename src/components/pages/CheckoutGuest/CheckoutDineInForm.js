import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  resetGuest,
  selectCheckout,
  selectCustomer,
  updateForm,
} from '@open-tender/redux'
import { DineInForm, FormWrapper } from '@open-tender/components'

import { PageTitle } from '../..'

const CheckoutGuest = () => {
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
    <>
      <PageTitle title="Please add a name for your order" />
      <FormWrapper>
        <DineInForm
          initialData={initialData}
          submitGuest={submitGuest}
          submitText="Continue"
        />
      </FormWrapper>
    </>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'
export default CheckoutGuest
