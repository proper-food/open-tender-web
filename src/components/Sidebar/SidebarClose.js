import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'

import { toggleSidebar } from '../../slices'

const SidebarCloseView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0.7rem;
  right: 0.7rem;
`

const SidebarClose = () => {
  const dispatch = useDispatch()

  return (
    <SidebarCloseView>
      <ButtonLink
        onClick={() => dispatch(toggleSidebar())}
        label="Close cart & return to current page"
      >
        <X size={20} />
      </ButtonLink>
    </SidebarCloseView>
  )
}

SidebarClose.displayName = 'SidebarClose'
SidebarClose.propTypes = {
  classes: propTypes.string,
  handleClose: propTypes.func,
}

export default SidebarClose
