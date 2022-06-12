import styled from '@emotion/styled'
import propTypes from 'prop-types'

const HtmlContentView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  p {
    margin: 1em 0;
    line-height: ${(props) => props.theme.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
      margin: 1em 0;
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  h1 + p,
  h2 + p,
  h3 + p,
  h4 + p,
  h5 + p,
  h6 + p {
    margin: 1em 0 0 !important;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 1em 0 0 !important;
    }
  }
`

const HtmlContent = ({ content }) => {
  const hasContent = !!(content && content.length)
  if (!hasContent || content === '<p><br></p>') return null
  return <HtmlContentView dangerouslySetInnerHTML={{ __html: content }} />
}

HtmlContent.displayName = 'HtmlContent'
HtmlContent.propTypes = {
  content: propTypes.string,
}

export default HtmlContent
