import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const PageTitleView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  text-align: center;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 auto ${(props) => props.theme.layout.paddingMobile};
  }

  h1 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  h2 {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  & > p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 1rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const PageTitlePreface = styled('div')`
  margin: -3rem 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: -2rem 0 2rem;
  }
`

const PageTitle = ({ title, subtitle, preface, children, style = null }) => {
  return (
    <PageTitleView style={style}>
      {preface && <PageTitlePreface>{preface}</PageTitlePreface>}
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
      {children}
    </PageTitleView>
  )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  preface: propTypes.element,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageTitle
