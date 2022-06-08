import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { selectContent } from '../../../slices'
import PageTitle from '../../PageTitle'

const AccountGreetingView = styled.div`
  & > div {
    text-align: left;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0;
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
      <PageTitle
        title={welcome}
        subtitle={subtitle}
        style={{ maxWidth: '100%' }}
      />
    </AccountGreetingView>
  )
}

AccountGreeting.displayName = 'AccountGreeting'

export default AccountGreeting
