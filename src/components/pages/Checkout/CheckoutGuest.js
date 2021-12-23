import propTypes from 'prop-types'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { ButtonLink, Heading } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'

const CheckoutGuest = () => {
  const history = useHistory()
  const { form, check } = useSelector(selectCheckout)
  const { first_name, last_name, email, phone } = form.customer

  const updateInfo = () => {
    history.push('/checkout/signup')
  }

  return check ? (
    <CheckoutSection title="Contact Info">
      <Heading as="p">
        {first_name} {last_name}
      </Heading>
      <p>{email}</p>
      <p>{phone}</p>
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={updateInfo}>Update your contact info</ButtonLink>
        </p>
      </CheckoutSectionFootnote>
      {/* {check && <CheckoutCompany errors={errors} />} */}
    </CheckoutSection>
  ) : null
}

CheckoutGuest.displayName = 'CheckoutGuest'
CheckoutGuest.propTypes = {
  errors: propTypes.object,
}

export default CheckoutGuest
