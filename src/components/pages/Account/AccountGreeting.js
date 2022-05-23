import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { selectContent } from '../../../slices'

const AccountGreetingView = styled.div`
  margin: 0 0 3.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 3.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 2rem;
  }

  h1 {
    margin-left: -0.2rem;
    // font-size: ${(props) => props.theme.fonts.sizes.giga};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: -0.1rem;
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  p {
    // font-size: ${(props) => props.theme.fonts.sizes.xBig};
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const AccountGreeting = () => {
  const { account } = useSelector(selectContent)
  const { title, subtitle, greeting = 'Hi there' } = account || {}
  const { profile } = useSelector(selectCustomer)
  const firstName = profile ? profile.first_name : null
  const welcome = firstName ? `${greeting}, ${firstName}` : `${title}`
  return (
    <AccountGreetingView>
      <h1>{welcome}</h1>
      {subtitle && <p>{subtitle}</p>}
    </AccountGreetingView>
  )
}

AccountGreeting.displayName = 'AccountGreeting'

export default AccountGreeting
