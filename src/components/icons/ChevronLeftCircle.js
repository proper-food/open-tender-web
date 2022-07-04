import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const ChevronLeftCircleView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => `${(props.size / 10).toFixed(2)}rem`};

  svg {
    width: 100%;
  }
`

const ChevronLeftCircle = ({ size = 25, color = null }) => {
  const theme = useTheme()
  const lineColor = color || theme.colors.primary
  return (
    <ChevronLeftCircleView size={size}>
      <svg viewBox="0 0 25 25" fill="none">
        <path
          d="M15 18L9 12L15 6"
          stroke={lineColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12.5" cy="12.5" r="12" stroke={lineColor} />
      </svg>
    </ChevronLeftCircleView>
  )
}

ChevronLeftCircle.displayName = 'ChevronLeftCircle'
ChevronLeftCircle.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default ChevronLeftCircle
