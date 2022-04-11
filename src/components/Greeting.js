import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCustomer } from '@open-tender/redux'
import HeaderLogo from './HeaderLogo'

const GreetingView = styled.div`
  // opacity: 0;
  // animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding-left: ${(props) => props.theme.layout.paddingMobile};
  }

  h1 {
    line-height: 1.1;
    margin-left: -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }
`

const Greeting = () => {
  const history = useHistory()
  const { profile } = useSelector(selectCustomer)
  const firstName = profile ? profile.first_name : null
  const title = 'Hi there'
  const greeting = firstName ? `${title}, ${firstName}!` : `${title}!`
  return (
    <GreetingView>
      {profile ? (
        <button onClick={() => history.push('/account')}>
          <h1>{greeting}</h1>
        </button>
      ) : (
        <HeaderLogo />
      )}
    </GreetingView>
  )
}

Greeting.displayName = 'Greeting'
Greeting.propTypes = {
  title: propTypes.string,
  profile: propTypes.object,
}

export default Greeting
