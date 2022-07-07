import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftCircle } from '../icons'
import { Icon } from '.'

const Back = ({ path = '/account' }) => {
  const navigate = useNavigate()
  return (
    <Icon margin="0 0 0 -1.25rem" onClick={() => navigate(path)}>
      <ChevronLeftCircle />
    </Icon>
  )
}

Back.displayName = 'Back'
Back.propTypes = {
  path: propTypes.string,
}

export default Back
