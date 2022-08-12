import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { selectSignUp, signUpCustomer, resetSignUp } from '@open-tender/redux'
import { SignUpForm } from '@open-tender/components'

import { closeModal, selectBrand, selectOptIns } from '../../slices'
import { ModalContent, ModalView } from '..'
import { ThanxTerms } from '../pages/SignUp/SignUp'

const SignUpIntro = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const SignUp = ({ windowRef, callback }) => {
  const dispatch = useDispatch()
  const { has_thanx } = useSelector(selectBrand)
  const { loading, error } = useSelector(selectSignUp)
  const optIns = useSelector(selectOptIns)
  const signUpCallback = useCallback(
    (data) => {
      if (callback) callback(data)
      dispatch(closeModal())
    },
    [dispatch, callback]
  )
  const signUp = useCallback(
    (data) => dispatch(signUpCustomer(data, signUpCallback)),
    [dispatch, signUpCallback]
  )

  useEffect(() => {
    return () => dispatch(resetSignUp())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      windowRef.current.scrollTop = 0
    }
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent
        title="Sign-up for an account"
        subtitle={
          <SignUpIntro>
            Enter your information below & you’ll be off to the races! Returning
            Proper customers, please use the same email address you’ve used
            previously to order with Proper. You’ll have all your previous
            ordering history & can now begin earning Proper rewards!
          </SignUpIntro>
        }
      >
        {has_thanx && <ThanxTerms fontSize="small" />}
        <SignUpForm
          loading={loading}
          error={error}
          signUp={signUp}
          optIns={optIns}
          hasThanx={has_thanx}
        />
      </ModalContent>
    </ModalView>
  )
}

SignUp.displayName = 'SignUp'
SignUp.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default SignUp
