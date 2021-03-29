import React, { useCallback, useContext, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DonationForm } from '@open-tender/components'
import {
  selectDonation,
  resetDonation,
  purchaseDonation,
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCardsForPayment,
  setAlert,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
} from '../..'

const Donations = () => {
  const dispatch = useDispatch()
  const { donations: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const creditCards = useSelector(selectCustomerCreditCardsForPayment)
  const { success, loading, error, donation } = useSelector(selectDonation)
  const { windowRef } = useContext(AppContext)
  const purchase = useCallback(
    (data, callback) => dispatch(purchaseDonation(data, callback)),
    [dispatch]
  )
  const reset = useCallback(() => dispatch(resetDonation()), [dispatch])
  const showAlert = useCallback((obj) => dispatch(setAlert(obj)), [dispatch])
  // console.log(process.env.REACT_APP_RECAPTCHA_KEY)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    return () => dispatch(resetDonation())
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch, customer])

  // const handlePurchase = (data, callback) => {
  //   window.grecaptcha.ready(() => {
  //     window.grecaptcha
  //       .execute(process.env.REACT_APP_RECAPTCHA_KEY, { action: 'submit' })
  //       .then((token) => {
  //         console.log(token)
  //         const dataWithToken = { ...data, token }
  //         dispatch(purchaseDonation(dataWithToken, callback))
  //       })
  //   })
  // }

  // const handlePurchase = (data, callback) => {
  //   const token = window.grecaptcha.getResponse()
  //   console.log(token)
  //   const dataWithToken = { ...data, token }
  //   dispatch(purchaseDonation(dataWithToken, callback))
  // }

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : config.title} />
        <Main>
          <Container>
            <PageTitle {...config} />
            <PageContent>
              <DonationForm
                customer={customer}
                creditCards={creditCards}
                purchase={purchase}
                reset={reset}
                setAlert={showAlert}
                success={success}
                donation={donation}
                loading={loading}
                error={error}
                windowRef={windowRef}
                recaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
              />
              {success && (
                <p>
                  {customer ? (
                    <Link to="/account">Head back to your account page</Link>
                  ) : (
                    <Link to="/">
                      Head back to the home page to start an order
                    </Link>
                  )}
                </p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Donations.displayName = 'Donations'
export default Donations
