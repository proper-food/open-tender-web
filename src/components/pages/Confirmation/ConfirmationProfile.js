import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer, updateCustomer } from '@open-tender/redux'
import {
  FormHeader,
  FormWrapper,
  Heading,
  Message,
  ProfileForm,
} from '@open-tender/components'

import { selectOptIns } from '../../../slices'
import { Loading } from '../..'

const ConfirmationProfile = () => {
  const dispatch = useDispatch()
  const optIns = useSelector(selectOptIns)
  const { profile, loading, error } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (data) => dispatch(updateCustomer(data)),
    [dispatch]
  )

  return isLoading ? (
    <Loading text="Checking your account..." />
  ) : errMsg ? (
    <Message color="error" style={{ width: '100%' }}>
      {errMsg}
    </Message>
  ) : (
    <FormWrapper style={{ textAlign: 'left' }}>
      <FormHeader>
        <p>
          <Heading>Update your communication preferences</Heading>
        </p>
        <p>Please let us know how you'd like to hear from us</p>
      </FormHeader>
      <ProfileForm
        profile={profile}
        loading={loading}
        error={error}
        update={update}
        optIns={optIns}
        showFields={false}
        id="comms-form"
        buttonText="Set Preferences"
      />
    </FormWrapper>
  )
}

ConfirmationProfile.displayName = 'ConfirmationProfile'
export default ConfirmationProfile
