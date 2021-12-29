import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCheckout, selectGroupOrder } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import { isMobile } from 'react-device-detect'

import { Cart, Menu, Reopen } from '../../buttons'
import { Header } from '../..'

const CheckoutHeaderView = styled('div')`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  height: ${(props) => props.theme.layout.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
    padding: ${(props) =>
      props.isMobile ? '0' : props.theme.layout.paddingMobile};
  }
`

const CheckoutHeader = () => {
  const { cartId } = useSelector(selectGroupOrder)
  const { check } = useSelector(selectCheckout)
  const amount = check ? formatDollars(check.totals.total) : ''

  return isMobile ? (
    <Header
      title={`Checkout ${amount}`}
      left={cartId ? <Reopen /> : <Menu />}
      right={<Cart />}
    />
  ) : (
    <CheckoutHeaderView isMobile={isMobile}>
      {cartId ? <Reopen /> : <Menu />}
    </CheckoutHeaderView>
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {}

export default CheckoutHeader
