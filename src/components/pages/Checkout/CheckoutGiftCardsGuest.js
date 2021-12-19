import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { ButtonLink, Text } from '@open-tender/components'

const PaymentGiftCardsGuestView = styled.div``

const PaymentGiftCardsGuestLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const PaymentGiftCardsGuest = () => {
  const history = useHistory()

  return (
    <PaymentGiftCardsGuestView>
      <Text size="small">Have a gift card number?</Text>
      <PaymentGiftCardsGuestLinks>
        {/* <ButtonLink
          onPress={() => history.push('/checkout/signin')}
          size="small"
          underline={true}
          padding="3px 0 0"
        >
          Sign In
        </ButtonLink>
        <Text size="small"> or </Text> */}
        <ButtonLink
          onPress={() => history.push('/checkout/signup')}
          size="small"
          underline={true}
          padding="3px 0 0"
        >
          Create an account
        </ButtonLink>
        <Text size="small"> to apply your gift card.</Text>
      </PaymentGiftCardsGuestLinks>
    </PaymentGiftCardsGuestView>
  )
}

PaymentGiftCardsGuest.displayName = 'PaymentGiftCardsGuest'
PaymentGiftCardsGuest.propTypes = {}

export default PaymentGiftCardsGuest
