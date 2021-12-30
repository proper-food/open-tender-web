import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { Grid } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, validateOrder } from '@open-tender/redux'
import { ButtonLink, Text } from '@open-tender/components'

import { openModal } from '../../../slices'
import CheckoutButton from './CheckoutButton'

const CheckoutLevelUpView = styled.div``

const CheckoutLevelUpContent = styled.div`
  margin: 0 0 2rem;
`

const CheckoutLevelUp = ({ apply, remove, isPaid }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const { check, form } = useSelector(selectCheckout)
  const { tender_types } = check.config

  if (!tender_types.includes('LEVELUP')) return null

  const isCustomer = check.customer.customer_id
  const levelup = check.customer.levelup || {}
  const tender = { tender_type: 'LEVELUP' }
  const isApplied =
    form.tenders.filter((i) => i.tender_type === 'LEVELUP').length > 0
  const onPress = isApplied ? () => remove() : () => apply(tender)
  const disabled = isApplied || isPaid
  const { email } = form.customer

  const connectLevelUp = () => {
    const validate = () => dispatch(validateOrder())
    dispatch(openModal({ type: 'levelup', args: { validate } }))
  }

  const signUp = () => {
    email
      ? history.push('/checkout/signup')
      : dispatch(openModal({ type: 'signUp' }))
  }

  return (
    <CheckoutLevelUpView>
      {levelup.connected ? (
        <CheckoutButton
          icon={<Grid color={theme.colors.primary} width={18} height={18} />}
          title="Pay with LevelUp"
          subtitle={`Currently connected via your ${levelup.email} email address`}
          onPress={onPress}
          isApplied={isApplied}
          disabled={disabled}
        />
      ) : isCustomer ? (
        <CheckoutLevelUpContent>
          <Text as="p" color="error">
            LevelUp Not Connected
          </Text>
          <Text as="p" size="small">
            Your LevelUp account is not currently connected so you cannot use
            LevelUp for payment.
            <ButtonLink onClick={connectLevelUp}>
              Click here to connect LevelUp
            </ButtonLink>{' '}
            or{' '}
            <a
              href="https://www.thelevelup.com/users/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              click here to create a LevelUp account
            </a>{' '}
            if you {"don't"} have one.
          </Text>
        </CheckoutLevelUpContent>
      ) : (
        <>
          <Text as="p" color="error">
            Account Required
          </Text>
          <Text as="p" size="small">
            In order to pay with LevelUp, you must first create an account and
            then connect your LevelUp account to your account here.{' '}
            <ButtonLink onClick={signUp} label="Sign up for an account">
              Click here to sign up for an account.
            </ButtonLink>
          </Text>
        </>
      )}
    </CheckoutLevelUpView>
  )
}

CheckoutLevelUp.displayName = 'CheckoutLevelUp'
CheckoutLevelUp.propTypes = {
  apply: propTypes.func,
  remove: propTypes.func,
  isPaid: propTypes.bool,
}

export default CheckoutLevelUp
