import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
// import { isBrowser } from 'react-device-detect'
import { selectGroupOrder } from '@open-tender/redux'

import { Menu, Reopen } from '../../buttons'
import { isMobile } from 'react-device-detect'

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
  return (
    <CheckoutHeaderView isMobile={isMobile}>
      {cartId ? <Reopen /> : <Menu />}
    </CheckoutHeaderView>
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {}

export default CheckoutHeader
