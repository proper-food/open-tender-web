import styled from '@emotion/styled'

const FormHeader = styled('div')`
  margin: 0 0 2rem;

  p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.main};

    &:first-of-type {
      margin: 0 0 0 -0.1rem;
      line-height: 1;
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }
`

export default FormHeader
