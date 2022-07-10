import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { ButtonIcon } from '@open-tender/components'
import { selectDisplaySettings, openModal } from '../../slices'
import { Sliders } from '../icons'

const Allergens = ({ style }) => {
  const dispatch = useDispatch()
  const { allergens: showAllergens } = useSelector(selectDisplaySettings)

  if (!showAllergens) return null

  return (
    <ButtonIcon
      label="Highlight allergens on the menu"
      onClick={() => dispatch(openModal({ type: 'allergens' }))}
      size={isBrowser ? 20 : 20}
      style={style}
    >
      <Sliders />
    </ButtonIcon>
  )
}

Allergens.displayName = 'Allergens'
Allergens.propTypes = {
  style: propTypes.object,
}

export default Allergens
