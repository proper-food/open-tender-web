import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectGroupOrder, selectMenuSlug } from '@open-tender/redux'

import { Header } from '.'
import { Back, NavMenu, Reopen } from './buttons'

const HeaderCheckout = ({ maxWidth = '100%' }) => {
  const { cartId } = useSelector(selectGroupOrder)
  const menuSlug = useSelector(selectMenuSlug)

  return (
    <Header
      maxWidth={maxWidth}
      left={cartId ? <Reopen /> : <Back path={menuSlug} />}
      right={<NavMenu />}
    />
  )
}

HeaderCheckout.displayName = 'HeaderCheckout'
HeaderCheckout.propTypes = {
  maxWidth: propTypes.string,
}

export default HeaderCheckout
