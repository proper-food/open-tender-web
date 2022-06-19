import propTypes from 'prop-types'
import { Header } from '.'
import { AccountSettings, NavMenu, ContinueOrder } from './buttons'

const HeaderUser = ({ maxWidth = '100%' }) => {
  return (
    <Header
      maxWidth={maxWidth}
      left={<AccountSettings />}
      right={
        <>
          <ContinueOrder />
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
