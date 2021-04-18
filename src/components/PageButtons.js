import styled from '@emotion/styled'

const PageButtons = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -0.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: -0.5rem -0.5rem 0;
  }

  button {
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: block;
      max-width: 50%;
      flex: 1 1 50%;
      // padding: 1.1rem 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      margin: 0 0.5rem;
      line-height: 1.2;
      overflow: hidden;
    }

    &:last-of-type {
      margin-right: 0;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        margin-right: 0.5rem;
      }
    }
  }
`

export default PageButtons
