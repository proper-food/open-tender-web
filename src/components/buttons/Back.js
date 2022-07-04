import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftCircle } from '../icons'

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  margin: 0 0 0 -1.25rem;
  transition: ${(props) => props.theme.links.transition};
`

const Back = ({ path = '/account' }) => {
  const navigate = useNavigate()
  return (
    <BackButton onClick={() => navigate(path)}>
      <ChevronLeftCircle />
    </BackButton>
  )
}

Back.displayName = 'Back'
Back.propTypes = {
  path: propTypes.string,
}

export default Back
