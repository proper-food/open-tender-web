import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ChevronLeftCircleView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => `${(props.size / 10).toFixed(2)}rem`};

  svg {
    width: 100%;
  }
`

const ChevronLeftCircle = ({ size = 25 }) => {
  return (
    <ChevronLeftCircleView size={size}>
      <svg viewBox="0 0 25 25" fill="none">
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12.5" cy="12.5" r="12" stroke="currentColor" />
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
