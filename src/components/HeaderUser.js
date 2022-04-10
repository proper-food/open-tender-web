import React from 'react'
import propTypes from 'prop-types'

import { Header } from '.'
import { NavMenu, OrderNow } from './buttons'
import { isBrowser } from 'react-device-detect'
import AccountTabs from './pages/Account/AccountTabs'
import Greeting from './Greeting'

const HeaderUser = ({ maxWidth = '100%', title, bgColor, borderColor }) => {
  return (
    <Header
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={<Greeting />}
      right={
        isBrowser ? (
          <>
            <AccountTabs />
            <OrderNow />
          </>
        ) : (
          <>
            <OrderNow />
            <NavMenu />
          </>
        )
      }
    />
  )
}

HeaderUser.displayName = 'HeaderUser'
HeaderUser.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default HeaderUser
