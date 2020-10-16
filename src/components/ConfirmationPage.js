import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetConfirmation,
  resetCustomerOrder,
  resetGroupOrder,
} from '@open-tender/redux'

import { selectConfig, selectBrand, selectOptIns } from '../slices'
import Order from './Order'
import Background from './Background'
import PageTitle from './PageTitle'
import ConfirmationProfile from './ConfirmationProfile'
import ConfirmationFulfillment from './ConfirmationFulfillment'

const ConfirmationPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const brand = useSelector(selectBrand)
  const order = useSelector(selectConfirmationOrder)
  const { auth, profile } = useSelector(selectCustomer)
  const isNew = auth && profile && profile.order_notifications === 'NEW'
  const optIns = useSelector(selectOptIns)
  const { accepts_marketing, order_notifications } = optIns
  const showOptIns = isNew && (accepts_marketing || order_notifications)

  useEffect(() => {
    if (!order) history.push(auth ? '/account' : '/')
    window.scroll(0, 0)
    dispatch(resetGroupOrder())
    return () => {
      dispatch(resetConfirmation())
    }
  }, [order, auth, dispatch, history])

  const reviewAccount = (evt) => {
    evt.preventDefault()
    dispatch(resetCustomerOrder())
    history.push('/account')
    evt.target.blur()
  }

  const startNewOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  return (
    <>
      {isBrowser && <Background imageUrl={config.confirmation.background} />}
      <div className="content">
        <PageTitle {...config.confirmation} />
        {showOptIns && <ConfirmationProfile />}
        {brand.fulfillment && <ConfirmationFulfillment />}
        <div className="slide-up">
          <div className="container">
            {auth ? (
              <p>
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={reviewAccount}
                >
                  Head back to your account
                </button>
                {' or '}
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={startNewOrder}
                >
                  start another order
                </button>
              </p>
            ) : (
              <p>
                <a
                  className="no-link"
                  href={brand.url}
                  rel="noopener noreferrer"
                >
                  Head back to our website
                </a>
                {' or '}
                <button
                  type="button"
                  className="ot-btn-link"
                  onClick={startNewOrder}
                >
                  start another order
                </button>
              </p>
            )}
          </div>
        </div>
        <Order order={order} />
      </div>
    </>
  )
}

ConfirmationPage.displayName = 'ConfirmationPage'
export default ConfirmationPage
