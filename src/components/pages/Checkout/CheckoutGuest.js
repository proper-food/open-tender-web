import { useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, validateOrder } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import { useHistory } from 'react-router'

const CheckoutGuestSignOut = styled('div')`
  label: CheckoutGuestSignOut;
  // margin: ${(props) => props.theme.layout.padding} 0 0;
  margin: 1.5rem 0 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CheckoutGuest = ({ errors }) => {
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
      <CheckoutGuestSignOut>
        <p>
          <ButtonLink onClick={updateInfo}>
            Go back & update your contact info.
          </ButtonLink>
        </p>
      </CheckoutGuestSignOut>
      {/* {check && <CheckoutCompany errors={errors} />} */}
    </CheckoutSection>
  ) : null
}

CheckoutGuest.displayName = 'CheckoutGuest'
CheckoutGuest.propTypes = {
  errors: propTypes.object,
}

export default CheckoutGuest
