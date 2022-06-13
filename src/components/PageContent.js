import styled from '@emotion/styled'

const PageContent = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  text-align: center;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  & > p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 1em 0;
  }
`

export default PageContent
