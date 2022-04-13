import propTypes from 'prop-types'
import styled from '@emotion/styled'

const AccountGreetingView = styled.div`
  margin: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }

  h1 {
    margin-left: -0.2rem;
    font-size: ${(props) => props.theme.fonts.sizes.giga};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: -0.1rem;
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.25rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const AccountGreeting = ({ title, subtitle }) => {
  return (
    <AccountGreetingView>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </AccountGreetingView>
  )
}

AccountGreeting.displayName = 'AccountGreeting'
AccountGreeting.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
}

export default AccountGreeting
