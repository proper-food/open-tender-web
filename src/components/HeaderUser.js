import React from 'react'
import propTypes from 'prop-types'

import { Header } from '.'
import { AccountHome, NavMenu, OrderNow } from './buttons'

const HeaderUser = ({ maxWidth = '100%', title, bgColor, borderColor }) => {
  return (
    <Header
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={<AccountHome />}
      right={
        <>
          <OrderNow />
          <NavMenu />
        </>
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
