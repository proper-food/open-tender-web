import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { SkipLink, Footer } from '.'

const ContentView = styled('div')`
  label: ContentView;

  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxWidth};
  background-color: ${(props) => props.theme.bgColors.primary};
`

const Content = ({
  maxWidth = '100%',
  hasRouter = true,
  hasFooter = true,
  children,
  style = null,
}) => {
  return (
    <ContentView maxWidth={maxWidth} style={style}>
      <>
        <SkipLink />
        {children}
        {hasFooter && <Footer hasRouter={hasRouter} />}
      </>
    </ContentView>
  )
}

Content.displayName = 'Content'
Content.propTypes = {
  maxWidth: propTypes.string,
  hasRouter: propTypes.bool,
  hasFooter: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default Content
