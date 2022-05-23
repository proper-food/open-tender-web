import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { ButtonStyled } from '@open-tender/components'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { selectConfig } from '../../../slices'

const AccountLoyaltySignUpView = styled.div`
  margin: 1rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 2.5rem 0 3rem;
  }

  h2 {
    margin-left: -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h5};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }

  p {
    margin: 0.5rem 0 1.5rem;
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.6rem 0 1.2rem;
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
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
  const { account: config } = useSelector(selectConfig)
  const { title, subtitle, signUp, skip } = config.loyalty
  return (
    <AccountLoyaltySignUpView>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <AccountLoyaltySignUpButtons>
        <ButtonStyled
          onClick={() => history.push(`/signup`)}
          size={isMobile ? 'small' : 'small'}
          color="primary"
        >
          {signUp}
        </ButtonStyled>
        <ButtonStyled
          onClick={() => history.push(`/order-type`)}
          size={isMobile ? 'small' : 'small'}
          color="secondary"
        >
          {skip}
        </ButtonStyled>
      </AccountLoyaltySignUpButtons>
    </AccountLoyaltySignUpView>
  )
}

AccountLoyaltySignUp.displayName = 'AccountLoyaltySignUp'
AccountLoyaltySignUp.propTypes = {}

export default AccountLoyaltySignUp
