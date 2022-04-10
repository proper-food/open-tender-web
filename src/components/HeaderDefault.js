import React from 'react'
import propTypes from 'prop-types'
import { selectCustomer } from '@open-tender/redux'

import { Header } from '.'
import { Account, AccountHome, Logout } from './buttons'
import { useSelector } from 'react-redux'

const HeaderDefault = ({
  maxWidth = '100%',
  title,
  bgColor = 'primary',
  borderColor = 'primary',
}) => {
  const { auth } = useSelector(selectCustomer)

  return (
    <Header
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={<AccountHome />}
      right={auth ? <Logout /> : <Account />}
    />
  )
}

HeaderDefault.displayName = 'HeaderDefault'
HeaderDefault.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default HeaderDefault
