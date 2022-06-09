import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, selectContent } from '../../../slices'
import PageTitle from '../../PageTitle'
import AccountGreetingLoyalty from './AccountGreetingLoyalty'

const AccountGreetingView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
    margin: 2rem 0 0;
  }

  & > div:first-of-type {
    margin: 0;
    text-align: left;
  }
`

const AccountGreeting = () => {
  const { account } = useSelector(selectContent)
  const { title, subtitle, greeting = 'Hi there' } = account || {}
  const { profile } = useSelector(selectCustomer)
  const { has_loyalty, has_thanx, has_levelup } = useSelector(selectBrand)
  const hasLoyalty = has_loyalty || has_thanx || has_levelup
  const firstName = profile ? profile.first_name : null
  const welcome = firstName ? `${greeting}, ${firstName}` : `${title}`
  return (
    <AccountGreetingView>
      <PageTitle
        title={welcome}
        subtitle={subtitle}
        style={{ maxWidth: '100%' }}
      />
      {hasLoyalty && <AccountGreetingLoyalty />}
    </AccountGreetingView>
  )
}

AccountGreeting.displayName = 'AccountGreeting'

export default AccountGreeting
