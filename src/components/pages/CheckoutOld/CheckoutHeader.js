import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectGroupOrder } from '@open-tender/redux'

import { Header } from '../..'
import { Account, CancelEdit, Menu, Reopen } from '../../buttons'
import { isBrowser } from 'react-device-detect'

const CheckoutHeader = ({ maxWidth = '100%', title, bgColor, borderColor }) => {
  const { cartId } = useSelector(selectGroupOrder)

  return (
    <Header
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={cartId ? <Reopen /> : <Menu />}
      right={
        <>
          {isBrowser ? (
            <>
              <Account />
              <CancelEdit />
            </>
          ) : (
            <Account />
          )}
        </>
      }
    />
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default CheckoutHeader
