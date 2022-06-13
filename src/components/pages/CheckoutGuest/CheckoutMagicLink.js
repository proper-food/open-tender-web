import { useDispatch, useSelector } from 'react-redux'
import { fetchGuestThanx, resetGuest, selectGuest } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import { PageTitle, PageContent } from '../..'

const CheckoutMagicLink = () => {
  const dispatch = useDispatch()
  const { email, loading } = useSelector(selectGuest)
  const resend = () => dispatch(fetchGuestThanx(email))
  const reset = () => dispatch(resetGuest())

  return (
    <>
      <PageTitle
        title="Account found!"
        subtitle="We just sent you a magic sign in link! Please open the email on this device and click to link to sign in and continue your order."
      />
      <PageContent>
        <p>
          <ButtonLink onClick={resend} disabled={loading === 'pending'}>
            Click here to resend the magic link.
          </ButtonLink>
        </p>
        <p>
          <ButtonLink onClick={reset} disabled={loading === 'pending'}>
            Or click here to enter a different email address.
          </ButtonLink>
        </p>
      </PageContent>
    </>
  )
}

CheckoutMagicLink.displayName = 'CheckoutMagicLink'
export default CheckoutMagicLink
