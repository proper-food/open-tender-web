import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const AccountGreetingView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  // text-align: center;
  margin: 0 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 0;
  }

  h1 {
    line-height: 1.1;
    font-size: ${(props) => props.theme.fonts.sizes.h1};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h2};
    }

    // span {
    //   display: block;
    // }
  }

  p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 1rem 0 1.5rem;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const AccountGreeting = ({ title, subtitle, profile }) => {
  const firstName = profile ? profile.first_name : null
  const greeting = firstName ? (
    <>
      <span>{title}, </span>
      <span>{firstName}</span>
    </>
  ) : (
    <span>{title}!</span>
  )
  return (
    <AccountGreetingView>
      <h1>{greeting}</h1>
      {subtitle && <p>{subtitle}</p>}
    </AccountGreetingView>
  )
}

AccountGreeting.displayName = 'Greeting'
AccountGreeting.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  profile: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default AccountGreeting
