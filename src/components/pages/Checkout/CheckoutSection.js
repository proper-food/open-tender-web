import styled from '@emotion/styled'
import propTypes from 'prop-types'

const CheckoutSectionView = styled('div')`
  // opacity: 0;
  // animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: 0 ${(props) => props.theme.layout.padding} 0 0;
  margin: ${(props) => props.theme.layout.margin} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0 0;
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
  }

  h4 {
    margin: 0 0 0.5em;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }

  & > p {
    margin: 0.5em 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
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
