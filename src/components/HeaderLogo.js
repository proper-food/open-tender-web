import React from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'

import { selectBrand } from '../slices'

const HeaderLogoLink = styled('a')`
  display: block;
  max-width: 14rem;
  margin: 0.4rem 0 0;
  // margin-left: ${(props) => (props.isMobile ? '1.5rem' : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 14rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderLogo = ({ useLight = false }) => {
  const brand = useSelector(selectBrand)
  const logoUrl = useLight ? brand.logoLight : brand.logo

  return (
    <HeaderLogoLink
      isMobile={isMobile}
      // href={brand.url}
      href="/"
      rel="noopener noreferrer"
    >
      <img src={logoUrl} alt="logo" />
    </HeaderLogoLink>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
