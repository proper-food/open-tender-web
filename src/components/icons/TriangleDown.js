import propTypes from 'prop-types'
import styled from '@emotion/styled'

const TriangleDownView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => props.size};

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.primary};
  }
`

const TriangleDown = ({ size = '1.2rem', color = null }) => {
  return (
    <TriangleDownView size={size} color={color}>
      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path d="M6 9L0.803847 -2.51245e-08L11.1962 8.834e-07L6 9Z" />
      </svg>
    </TriangleDownView>
  )
}

TriangleDown.displayName = 'TriangleDown'
TriangleDown.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default TriangleDown
