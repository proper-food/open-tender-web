import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../../slices'
import iconMap from '../../iconMap'

const MenuItemCloseX = styled('button')`
  position: fixed;
  z-index: 2;
  top: 1.5rem;
  right: 1.5rem;
  display: inline;
  font-size: inherit;
  color: ${(props) => props.theme.links.primary.color};

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.links.primary.hover};
  }

  &:disabled {
    color: ${(props) => props.theme.links.primary.color};
    opacity: 0.5;
  }
`

const MenuItemCloseButton = styled('div')`
  position: fixed;
  z-index: 2;
  top: 1.5rem;
  right: 1.5rem;

  button {
    padding: 0.7rem 1.2rem 0.7rem 1rem;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bgColors.primary};
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.4);

    > span > span {
      margin-right: 0.4rem;
    }
  }
`

const MenuItemClose = ({ onClick, isButton = false }) => {
  const dispatch = useDispatch()
  const handleClose = useMemo(() => onClick || (() => dispatch(closeModal())), [
    onClick,
    dispatch,
  ])

  return isButton ? (
    <MenuItemCloseButton>
      <ButtonStyled
        icon={iconMap.X}
        onClick={handleClose}
        size="small"
        color="header"
      >
        Close
      </ButtonStyled>
    </MenuItemCloseButton>
  ) : (
    <MenuItemCloseX onClick={handleClose} aria-label="Close dialog">
      <X size={20} />
    </MenuItemCloseX>
  )
}

MenuItemClose.displayName = 'MenuItemClose'
MenuItemClose.propTypes = {
  onClick: propTypes.func,
  isButton: propTypes.bool,
}

export default MenuItemClose
