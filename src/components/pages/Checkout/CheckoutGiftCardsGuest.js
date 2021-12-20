import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { ButtonLink, Text } from '@open-tender/components'

const PaymentGiftCardsGuestView = styled.div``

const PaymentGiftCardsGuest = () => {
  const history = useHistory()

  return (
    <PaymentGiftCardsGuestView>
      <Text size="small">
        Have a gift card number?{' '}
        <ButtonLink
          onClick={() => history.push('/checkout/signup')}
          size="small"
          underline={true}
          padding="3px 0 0"
        >
          Create an account to apply it.
        </ButtonLink>
      </Text>
    </PaymentGiftCardsGuestView>
  )
}

PaymentGiftCardsGuest.displayName = 'PaymentGiftCardsGuest'
PaymentGiftCardsGuest.propTypes = {}

export default PaymentGiftCardsGuest
