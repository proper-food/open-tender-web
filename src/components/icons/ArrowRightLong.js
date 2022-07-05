import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ArrowRightLongView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => `${(props.size / 10).toFixed(2)}rem`};

  svg {
    width: 100%;
  }
`

const ArrowRightLong = ({ size = 36, strokeWidth = 2 }) => {
  return (
    <ArrowRightLongView size={size}>
      <svg viewBox="0 0 36 16" fill="none">
        <path
          d="M1 8L35 8"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 1L35 8L28 15"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </ArrowRightLongView>
  )
}

ArrowRightLong.displayName = 'ArrowRightLong'
ArrowRightLong.propTypes = {
  size: propTypes.number,
  strokeWidth: propTypes.number,
}

export default ArrowRightLong
