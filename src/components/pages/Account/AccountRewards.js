import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import {
  fetchCustomerLoyalty,
  fetchCustomerRewards,
  selectCustomer,
  selectCustomerLoyaltyProgram,
  selectCustomerRewards,
} from '@open-tender/redux'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonStyled } from '@open-tender/components'

import { Loading, Rewards } from '../..'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import { isMobile } from 'react-device-detect'

const AccountRewardsView = styled.div`
  padding: 0 0 ${(props) => props.theme.layout.paddingMobile};
`

const AccountRewardsSignUp = styled.div`
  margin: 1rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0 2rem;
  }

  h2 {
    margin-left: -0.1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    margin: 1rem 0 2rem;
    line-height: ${(props) => props.theme.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.6rem 0 1.2rem;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const AccountRewardsButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button + button {
    margin: 0 0 0 1rem;
  }
`

const AccountRewards = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const hasCustomer = auth ? true : false
  const loyalty = useSelector(selectCustomerLoyaltyProgram)
  const rewards = useSelector(selectCustomerRewards)
  const { entities, error } = rewards
  const hasProgram = loyalty && loyalty.program ? true : false
  const hasRewards = entities.length > 0 && !error
  const isLoading =
    loyalty.loading === 'pending' || rewards.loading === 'pending'

  useEffect(() => {
    if (hasCustomer) {
      dispatch(fetchCustomerLoyalty())
      dispatch(fetchCustomerRewards())
    }
  }, [dispatch, hasCustomer])

  return (
    <AccountRewardsView>
      {!hasCustomer ? (
        <AccountRewardsSignUp>
          <h2>Want some free stuff?</h2>
          <p>
            Sign up for our loyalty program to start earning points for each
            purchase, which can be redeemed for free stuff!
          </p>
          <AccountRewardsButtons>
            <ButtonStyled
              onClick={() => history.push(`/signup`)}
              size={isMobile ? 'small' : 'default'}
              color="primary"
            >
              Sign Up
            </ButtonStyled>
            <ButtonStyled
              onClick={() => history.push(`/order-type`)}
              size={isMobile ? 'small' : 'default'}
              color="secondary"
            >
              Order without Rewards
            </ButtonStyled>
          </AccountRewardsButtons>
        </AccountRewardsSignUp>
      ) : isLoading && !hasProgram && !hasRewards ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : (
        <>
          <AccountLoyaltyProgram program={loyalty.program} />
          {hasRewards && <Rewards rewards={entities} />}
        </>
      )}
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {}

export default AccountRewards
