import propTypes from 'prop-types'
import { Header } from '.'
import { AccountSettings, NavMenu, OrderNow } from './buttons'

const HeaderUser = ({ maxWidth = '100%' }) => {
  return (
    <Header
      maxWidth={maxWidth}
      left={<AccountSettings />}
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
}

export default HeaderUser
