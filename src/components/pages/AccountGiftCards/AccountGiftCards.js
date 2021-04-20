import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectCustomerGiftCards,
  fetchCustomerGiftCards,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { openModal, selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  HeaderUser,
  Loading,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  PageTitleButtons,
  AccountBack,
} from '../..'
import GiftCardsList from './GiftCardsList'
import AccountTabs from '../Account/AccountTabs'

const AccountGiftCards = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { entities, loading } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerGiftCards())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.giftCards.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderUser title={isBrowser ? null : 'Gift Cards'} />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config.giftCards} preface={<AccountBack />}>
              <PageTitleButtons>
                <ButtonStyled onClick={() => history.push('/gift-cards')}>
                  Buy Gift Cards For Others
                </ButtonStyled>
                <ButtonStyled
                  onClick={() => dispatch(openModal({ type: 'giftCard' }))}
                  color="secondary"
                >
                  Buy a New Gift Card
                </ButtonStyled>
                <ButtonStyled
                  onClick={() =>
                    dispatch(openModal({ type: 'giftCardAssign' }))
                  }
                  color="secondary"
                >
                  Add Gift Card To Account
                </ButtonStyled>
              </PageTitleButtons>
            </PageTitle>
            {entities.length ? (
              <>
                <GiftCardsList giftCards={entities} isLoading={isLoading} />
                <PageContent>
                  <AccountBack />
                </PageContent>
              </>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your gift cards..." />
                ) : (
                  <p>{config.giftCards.empty}</p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
