import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  fetchAllergens,
  selectAllergens,
  selectCustomer,
  selectCustomerAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { AllergenForm, FormWrapper } from '@open-tender/components'
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
import styled from '@emotion/styled'

const AllergenFormView = styled('div')``

const AccountAllergens = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { allergens: config } = useSelector(selectConfig)
  const brandAllergens = useSelector(selectAllergens)
  const customerAllergens = useSelector(selectCustomerAllergens)
  const isLoading =
    brandAllergens.loading === 'pending' ||
    customerAllergens.loading === 'pending'
  const error = brandAllergens.error || customerAllergens.error
  const setAllergens = useCallback(
    (data) => dispatch(setSelectedAllergens(data)),
    [dispatch]
  )
  const updateAllergens = useCallback(
    (data) => dispatch(updateCustomerAllergens(data)),
    [dispatch]
  )

  useEffect(() => {
    if (!auth) return history.push('/account')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchAllergens())
  }, [dispatch])

  return (
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
            <PageContent>
              {brandAllergens.entities.length ? (
                <>
                  <FormWrapper>
                    <AllergenFormView>
                      <AllergenForm
                        allergens={brandAllergens.entities}
                        selectedAllergens={customerAllergens.entities}
                        isLoading={isLoading}
                        error={error}
                        setAllergens={setAllergens}
                        updateAllergens={updateAllergens}
                      />
                    </AllergenFormView>
                  </FormWrapper>
                  <AccountBack />
                </>
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
              ) : (
                <p>Allergens aren't currently listed on our menu.</p>
              )}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountAllergens.displayName = 'AccountAllergens'
export default AccountAllergens
