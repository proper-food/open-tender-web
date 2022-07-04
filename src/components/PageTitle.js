import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Headline } from '@open-tender/components'

const PageTitleView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  text-align: center;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 auto ${(props) => props.theme.layout.marginMobile};
  }

  h1 {
    margin: 0 0 0 -0.2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  & > p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
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
      {title && <Headline as="h1">{title}</Headline>}
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
