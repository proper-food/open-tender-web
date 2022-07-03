import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const HamburgerView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => props.size};

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.primary};
  }
`

const Hamburger = ({ size = '2rem', color = null }) => {
  const theme = useTheme()
  const lineColor = color || theme.colors.primary
  return (
    <HamburgerView size={size} color={color}>
      <svg width="20" height="11" viewBox="0 0 20 11">
        <line
          x1="0.5"
          y1="0.5"
          x2="19.5"
          y2="0.5"
          stroke={lineColor}
          stroke-linecap="square"
        />
        <line
          x1="0.5"
          y1="5.5"
          x2="19.5"
          y2="5.5"
          stroke={lineColor}
          stroke-linecap="square"
        />
        <line
          x1="0.5"
          y1="10.5"
          x2="19.5"
          y2="10.5"
          stroke={lineColor}
          stroke-linecap="square"
        />
      </svg>
    </HamburgerView>
  )
}

Hamburger.displayName = 'Hamburger'
Hamburger.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Hamburger
