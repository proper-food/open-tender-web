import React from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'

import { selectBrand } from '../slices'
import { useNavigate } from 'react-router-dom'

const HeaderLogoLink = styled.a`
  display: block;
  max-width: 14rem;
  margin: 0.4rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 13rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderLogoButton = styled.button`
  display: block;
  max-width: 14rem;
  margin: 0.4rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 13rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderLogo = ({ useLight = false }) => {
  const navigate = useNavigate()
  const { url, logo, logoLight } = useSelector(selectBrand)
  const logoUrl = useLight ? logoLight : logo

  return url ? (
    <HeaderLogoLink isMobile={isMobile} href={url} rel="noopener noreferrer">
      <img src={logoUrl} alt="logo" />
    </HeaderLogoLink>
  ) : (
    <HeaderLogoButton onClick={() => navigate('/')}>
      <img src={logoUrl} alt="logo" />
    </HeaderLogoButton>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
