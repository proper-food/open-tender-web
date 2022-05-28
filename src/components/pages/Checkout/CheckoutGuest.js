import propTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { ButtonLink, Heading } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'

const CheckoutGuest = () => {
  const navigate = useNavigate()
  const { form, check } = useSelector(selectCheckout)
  const { first_name, last_name, email, phone } = form.customer

  const updateInfo = () => {
    navigate(email ? '/checkout/signup' : '/checkout/guest')
  }

  return check ? (
    <CheckoutSection title="Contact Info">
      <Heading as="p">
        {first_name} {last_name}
      </Heading>
      {email && <p>{email}</p>}
      {phone && <p>{phone}</p>}
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
