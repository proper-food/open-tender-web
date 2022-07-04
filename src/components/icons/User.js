import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const UserView = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => props.size};

  svg {
    width: 100%;
  }
`

const User = ({ size = '1.8rem', strokeWidth = '0.1rem', color = null }) => {
  const theme = useTheme()
  const lineColor = color || theme.colors.primary
  return (
    <UserView size={size} color={color}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </UserView>
  )
}

User.displayName = 'User'
User.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default User
