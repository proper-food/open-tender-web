import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const AccountHome = () => {
  const navigate = useNavigate()

  return (
    <ButtonIcon
      label="Home"
      onClick={() => navigate('/account')}
      size={isBrowser ? 22 : 20}
      style={isBrowser ? { width: '2.6rem', marginRight: '1.5rem' } : {}}
    >
      {iconMap.Home}
    </ButtonIcon>
  )
}

AccountHome.displayName = 'AccountHome'

export default AccountHome
