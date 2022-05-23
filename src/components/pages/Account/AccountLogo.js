import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import HeaderLogo from '../../HeaderLogo'

const AccountLogoView = styled.div`
  padding: ${(props) => (props.isMobile ? props.theme.layout.padding : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) =>
      props.isMobile ? props.theme.layout.paddingMobile : '0'};
  }
`

const AccountLogo = () => {
  return (
    <AccountLogoView isMobile={isMobile}>
      <HeaderLogo />
    </AccountLogoView>
  )
}

AccountLogo.displayName = 'AccountLogo'

export default AccountLogo
