import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectCustomer,
  fetchCustomerCommunicationPreferences,
  selectCustomerCommunicationPreferences,
} from '@open-tender/redux'
import { FormWrapper, CommunicationPreferences } from '@open-tender/components'
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

const config = {
  title: 'Communication Preferences',
  subtitle: "Please let us know how you'd like to be contacted",
}

const CommsPrefs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  // const { profile: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const {
    entities: prefs,
    loading,
    error,
  } = useSelector(selectCustomerCommunicationPreferences)
  console.log(prefs)
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  // const update = useCallback(
  //   (data) => dispatch(updateCustomer(data)),
  //   [dispatch]
  // )

  useEffect(() => {
    if (!auth) return history.push('/account')
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
            {isLoading ? (
              <PageContent>
                <Loading text="Retrieving your profile & preferences..." />
              </PageContent>
            ) : errMsg ? (
              <PageContent>
                <p>{errMsg}</p>
              </PageContent>
            ) : (
              <FormWrapper>
                <CommunicationPreferences prefs={prefs} />
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
