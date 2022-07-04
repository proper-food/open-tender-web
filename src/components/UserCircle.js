import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { User } from 'react-feather'
// import { User } from './icons'

const UserCircleView = styled.span`
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: ${(props) => `${(props.padding / 10).toFixed(1)}rem`};
  width: ${(props) => `${(props.size / 10).toFixed(1)}rem`};
  height: ${(props) => `${(props.size / 10).toFixed(1)}rem`};
  border-radius: ${(props) => `${(props.size / 20).toFixed(1)}rem`};
  border-style: solid;
  border-width: 0.1rem;
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.bgColor};
`

const UserCircle = ({
  size = 28,
  padding = 4,
  strokeWidth = 1,
  isFilled = false,
}) => {
  const theme = useTheme()
  const { colors, bgColors } = theme
  const color = isFilled ? bgColors.primary : colors.primary
  const bgColor = isFilled ? colors.primary : bgColors.primary
  const userSize = size - padding * 2
  return (
    <UserCircleView size={size} padding={padding} bgColor={bgColor}>
      <User size={userSize} strokeWidth={strokeWidth} color={color} />
    </UserCircleView>
  )
}

UserCircle.displayName = 'UserCircle'
UserCircle.propTypes = {
  size: propTypes.number,
}

export default UserCircle
