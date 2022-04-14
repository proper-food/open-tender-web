import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import Addresses from './Addresses'
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

const AccountAddresses = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { addresses: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { entities, loading } = useSelector(selectCustomerAddresses)
  const isLoading = loading === 'pending'
  const limit = 50

  useEffect(() => {
    if (!auth) return history.push('/account')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerAddresses(limit))
  }, [dispatch])

  return auth ? (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config} preface={<AccountBack />} />
            {entities.length ? (
              <>
                <Addresses addresses={entities} isLoading={isLoading} />
                <PageContent>
                  <AccountBack />
                </PageContent>
              </>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your order history..." />
                ) : (
                  <p>
                    Looks like you haven't added any addresses yet. Please place
                    an order to add one.
                  </p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

AccountAddresses.displayName = 'AccountAddresses'
export default AccountAddresses
