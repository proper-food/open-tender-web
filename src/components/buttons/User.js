import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCustomer } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'

import { openModal } from '../../slices'
import UserCircle from '../UserCircle'

const UserButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  margin: 0 0 0 -1.1rem;
`

const User = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)
  const isFilled = auth ? true : false

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  const goToSettings = () => navigate('/account/settings')

  return (
    <UserButton onClick={auth ? goToSettings : login}>
      <UserCircle size={28} isFilled={isFilled} />
    </UserButton>
  )
}

User.displayName = 'User'

export default User
