import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { MenuItemContainer, MenuItemImage, MenuItemOverlay } from './MenuItem'
import { MenuItemButton } from '.'

const MenuRevenueCenterView = styled('div')`
  position: relative;
  width: 16.66667%;
  padding: ${(props) => props.theme.layout.padding};
  padding-bottom: 0;
  padding-left: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 20%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 25%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 33.33333%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
    padding-left: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 50%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
    padding-left: 0;
  }
`

const MenuRevenueCenterLogo = styled('img')`
  display: block;
  width: 75%;
  max-width: 24rem;
`

const MenuRevenueCenter = ({ revenueCenter, change }) => {
  const logo = revenueCenter.small_image_url

  const handleClick = (evt) => {
    evt.preventDefault()
    change(revenueCenter)
    evt.target.blur()
  }

  return (
    <MenuRevenueCenterView>
      <MenuItemContainer>
        <MenuItemButton onPointerUp={handleClick}>
          <MenuItemImage style={{ margin: '0' }}>
            <MenuItemOverlay>
              <MenuRevenueCenterLogo src={logo} alt={revenueCenter.name} />
            </MenuItemOverlay>
          </MenuItemImage>
        </MenuItemButton>
      </MenuItemContainer>
    </MenuRevenueCenterView>
  )
}

MenuRevenueCenter.displayName = 'MenuRevenueCenter'
MenuRevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  change: propTypes.func,
}

export default MenuRevenueCenter
