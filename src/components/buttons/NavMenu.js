import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { toggleNav } from '../../slices'
import { Hamburger } from '../icons'

const NavMenuButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  margin: 0 -1.5rem 0 0;
  transition: ${(props) => props.theme.links.transition};
`

const NavMenu = ({ color }) => {
  const dispatch = useDispatch()

  return (
    <NavMenuButton onClick={() => dispatch(toggleNav())}>
      <Hamburger color={color} />
    </NavMenuButton>
  )
}

NavMenu.displayName = 'NavMenu'
NavMenu.propTypes = {
  color: propTypes.string,
}

export default NavMenu
