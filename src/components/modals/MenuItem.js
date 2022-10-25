import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  addItemToCart,
  selectCurrentItem,
  setCurrentItem,
  showNotification,
} from '@open-tender/redux'
import { closeModal } from '../../slices'
import { MenuItem as MenuItemComponent, ModalClose } from '..'
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
  // border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.links.light.color};
  // color: ${(props) => props.theme.bgColors.primary};
  // background-color: ${(props) => props.theme.colors.primary};
  // background: radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 80%);
  // box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);

  &:hover {
    color: ${(props) => props.theme.links.light.hover};
    // color: ${(props) => props.theme.colors.primary};
    // background-color: ${(props) => props.theme.bgColors.primary};
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

  const cancel = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  // const addItem = (item) => {
  //   dispatch(addItemToCart(item))
  //   dispatch(showNotification(`${item.name} added to cart`))
  //   dispatch(closeModal())
  //   setTimeout(() => {
  //     dispatch(setCurrentItem(null))
  //   }, 275)
  // }

  const addItem = (builtItem) => {
    const cartItem = { ...builtItem }
    if (cartItem.index === -1) delete cartItem.index
    dispatch(addItemToCart(cartItem))
    dispatch(showNotification(`${cartItem.name} added to cart`))
    // if (hasUpsell) {
    //   setShowUpsell(true)
    // } else {
    //   dispatch(setCurrentItem(null))
    // }
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  if (!item) return null

  return (
    <MenuItemModalView>
      <MenuItemModalContent role="dialog" aria-labelledby="dialogTitle">
        {/* <ModalClose onClick={cancel} isButton={isMobile} /> */}
        <MenuItemModalClose onClick={cancel}>
          <XCircle size={24} />
        </MenuItemModalClose>
        <MenuItemComponent addItem={addItem} cancel={cancel} />
        {/* {item && (
          <Builder
            menuItem={item}
            soldOut={soldOut}
            allergens={allergens}
            addItemToCart={addItem}
            renderHeader={(props) => <BuilderHeader {...props} />}
            renderOption={(props) => <BuilderOption {...props} />}
            showImage={true}
            displaySettings={displaySettings}
            iconMap={menuItemsIconMap}
            closeModal={cancel}
            cartId={cartId}
            spinner={<ImageSpinner />}
            pointsIcon={pointsIcon}
          />
        )} */}
      </MenuItemModalContent>
    </MenuItemModalView>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  close: propTypes.func,
}

export default MenuItem
