import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { deviceType } from 'react-device-detect'
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
  Star,
  Heart,
  Award,
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
  setDeviceType,
} from '@open-tender/redux'
import { CheckoutForm, FormError } from '@open-tender/components'

import { cardIconMap } from '../../../assets/cardIcons'
import { selectApi, selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  Loading,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
} from '../..'
import CheckoutHeader from '../Checkout/CheckoutHeader'
// import CheckoutTotal from './CheckoutTotal'
// import CheckoutCancelEdit from './CheckoutCancelEdit'

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

const CheckoutContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.layout.navHeight}
    ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.navHeightMobile}
      ${(props) => props.theme.layout.paddingMobile} 0;
  }
`

const CheckoutReviewView = styled('div')`
  // position: relative;
  // overflow: hidden;
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    // max-width: ${(props) => props.theme.layout.maxWidth};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const CheckoutReviewContent = styled('div')`
  flex: 1 1 auto;
  padding: 6rem 6rem 0 0;
  background-color: palegreen;
`

const CheckoutReviewSidebar = styled('div')`
  // position: relative;
  // overflow: hidden;
  flex: 0 0 48rem;
  padding: 6rem 0 0 6rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  // &:after {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   z-index: -1;
  //   top: 0;
  //   left: 0;
  //   width: 300%;
  //   height: 100%;
  //   background-color: ${(props) => props.theme.bgColors.tertiary};
  // }
`

const CheckoutReview = () => {
  const formRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { title, has_thanx } = brand
  const { checkout: config } = useSelector(selectConfig)
  const api = useSelector(selectApi)
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
    points: <Star size={null} />,
    loyalty: <Heart size={null} />,
    deal: <DollarSign size={null} />,
    reward: <Award size={null} />,
  }
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
      <Content>
        <CheckoutHeader />
        {/* <CheckoutTotal checkout={checkout} /> */}
        <Main bgColor="transparent">
          <CheckoutReviewView>
            <CheckoutReviewContent>
              <p>Content goes here</p>
            </CheckoutReviewContent>
            <CheckoutReviewSidebar>
              <p>Sidebar goes here</p>
            </CheckoutReviewSidebar>
          </CheckoutReviewView>
        </Main>
      </Content>
    </>
  )
}

CheckoutReview.displayName = 'CheckoutReview'
export default CheckoutReview
