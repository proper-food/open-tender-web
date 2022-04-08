import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { PageTitle } from '.'

const GreetingView = styled('div')`
  width: 100%;
  flex: 1 1 100%;
  // text-align: center;
  margin-top: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-top: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const GreetingFootnote = styled('p')`
  margin: 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0 0;
    text-align: center;
  }
`

const GreetingContent = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: 2.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const Greeting = ({ title, subtitle, actions, footnote, children, style }) => {
  return (
    <GreetingView style={style}>
      <PageTitle title={title} subtitle={subtitle} />
      {actions}
      {footnote && <GreetingFootnote>{footnote}</GreetingFootnote>}
      {children && <GreetingContent>{children}</GreetingContent>}
    </GreetingView>
  )
}

Greeting.displayName = 'Greeting'
Greeting.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  actions: propTypes.element,
  footnote: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default Greeting
