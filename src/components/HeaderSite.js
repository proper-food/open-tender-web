import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { ButtonStyled } from '@open-tender/components'

import { selectBrand } from '../slices'
import { ContainerSite } from '.'

const HeaderSiteView = styled('div')`
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  width: 100%;
  height: 9.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: ${(props) =>
    props.stuck ? props.theme.bgColors.dark : 'transparent'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const HeaderSiteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderSiteLogo = styled('div')`
  position: relative;
  z-index: 2;
  max-width: 18rem;
  margin: 0.4rem 0 0;
  margin-left: ${(props) => (props.isMobile ? '1.5rem' : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 14rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderSiteNav = styled.div`
  position: relative;
  z-index: 2;
  display: block;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  li {
    display: block;
    margin: 0 4rem 0 0;
  }

  a {
    color: ${(props) => props.theme.links.light.color};

    &:hover,
    &:active {
      color: ${(props) => props.theme.links.light.hover};
    }
  }
`

const links = [
  { path: '/menu', title: 'Menu' },
  { path: '/restaurants', title: 'Locations' },
  { path: '/catering', title: 'Catering' },
  { path: '/careers', title: 'Careers' },
  { path: '/about', title: 'About' },
]

const HeaderSite = ({ useLight = true, style = null }) => {
  const navigate = useNavigate()
  const header = useRef(null)
  const [stuck, setStuck] = useState(false)
  const { logo, logoLight, title } = useSelector(selectBrand)
  const logoUrl = useLight || stuck ? logoLight : logo

  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        setStuck(header.current.getBoundingClientRect().top < -50)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  return (
    <nav ref={header} role="navigation" aria-label="Primary Navigation">
      <HeaderSiteView stuck={stuck} isMobile={isMobile} style={style}>
        <ContainerSite>
          <HeaderSiteContainer>
            <HeaderSiteLogo>
              <Link to="/">
                <img src={logoUrl} alt={title} />
              </Link>
            </HeaderSiteLogo>
            <HeaderSiteNav useLight={useLight} stuck={stuck}>
              <ul>
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.title}</Link>
                  </li>
                ))}
              </ul>
              <ButtonStyled color="light" onClick={() => navigate('/guest')}>
                Order Now
              </ButtonStyled>
            </HeaderSiteNav>
          </HeaderSiteContainer>
        </ContainerSite>
      </HeaderSiteView>
    </nav>
  )
}

HeaderSite.displayName = 'HeaderSite'
HeaderSite.propTypes = {
  style: propTypes.object,
}

export default HeaderSite
