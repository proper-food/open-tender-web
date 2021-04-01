import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  addCustomerCreditCard,
  resetCustomerCreditCardsError,
  selectCustomerCreditCards,
} from '@open-tender/redux'
import { CreditCardForm } from '@open-tender/components'

import { closeModal, selectRecaptcha } from '../../slices'
import { ModalContent, ModalView } from '..'

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

const CreditCard = ({ windowRef }) => {
  const dispatch = useDispatch()
  const { addCard: includeRecaptcha } = useSelector(selectRecaptcha)
  const { loading, error } = useSelector(selectCustomerCreditCards)
  const addCard = useCallback(
    (data, callback) => dispatch(addCustomerCreditCard(data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerCreditCardsError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent
        title="Add a new credit card"
        subtitle={
          <p>
            Adding a credit card this way allows you to use it for payment on
            the checkout page and elsewhere on this website.
          </p>
        }
      >
        <CreditCardForm
          windowRef={windowRef}
          loading={loading}
          error={error}
          addCard={addCard}
          callback={callback}
          recaptchaKey={includeRecaptcha ? recaptchaKey : null}
        />
      </ModalContent>
    </ModalView>
  )
}

CreditCard.displayName = 'CreditCard'
CreditCard.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default CreditCard
