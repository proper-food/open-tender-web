import propTypes from 'prop-types'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectContentSection } from '../slices'
import { Header, HeaderLogo } from '.'
import { Cart, NavMenu, User } from './buttons'

const HeaderGuest = ({ maxWidth = '76.8rem' }) => {
  const { displayLogo, displayLogoMobile } = useSelector(
    selectContentSection('guest')
  )
  const showLogo = isMobileOnly ? displayLogoMobile : displayLogo

  return (
    <Header
      maxWidth={maxWidth}
      left={<User />}
      title={showLogo ? <HeaderLogo /> : null}
      right={
        <>
          <Cart />
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
