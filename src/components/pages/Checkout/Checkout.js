import React, { useContext, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  User,
  ShoppingBag,
  Truck,
  Clock,
  MapPin,
  Navigation,
  DollarSign,
  XCircle,
  PlusCircle,
  Grid,
  CreditCard,
  Home,
  Coffee,
  Smartphone,
} from 'react-feather'
import {
  selectCustomer,
  selectCartTotal,
  selectMenuSlug,
  selectOrder,
  resetOrder,
  selectAutoSelect,
  selectCheckout,
  resetErrors,
  resetTip,
  resetCompletedOrder,
  setConfirmationOrder,
  logoutCustomer,
  setSubmitting,
} from '@open-tender/redux'
import { CheckoutForm, FormError } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { cardIconMap } from '../../../assets/cardIcons'
import { selectAPI, selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  Loading,
  Main,
  PageTitle,
  PageContent,
} from '../..'
import CheckoutHeader from './CheckoutHeader'
import CheckoutTotal from './CheckoutTotal'
import CheckoutCancelEdit from './CheckoutCancelEdit'

const Checkout = () => {
  const formRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { title, has_thanx } = brand
  const { checkout: config } = useSelector(selectConfig)
  const api = useSelector(selectAPI)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)
  const customer = useSelector(selectCustomer)
  const checkout = useSelector(selectCheckout)
  const { check, completedOrder, errors, submitting } = checkout
  const formError = errors ? errors.form || null : null
  const { sso, customer_id } = check ? check.customer || {} : {}
  const { serviceType, revenueCenter } = order
  const { revenue_center_id: revenueCenterId } = revenueCenter || {}
  const iconMap = {
    signUp: <User size={null} />,
    account: <User size={null} />,
    walkin: <Coffee size={null} />,
    pickup: <ShoppingBag size={null} />,
    delivery: <Truck size={null} />,
    requestedAt: <Clock size={null} />,
    revenueCenter: <MapPin size={null} />,
    address: <Navigation size={null} />,
    tip: <DollarSign size={null} />,
    add: <PlusCircle size={null} />,
    remove: <XCircle size={null} />,
    cash: <DollarSign size={null} />,
    credit: <CreditCard size={null} />,
    levelup: <Grid size={null} />,
    house_account: <Home size={null} />,
    apple_pay: <Smartphone size={null} />,
    google_pay: <Smartphone size={null} />,
  }
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!submitting && formError) windowRef.current.scrollTop = 0
  }, [windowRef, formError, submitting])

  useEffect(() => {
    dispatch(setSubmitting(false))
    return () => {
      dispatch(resetErrors())
      dispatch(resetTip())
    }
  }, [dispatch])

  useEffect(() => {
    if (!revenueCenterId || !serviceType) {
      return history.push('/')
    } else if (cartTotal === 0) {
      return history.push(menuSlug)
    } else if (completedOrder) {
      dispatch(setConfirmationOrder(completedOrder))
      dispatch(resetCompletedOrder())
      dispatch(resetOrder())
      return history.push('/confirmation')
    }
  }, [
    history,
    dispatch,
    cartTotal,
    menuSlug,
    revenueCenterId,
    serviceType,
    completedOrder,
  ])

  useEffect(() => {
    if (has_thanx && customer_id && sso && !sso.connected) {
      dispatch(logoutCustomer())
    }
  }, [has_thanx, customer_id, sso, dispatch])

  return (
    <>
      <Helmet>
        <title>Checkout | {title}</title>
      </Helmet>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <CheckoutHeader title={isBrowser ? null : 'Checkout'} />
        <CheckoutTotal checkout={checkout} />
        <Main style={{ padding: '12rem 0 0' }}>
          <Container>
            <PageTitle {...config} />
            <PageContent>
              <CheckoutCancelEdit />
              <div ref={formRef} style={{ margin: '0 0 4rem' }}>
                {!check ? (
                  formError ? (
                    <FormError errMsg={formError} />
                  ) : (
                    <Loading text="Calculating your check..." />
                  )
                ) : null}
                <CheckoutForm
                  dispatch={dispatch}
                  history={history}
                  iconMap={iconMap}
                  cardIconMap={cardIconMap}
                  config={config}
                  checkout={checkout}
                  order={order}
                  customer={customer}
                  autoSelect={autoSelect}
                  hasThanx={has_thanx}
                  api={api}
                  spinner={<Loading />}
                  brand={brand}
                />
              </div>
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Checkout.displayName = 'Checkout'
export default Checkout
