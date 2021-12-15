import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
// import { isBrowser } from 'react-device-detect'
import { selectGroupOrder } from '@open-tender/redux'

import { Menu, Reopen } from '../../buttons'

const CheckoutHeaderView = styled('div')`
  height: ${(props) => props.theme.layout.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const CheckoutHeader = () => {
  const { cartId } = useSelector(selectGroupOrder)
  return (
    <CheckoutHeaderView>{cartId ? <Reopen /> : <Menu />}</CheckoutHeaderView>
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {}

export default CheckoutHeader
