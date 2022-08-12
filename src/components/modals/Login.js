import { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectResetPassword,
  loginCustomer,
  loginCustomerThanx,
  sendPasswordResetEmail,
  resetPasswordReset,
  resetLoginError,
} from '@open-tender/redux'
import {
  LoginForm,
  SendResetForm,
  ButtonLink,
  ButtonStyled,
} from '@open-tender/components'

import { closeModal, selectBrand } from '../../slices'
import { ModalContent, ModalView } from '..'

const messaging = {
  login: {
    title: 'Log into your account',
    subtitle: "Don't have an account?",
    reset: 'Forget your password?',
  },
  thanx: {
    title: 'Log into your account',
    subtitle:
      'Already a member of our loyalty program through Thanx? Enter your email address, and we’ll send you a confirmation link!',
  },
  reset: {
    title: 'Reset your password',
    subtitle: 'Please enter the email address associated with your account',
    reset: 'Nevermind, I remembered it',
  },
  resetSent: {
    title: 'Password reset email sent',
    subtitle:
      'A reset password email was just sent to the email address you provided. Please check your inbox and click on the link in the email in order to reset your password.',
    reset: 'Back to login form',
  },
}

const LoginModalIntro = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const LoginModalClose = styled.div`
  label: LoginModalClose;

  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginModalFooter = styled.div`
  label: LoginModalFooter;

  display: flex;
  justify-content: center !important;
  align-items: center;
`

const LoginModal = ({ callback }) => {
  const [isReset, setIsReset] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { has_thanx } = useSelector(selectBrand)
  const customer = useSelector(selectCustomer)
  const { profile } = customer
  const resetPassword = useSelector(selectResetPassword)
  const { resetSent } = resetPassword
  const mode = has_thanx
    ? 'thanx'
    : resetSent
    ? 'resetSent'
    : isReset
    ? 'reset'
    : 'login'
  const msg = messaging[mode]
  const login = useCallback(
    (email, password) => dispatch(loginCustomer(email, password)),
    [dispatch]
  )
  const sendReset = useCallback(
    (email, linkUrl) => dispatch(sendPasswordResetEmail(email, linkUrl)),
    [dispatch]
  )
  const loginThanx = useCallback(
    (email) => dispatch(loginCustomerThanx(email)),
    [dispatch]
  )

  useEffect(() => {
    if (profile) dispatch(closeModal())
    return () => {
      dispatch(resetPasswordReset())
      dispatch(resetLoginError())
    }
  }, [profile, dispatch])

  const toggleReset = () => {
    setIsReset(!isReset)
  }

  const toggleResetSent = () => {
    setIsReset(false)
    dispatch(resetPasswordReset())
  }

  const signUp = () => {
    dispatch(closeModal())
    navigate(`/signup`)
  }

  return (
    <ModalView>
      <ModalContent
        title={msg.title}
        subtitle={
          <>
            <LoginModalIntro>
              {msg.subtitle}{' '}
              {mode === 'login' && (
                <ButtonLink onClick={signUp}>Sign up here.</ButtonLink>
              )}
            </LoginModalIntro>
            {mode === 'thanx' && (
              <LoginModalIntro>
                Not yet a member of our loyalty program?{' '}
                <ButtonLink onClick={signUp}>Sign-up for it here</ButtonLink>{' '}
                using the same email address you’ve been using with Proper Food,
                & we’ll link the two accounts together. You’ll have all your
                previous ordering history and favorites - and can now begin
                earning Proper Rewards!
              </LoginModalIntro>
            )}
          </>
        }
        footer={
          !has_thanx && (
            <LoginModalFooter>
              <ButtonLink onClick={resetSent ? toggleResetSent : toggleReset}>
                {msg.reset}
              </ButtonLink>
            </LoginModalFooter>
          )
        }
      >
        {resetSent ? (
          <LoginModalClose>
            <ButtonStyled onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </LoginModalClose>
        ) : isReset ? (
          <SendResetForm
            {...resetPassword}
            sendReset={sendReset}
            callback={callback}
          />
        ) : (
          <LoginForm
            {...customer}
            login={has_thanx ? loginThanx : login}
            callback={callback}
            hasThanx={has_thanx}
          />
        )}
      </ModalContent>
    </ModalView>
  )
}

LoginModal.displayName = 'LoginModal'
LoginModal.propTypes = {
  callback: propTypes.func,
}

export default LoginModal
