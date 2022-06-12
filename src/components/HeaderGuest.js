import propTypes from 'prop-types'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { selectContentSection } from '../slices'
import { Header, HeaderLogo } from '.'
import { AccountHome, AccountSettings, NavMenu, OrderNow } from './buttons'

const HeaderGuest = ({ maxWidth = '76.8rem' }) => {
  const { auth } = useSelector(selectCustomer)
  const { displayLogo, displayLogoMobile } = useSelector(
    selectContentSection('guest')
  )
  const showLogo = isMobileOnly ? displayLogoMobile : displayLogo

  return (
    <Header
      maxWidth={maxWidth}
      left={auth ? <AccountHome /> : <AccountSettings />}
      title={showLogo ? <HeaderLogo /> : null}
      right={
        <>
          <OrderNow />
          <NavMenu />
        </>
      }
    />
  )
}

HeaderGuest.displayName = 'HeaderGuest'
HeaderGuest.propTypes = {
  maxWidth: propTypes.string,
}

export default HeaderGuest
