import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import { openModal } from '../../slices'
import UserCircle from '../UserCircle'
import styled from '@emotion/styled'

const UserButton = styled.button`
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
`

const User = ({ size = 28 }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  const goToSettings = () => navigate('/account/settings')

  return (
    <UserButton onClick={auth ? goToSettings : login}>
      <UserCircle size={size} isFilled={!!auth} />
    </UserButton>
  )
}

User.displayName = 'User'

export default User
