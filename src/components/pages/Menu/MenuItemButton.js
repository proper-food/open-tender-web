import styled from '@emotion/styled'

const MenuItemButton = styled('button')`
  cursor: ${(props) => (props.isSoldOut ? 'default' : 'pointer')};
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: left;
  background-color: transparent;
  opacity: 1;
  transition: all 0.15s ease;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: auto;
  }

  &:hover:enabled,
  &:active:enabled,
  &:focus:enabled {
    opacity: ${(props) => (props.isSoldOut ? '1.0' : '0.8')};
  }
`

export default MenuItemButton
