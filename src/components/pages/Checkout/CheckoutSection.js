import styled from '@emotion/styled'
import propTypes from 'prop-types'

const CheckoutSectionView = styled('div')`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }

  h4 {
    margin: 0 0 0.5em;
  }

  & > p {
    margin: 0.5em 0 0;
  }
`

const CheckoutSection = ({ children }) => {
  return <CheckoutSectionView>{children}</CheckoutSectionView>
}

CheckoutSection.displayName = 'CheckoutSection'
CheckoutSection.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CheckoutSection
