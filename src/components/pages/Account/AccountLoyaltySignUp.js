import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { ButtonStyled } from '@open-tender/components'
import { isMobile } from 'react-device-detect'

const AccountLoyaltySignUpView = styled.div`
  margin: 1rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0 2rem;
  }

  h2 {
    margin-left: -0.1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
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

const AccountLoyaltySignUpButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button + button {
    margin: 0 0 0 1rem;
  }
`

const AccountLoyaltySignUp = () => {
  const history = useHistory()
  return (
    <AccountLoyaltySignUpView>
      <h2>Welcome! Want some free stuff?</h2>
      <p>
        Sign up for our loyalty program to start earning points for each
        purchase, which can be redeemed for free stuff!
      </p>
      <AccountLoyaltySignUpButtons>
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
      </AccountLoyaltySignUpButtons>
    </AccountLoyaltySignUpView>
  )
}

AccountLoyaltySignUp.displayName = 'AccountLoyaltySignUp'
AccountLoyaltySignUp.propTypes = {}

export default AccountLoyaltySignUp
