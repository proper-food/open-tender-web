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
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import {
  AccountBack,
  Content,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'

const defaultPrefs = [
  { notification_area: 'ORDER', notification_channel: 'EMAIL' },
  { notification_area: 'ORDER', notification_channel: 'SMS' },
  { notification_area: 'RATING', notification_channel: 'EMAIL' },
  { notification_area: 'MARKETING', notification_channel: 'EMAIL' },
]

const CommsPrefsDefaults = styled.div`
  margin: 2rem 0;
  text-align: center;
`

const CommsPrefs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [hasLoaded, setHasLoaded] = useState(false)
  const { title: siteTitle } = useSelector(selectBrand)
  const { communicationPreferences: config } = useSelector(selectConfig)
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
    if (!auth) return history.push('/account')
    if (isSet) {
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

  return (
    <>
      <Helmet>
        <title>Communication Preferences | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '72rem' }}>
            <PageTitle {...config} preface={<AccountBack />} />
            {!hasLoaded && isLoading ? (
              <PageContent>
                <Loading text="Retrieving your communication preferences..." />
              </PageContent>
            ) : errMsg ? (
              <PageContent>
                <p>{errMsg}</p>
              </PageContent>
            ) : (
              <>
                {isNew && (
                  <CommsPrefsDefaults>
                    <Message color="alert" as="p" size="small">
                      Communication preferences have been set to the defaults.
                      Please adjust below as you would like.
                    </Message>
                  </CommsPrefsDefaults>
                )}
                <FormWrapper>
                  <CommunicationPreferences
                    prefs={prefs}
                    add={add}
                    remove={remove}
                  />
                </FormWrapper>
              </>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CommsPrefs.displayName = 'CommsPrefs'
export default CommsPrefs
