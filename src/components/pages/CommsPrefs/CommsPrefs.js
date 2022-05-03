import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  addCustomerCommunicationPreference,
  selectCustomer,
  fetchCustomerCommunicationPreferences,
  removeCustomerCommunicationPreference,
  selectCustomerCommunicationPreferences,
} from '@open-tender/redux'
import { FormWrapper, CommunicationPreferences } from '@open-tender/components'
import { Helmet } from 'react-helmet'

import { selectBrand } from '../../../slices'
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

const config = {
  title: 'Communication Preferences',
  subtitle: "Please let us know how you'd like to be contacted",
}

const CommsPrefs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [hasLoaded, setHasLoaded] = useState(false)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
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
    setHasLoaded(true)
    dispatch(fetchCustomerCommunicationPreferences())
  }, [auth, history, dispatch])

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
                <Loading text="Retrieving your profile & preferences..." />
              </PageContent>
            ) : errMsg ? (
              <PageContent>
                <p>{errMsg}</p>
              </PageContent>
            ) : (
              <FormWrapper>
                <CommunicationPreferences
                  prefs={prefs}
                  add={add}
                  remove={remove}
                />
              </FormWrapper>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CommsPrefs.displayName = 'CommsPrefs'
export default CommsPrefs
