import { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import MenuItemGroupsNavScroll from './MenuItemGroupsNavScroll'

const MenuItemGroupsNavView = styled.div`
  label: MenuItemGroupsNavView;
  width: 100%;
  height: 4.5rem;
`

const MenuItemGroupsNavInner = styled.div`
  width: 100%;
  border-bottom: 0.05rem solid ${(props) => props.theme.border.color};
  // border-bottom-width: ${(props) => props.theme.border.width};
  background-color: ${(props) => props.theme.bgColors.primary};
  ${(props) =>
    props.stuck &&
    `position: fixed;
      z-index: 10;
      top: calc(${props.theme.layout.navHeight} + ${props.theme.layout.navHeight});
      right: 0;
      width: 64rem;`}
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    ${(props) =>
      props.stuck &&
      `position: fixed;
      z-index: 10;
      top: calc(${props.theme.layout.navHeightMobile} + ${props.theme.layout.navHeightMobile});
      right: 0;
      width: 100%;`}
  }
`

const MenuItemGroupsNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const MenuItemGroupsNav = ({ items }) => {
  const [stuck, setStuck] = useState(false)
  const stickyRef = useRef(null)
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isMobile ? navHeightMobile : navHeight
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels * 2

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setStuck(stickyRef.current.getBoundingClientRect().top <= topOffset)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [topOffset])

  return (
    <MenuItemGroupsNavView ref={stickyRef}>
      <MenuItemGroupsNavInner stuck={stuck}>
        <MenuItemGroupsNavContainer>
          <MenuItemGroupsNavScroll items={items} />
        </MenuItemGroupsNavContainer>
      </MenuItemGroupsNavInner>
    </MenuItemGroupsNavView>
  )
}

MenuItemGroupsNav.displayName = 'MenuItemGroupsNav'
MenuItemGroupsNav.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default MenuItemGroupsNav
