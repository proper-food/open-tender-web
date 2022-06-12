import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import iconMap from '../iconMap'
import { selectBrand } from '../../slices'

const HeaderLogoButton = styled('button')`
  max-width: 14rem;
  margin: 0.4rem 0 0 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-left: 2.5rem;
  }

  img {
    pointer-events: none;
  }
`

const StartOver = ({
  text = 'Order Type',
  icon = iconMap.ArrowLeft,
  isLogo = false,
  color,
}) => {
  const navigate = useNavigate()
  const brand = useSelector(selectBrand)
  const logoUrl = isBrowser ? brand.logo : brand.logoLight

  const startOver = () => {
    navigate(`/order-type`)
  }

  return isBrowser ? (
    isLogo ? (
      <HeaderLogoButton onClick={startOver}>
        <img src={logoUrl} alt="logo" />
      </HeaderLogoButton>
    ) : (
      <ButtonStyled
        onClick={startOver}
        icon={icon}
        color="header"
        size="header"
      >
        {text}
      </ButtonStyled>
    )
  ) : (
    <ButtonIcon label={text} color={color} onClick={startOver}>
      {icon}
    </ButtonIcon>
  )
}

StartOver.displayName = 'StartOver'
StartOver.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default StartOver
