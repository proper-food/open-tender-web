import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const HamburgerView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => `${(props.size / 10).toFixed(2)}rem`};

  svg {
    width: 100%;
  }
`

const Hamburger = ({ size = 20, color = null }) => {
  const theme = useTheme()
  const lineColor = color || theme.colors.primary
  return (
    <HamburgerView size={size}>
      <svg viewBox="0 0 20 11" fill="none">
        <line
          x1="0.5"
          y1="0.5"
          x2="19.5"
          y2="0.5"
          stroke={lineColor}
          strokeLinecap="square"
        />
        <line
          x1="0.5"
          y1="5.5"
          x2="19.5"
          y2="5.5"
          stroke={lineColor}
          strokeLinecap="square"
        />
        <line
          x1="0.5"
          y1="10.5"
          x2="19.5"
          y2="10.5"
          stroke={lineColor}
          strokeLinecap="square"
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
