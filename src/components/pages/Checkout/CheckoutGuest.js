import { useEffect } from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, validateOrder } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'

const CheckoutGuest = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { form, check } = useSelector(selectCheckout)
  const { first_name, last_name, email, phone } = form.customer

  useEffect(() => {
    dispatch(validateOrder())
  }, [dispatch])

  const updateInfo = () => {
    history.push('/checkout/signup')
  }

  return check ? (
    <CheckoutSection>
      <h4>Contact Information</h4>
      <p>
        {first_name} {last_name}
      </p>
      <p>{email}</p>
      <p>{phone}</p>
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={updateInfo}>
            Update your contact info.
          </ButtonLink>
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
