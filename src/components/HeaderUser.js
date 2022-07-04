import propTypes from 'prop-types'
import { Header } from '.'
import { Back, ContinueOrder, NavMenu } from './buttons'

const HeaderUser = ({ maxWidth = '100%' }) => {
  return (
    <Header
      maxWidth={maxWidth}
      left={<Back path="/account/settings" />}
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
