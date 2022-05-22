import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  About,
  Accessibility,
  AccountAddresses,
  Account,
  AccountAllergens,
  AccountCreditCards,
  AccountGiftCards,
  AccountSettings,
  Catering,
  CateringSite,
  Checkout,
  CheckoutGuest,
  CheckoutSignIn,
  CheckoutSignUp,
  CommsPrefs,
  Confirmation,
  Deals,
  Donations,
  Favorites,
  Fulfillment,
  GiftCards,
  GroupOrderGuest,
  GroupOrderReview,
  GroupOrders,
  Home,
  HouseAccounts,
  LevelUp,
  Locations,
  Loyalty,
  Menu,
  MenuItem,
  MenuSite,
  NotFound,
  Order,
  Orders,
  OrderType,
  Profile,
  QR,
  Rating,
  Refunds,
  ResetPassword,
  RevenueCenters,
  RevenueCenter,
  Rewards,
  SignUp,
  Thanx,
  VerifyAccount,
} from './pages'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/order">
        <Redirect to="/" />
      </Route>
      <Route exact path="/order/catering">
        <Redirect to="/" />
      </Route>
      <Route exact path="/levelup">
        <LevelUp />
      </Route>
      <Route exact path="/levelup/:token">
        <LevelUp />
      </Route>
      <Route exact path="/thanx/callback">
        <Thanx />
      </Route>
      <Route exact path="/qr/:id">
        <QR />
      </Route>
      <Route exact path="/order-type">
        <OrderType />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/reset-password">
        <ResetPassword />
      </Route>
      <Route exact path="/verify">
        <VerifyAccount />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/menu">
        <MenuSite />
      </Route>
      <Route exact path="/restaurants">
        <Locations />
      </Route>
      <Route exact path="/catering">
        <CateringSite />
      </Route>
      <Route exact path="/catering-address">
        <Catering />
      </Route>
      <Route exact path="/locations">
        <RevenueCenters />
      </Route>
      <Route exact path="/locations/:slug">
        <RevenueCenter />
      </Route>
      <Route exact path="/menu/:slug">
        <Menu />
      </Route>
      <Route exact path="/menu/:slug/item/:itemSlug">
        <MenuItem />
      </Route>
      <Route path="/join/:token">
        <GroupOrderGuest />
      </Route>
      <Route exact path="/review">
        <GroupOrderReview />
      </Route>
      <Route exact path="/checkout/guest">
        <CheckoutGuest />
      </Route>
      <Route exact path="/checkout/signin">
        <CheckoutSignIn />
      </Route>
      <Route exact path="/checkout/signup">
        <CheckoutSignUp />
      </Route>
      <Route exact path="/checkout">
        <Checkout />
      </Route>
      <Route exact path="/confirmation">
        <Confirmation />
      </Route>
      <Route exact path="/curbside/:id">
        <Fulfillment />
      </Route>
      <Route exact path="/ratings/:id">
        <Rating />
      </Route>
      <Route exact path="/loyalty">
        <Loyalty />
      </Route>
      <Route exact path="/rewards">
        <Rewards />
      </Route>
      <Route exact path="/favorites">
        <Favorites />
      </Route>
      <Route exact path="/orders">
        <Orders />
      </Route>
      <Route exact path="/orders/:id">
        <Order />
      </Route>
      <Route exact path="/group-orders">
        <GroupOrders />
      </Route>
      <Route exact path="/account">
        <Account />
      </Route>
      <Route exact path="/settings">
        <AccountSettings />
      </Route>
      <Route exact path="/account/settings">
        <Redirect to="/settings" />
      </Route>
      <Route exact path="/account/gift-cards">
        <AccountGiftCards />
      </Route>
      <Route exact path="/account/allergens">
        <AccountAllergens />
      </Route>
      <Route exact path="/account/credit-cards">
        <AccountCreditCards />
      </Route>
      <Route exact path="/account/addresses">
        <AccountAddresses />
      </Route>
      <Route exact path="/account/house-accounts">
        <HouseAccounts />
      </Route>
      <Route exact path="/account/profile">
        <Profile />
      </Route>
      <Route exact path="/account/communications">
        <CommsPrefs />
      </Route>
      <Route exact path="/accessibility">
        <Accessibility />
      </Route>
      <Route exact path="/refunds">
        <Refunds />
      </Route>
      <Route exact path="/gift-cards">
        <GiftCards />
      </Route>
      <Route exact path="/donations">
        <Donations />
      </Route>
      <Route exact path="/deals">
        <Deals />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
