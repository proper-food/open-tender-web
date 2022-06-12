import React from 'react'
import propTypes from 'prop-types'

import { Header } from '.'
import { AccountHome, NavMenu } from './buttons'

const HeaderDefault = ({ maxWidth = '100%' }) => {
  return (
    <Header maxWidth={maxWidth} left={<AccountHome />} right={<NavMenu />} />
  )
}

HeaderDefault.displayName = 'HeaderDefault'
HeaderDefault.propTypes = {
  maxWidth: propTypes.string,
}

export default HeaderDefault
