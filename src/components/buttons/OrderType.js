import { useNavigate } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const OrderType = () => {
  const navigate = useNavigate()

  return (
    <ButtonIcon
      label="Order Type"
      onClick={() => navigate('/order-type')}
      size={isBrowser ? 24 : 20}
      style={isBrowser ? { width: '2.4rem' } : {}}
    >
      {iconMap.ArrowLeft}
    </ButtonIcon>
  )
}

OrderType.displayName = 'OrderType'

export default OrderType
