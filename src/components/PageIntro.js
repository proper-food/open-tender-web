import styled from '@emotion/styled'

const PageIntro = styled.div`
  width: 100%;
  max-width: ${(props) => props.width || '72rem'};
  margin: ${(props) => props.theme.layout.margin} auto;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} auto;
  }

  p {
    margin: 1em 0;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

export default PageIntro
