import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { selectCurrentItem, setCurrentItem } from '@open-tender/redux'
import { closeModal } from '../../slices'
import { MenuItem } from '..'
import { XCircle } from '../icons'
import { useTheme } from '@emotion/react'
import { isMobile } from 'react-device-detect'

const ItemModalView = styled.div`
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

const ItemModalClose = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.theme.item.desktop.imagePadding === '0'
      ? props.theme.links.light.color
      : props.theme.links.dark.color};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    color: ${(props) =>
      props.theme.item.mobile.imagePadding === '0'
        ? props.theme.links.light.color
        : props.theme.links.dark.color};
  }

  &:hover {
    color: ${(props) =>
      props.theme.item.desktop.imagePadding === '0'
        ? props.theme.links.light.hover
        : props.theme.links.dark.hover};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) =>
        props.theme.item.mobile.imagePadding === '0'
          ? props.theme.links.light.hover
          : props.theme.links.dark.hover};
    }
  }
`

const ItemModalContent = styled.div`
  padding: 0;
  height: 100%;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
  }
`

const ItemModal = () => {
  const theme = useTheme()
  const styles = isMobile ? theme.item.mobile : theme.item.desktop
  const hasPadding = styles.imagePadding !== '0'
  const fill = hasPadding ? theme.bgColors.primary : 'none'
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
    <ItemModalView>
      <ItemModalContent role="dialog" aria-labelledby="dialogTitle">
        <ItemModalClose onClick={cancel}>
          <XCircle size={24} fill={fill} />
        </ItemModalClose>
        <MenuItem cancel={cancel} />
      </ItemModalContent>
    </ItemModalView>
  )
}

ItemModal.displayName = 'ItemModal'

export default ItemModal
