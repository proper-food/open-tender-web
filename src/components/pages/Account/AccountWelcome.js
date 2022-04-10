import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const AccountWelcomeView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  // padding-left: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding-left: ${(props) => props.theme.layout.paddingMobile};
  }

  h1 {
    line-height: 1.1;
    margin-left: -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h2};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }
`

const AccountWelcome = ({ title, profile }) => {
  const firstName = profile ? profile.first_name : null
  const greeting = firstName ? `${title}, ${firstName}` : title
  return (
    <AccountWelcomeView>
      <h1>{greeting}</h1>
    </AccountWelcomeView>
  )
}

AccountWelcome.displayName = 'AccountWelcome'
AccountWelcome.propTypes = {
  title: propTypes.string,
  profile: propTypes.object,
}

export default AccountWelcome
