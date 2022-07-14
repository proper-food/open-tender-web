import propTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import MenuItemGroupWarning from './MenuItemGroupWarning'

const MenuItemGroupHeaderView = styled('div')`
  display: flex;
  margin: 0 0 1rem;
  justify-content: space-between;
  align-items: flex-end;
`

const MenuItemGroupHeaderName = styled('h3')`
  margin-bottom: 0.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.h6};
`

const MenuItemGroupHeaderDescription = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const MenuItemGroupHeader = ({ group }) => {
  const { included, max } = group
  return (
    <MenuItemGroupHeaderView>
      <div>
        <MenuItemGroupHeaderName>
          {group.name}
          {included !== 0 && max !== 1 ? ` (${included} included)` : null}
        </MenuItemGroupHeaderName>
        <MenuItemGroupHeaderDescription>
          {group.description}
        </MenuItemGroupHeaderDescription>
      </div>
      <MenuItemGroupWarning {...group} />
    </MenuItemGroupHeaderView>
  )
}

MenuItemGroupHeader.displayName = 'MenuItemGroupHeader'
MenuItemGroupHeader.propTypes = {
  group: propTypes.object,
}

export default MenuItemGroupHeader
