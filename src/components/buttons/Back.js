import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const Back = ({ path = '/order-type' }) => {
  const navigate = useNavigate()
  return (
    <ButtonIcon
      label="Order Type"
      onClick={() => navigate(path)}
      size={isBrowser ? 24 : 20}
      style={isBrowser ? { width: '2.4rem' } : {}}
    >
      {iconMap.ArrowLeft}
    </ButtonIcon>
  )
}

Back.displayName = 'Back'
Back.propTypes = {
  path: propTypes.string,
}

export default Back
