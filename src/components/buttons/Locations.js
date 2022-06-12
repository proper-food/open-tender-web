import { useNavigate } from 'react-router-dom'
import { ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'

const Locations = () => {
  const navigate = useNavigate()

  return (
    <ButtonIcon label="Locations" onClick={() => navigate(`/locations`)}>
      {iconMap.MapPin}
    </ButtonIcon>
  )
}

Locations.displayName = 'Locations'

export default Locations
