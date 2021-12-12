import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { deviceType } from 'react-device-detect'
import {
  selectCustomer,
  selectCartTotal,
  selectMenuSlug,
  selectOrder,
  selectCheckout,
  resetErrors,
  resetTip,
  setSubmitting,
  setDeviceType,
} from '@open-tender/redux'
import { isEmpty } from '@open-tender/js'
import { FormError } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import { Content, Main, PageTitle } from '../..'
import CheckoutCancelEdit from './CheckoutCancelEdit'
import CheckoutCustomer from './CheckoutCustomer'

const makeDeviceType = (deviceType) => {
  switch (deviceType) {
    case 'tablet':
      return 'TABLET'
    case 'mobile':
      return 'MOBILE'
    case 'browser':
      return 'DESKTOP'
    default:
      return 'DESKTOP'
  }
}

const CheckoutView = styled('div')`
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const CheckoutContent = styled('div')`
  flex: 1 1 auto;
  padding: 6rem 6rem 0 0;
`

const CheckoutSidebar = styled('div')`
  position: relative;
  flex: 0 0 48rem;
  padding: 6rem 0 0 6rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300%;
    background-color: ${(props) => props.theme.bgColors.tertiary};
  }
`

const CheckoutSidebarContent = styled('div')`
  position: relative;
  z-index: 2;
`

const Checkout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title } = useSelector(selectBrand)
  const { checkout: config } = useSelector(selectConfig)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const { serviceType, revenueCenter } = useSelector(selectOrder)
  const { revenue_center_id: revenueCenterId } = revenueCenter || {}
  const { auth } = useSelector(selectCustomer)
  const { form, errors, submitting } = useSelector(selectCheckout)
  const hasGuest = form && !isEmpty(form.customer) ? true : false
  const formError = errors ? errors.form || null : null

  const deviceTypeName = makeDeviceType(deviceType)

  useEffect(() => {
    if (!submitting && formError) window.scrollTo(0, 0)
  }, [formError, submitting])

  useEffect(() => {
    dispatch(setSubmitting(false))
    dispatch(setDeviceType(deviceTypeName))
    return () => {
      dispatch(resetErrors())
      dispatch(resetTip())
    }
  }, [dispatch, deviceTypeName])

  useEffect(() => {
    if (!revenueCenterId || !serviceType) {
      history.push('/')
    } else if (cartTotal === 0) {
      history.push(menuSlug)
    }
  }, [history, cartTotal, menuSlug, revenueCenterId, serviceType])

  useEffect(() => {
    if (!auth && !hasGuest) {
      history.push('/checkout/guest')
    }
  }, [auth, hasGuest, history])

  return (
    <>
      <Helmet>
        <title>Checkout | {title}</title>
      </Helmet>
      <Content>
        <Main bgColor="transparent" style={{ overflow: 'hidden', padding: 0 }}>
          <CheckoutView>
            <CheckoutContent>
              <PageTitle
                {...config}
                style={{ marginBottom: '0', textAlign: 'left' }}
              >
                <CheckoutCancelEdit />
              </PageTitle>
              {formError && <FormError errMsg={formError} />}
              <CheckoutCustomer errors={errors} />
            </CheckoutContent>
            <CheckoutSidebar>
              <CheckoutSidebarContent>
                <p>Sidebar goes here</p>
              </CheckoutSidebarContent>
            </CheckoutSidebar>
          </CheckoutView>
        </Main>
      </Content>
    </>
  )
}

Checkout.displayName = 'Checkout'
export default Checkout
