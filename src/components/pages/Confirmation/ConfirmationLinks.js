import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetCustomerOrder } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'
import styled from '@emotion/styled'

const ConfirmationLinksView = styled('div')`
  margin: 1.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  // p {
  //   button,
  //   span {
  //     @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  //       display: inline-block;
  //       width: 100%;
  //     }
  //   }
  // }
`

const ConfirmationLinks = ({ auth, brand }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const reviewAccount = () => {
    dispatch(resetCustomerOrder())
    history.push('/')
  }

  return (
    <ConfirmationLinksView>
      <p>
        {auth ? (
          <ButtonLink onClick={reviewAccount}>
            Head back to your account
          </ButtonLink>
        ) : (
          <a href={brand.url} rel="noopener noreferrer">
            Head back to our website
          </a>
        )}
        <span> or </span>
        <ButtonLink onClick={() => history.push('/')}>
          start another order
        </ButtonLink>
      </p>
    </ConfirmationLinksView>
  )
}

ConfirmationLinks.displayName = 'ConfirmationLinks'
export default ConfirmationLinks
