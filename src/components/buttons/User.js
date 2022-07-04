import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCustomer } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'

import { openModal } from '../../slices'
import { UserCircle } from '../icons'
import { useTheme } from '@emotion/react'

const UserButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  margin: 0 0 0 -1.1rem;
  transition: ${(props) => props.theme.links.transition};
`

const User = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)
  const theme = useTheme()
  const { colors, bgColors } = theme
  const color = auth ? bgColors.primary : colors.primary
  const bgColor = auth ? colors.primary : bgColors.primary

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  const goToSettings = () => navigate('/account/settings')

  return (
    <UserButton onClick={auth ? goToSettings : login}>
      <UserCircle color={color} bgColor={bgColor} />
    </UserButton>
  )
}

User.displayName = 'User'

export default User
