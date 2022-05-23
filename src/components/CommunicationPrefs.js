import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  addCustomerCommunicationPreference,
  fetchCustomer,
  fetchCustomerCommunicationPreferences,
  removeCustomerCommunicationPreference,
  selectCustomer,
  selectCustomerCommunicationPreferences,
  setCustomerCommunicationDefaultPreferences,
} from '@open-tender/redux'
import {
  CommunicationPreferences,
  FormWrapper,
  Message,
} from '@open-tender/components'

import Loading from './Loading'

const defaultPrefs = [
  { notification_area: 'ORDER', notification_channel: 'EMAIL' },
  { notification_area: 'ORDER', notification_channel: 'SMS' },
  { notification_area: 'RATING', notification_channel: 'EMAIL' },
  { notification_area: 'MARKETING', notification_channel: 'EMAIL' },
]

const CommunicationPrefsDefaults = styled.div`
  margin: 2rem 0;
  text-align: center;
`

const CommunicationPrefs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [hasLoaded, setHasLoaded] = useState(false)
  const { auth, profile } = useSelector(selectCustomer)
  const { is_notification_set } = profile || {}
  const [isNew, setIsNew] = useState(false)
  const [isSet, setIsSet] = useState(is_notification_set)
  const {
    entities: prefs,
    loading,
    error,
  } = useSelector(selectCustomerCommunicationPreferences)
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const add = useCallback(
    (area, channel) =>
      dispatch(addCustomerCommunicationPreference(area, channel)),
    [dispatch]
  )
  const remove = useCallback(
    (prefId) => dispatch(removeCustomerCommunicationPreference(prefId)),
    [dispatch]
  )

  useEffect(() => {
    if (auth && isSet) {
      setHasLoaded(true)
      dispatch(fetchCustomerCommunicationPreferences())
    }
  }, [auth, history, dispatch, isSet])

  useEffect(() => {
    if (!is_notification_set) {
      dispatch(setCustomerCommunicationDefaultPreferences(defaultPrefs)).then(
        () => {
          dispatch(fetchCustomer())
          setIsSet(true)
          setIsNew(true)
        }
      )
    }
  }, [dispatch, is_notification_set])

  if (!auth) return null

  return !hasLoaded && isLoading ? (
    <Loading text="Retrieving your communication preferences..." />
  ) : errMsg ? (
    <Message color="error">{errMsg}</Message>
  ) : (
    <>
      {isNew && (
        <CommunicationPrefsDefaults>
          <Message color="alert" as="p" size="small">
            Communication preferences have been set to the defaults. Please
            adjust below as you would like.
          </Message>
        </CommunicationPrefsDefaults>
      )}
      <FormWrapper>
        <CommunicationPreferences prefs={prefs} add={add} remove={remove} />
      </FormWrapper>
    </>
  )
}

CommunicationPrefs.displayName = 'CommunicationPrefs'
export default CommunicationPrefs
