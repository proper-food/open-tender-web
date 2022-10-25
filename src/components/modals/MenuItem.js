import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { selectCurrentItem, setCurrentItem } from '@open-tender/redux'
import { closeModal } from '../../slices'
import { MenuItem as MenuItemComponent } from '..'
import { XCircle } from '../icons'

const MenuItemModalView = styled.div`
  position: relative;
  width: 90%;
  max-width: 64rem;
  height: 90%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

const MenuItemModalClose = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.links.light.color};
  // background: radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 80%);
  // box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);

  &:hover {
    color: ${(props) => props.theme.links.light.hover};
  }
`

const MenuItemModalContent = styled.div`
  padding: 0;
  height: 100%;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
  }
`

const MenuItem = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)

  const cancel = useCallback(() => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }, [dispatch])

  if (!item) return null

  return (
    <MenuItemModalView>
      <MenuItemModalContent role="dialog" aria-labelledby="dialogTitle">
        <MenuItemModalClose onClick={cancel}>
          <XCircle size={24} />
        </MenuItemModalClose>
        <MenuItemComponent cancel={cancel} />
      </MenuItemModalContent>
    </MenuItemModalView>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
