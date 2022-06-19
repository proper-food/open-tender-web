import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage } from '@open-tender/components'

import { MenuItemContainer, MenuItemOverlay } from './MenuItem'
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

const MenuRevenueCenterImage = styled(BgImage)`
  position: relative;
  padding: 30% 0;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.border.radius};
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
  }

  return (
    <MenuRevenueCenterView>
      <MenuItemContainer>
        <MenuItemButton onClick={handleClick}>
          <MenuRevenueCenterImage style={{ margin: '0' }}>
            <MenuItemOverlay>
              <MenuRevenueCenterLogo src={logo} alt={revenueCenter.name} />
            </MenuItemOverlay>
          </MenuRevenueCenterImage>
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
