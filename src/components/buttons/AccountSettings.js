import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'
import { openModal } from '../../slices'

const AccountSettings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  const goToSettings = () => navigate('/account/settings')

  return (
    <ButtonIcon
      label={auth ? 'Settings' : 'Login'}
      size={isBrowser ? 22 : 18}
      style={isBrowser ? { width: '2.6rem' } : {}}
      onClick={auth ? goToSettings : login}
    >
      {iconMap.User}
    </ButtonIcon>
  )
}

AccountSettings.displayName = 'AccountSettings'

export default AccountSettings
