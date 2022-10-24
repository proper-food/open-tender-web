import { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuItemGroupsNavScroll from './MenuItemGroupsNavScroll'

const MenuItemGroupsNavView = styled.div`
  label: MenuItemGroupsNavView;
  width: 100%;
  height: 4.5rem;
`

const MenuItemGroupsNavInner = styled.div`
  width: 100%;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  border-width: 0;
  border-bottom-width: ${(props) => props.theme.border.width};
  background-color: ${(props) => props.theme.bgColors.primary};
  ${(props) =>
    props.stuck &&
    `position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
      width: 100%;`}
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

const MenuItemGroupsNav = ({
  items,
  scrollContainer,
  headerOffset,
  headerHeight,
}) => {
  const [stuck, setStuck] = useState(false)
  const stickyRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current && headerOffset !== null) {
        setStuck(stickyRef.current.getBoundingClientRect().top <= headerOffset)
      }
    }
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', () => handleScroll)
    }
  }, [headerOffset, scrollContainer])

  return (
    <MenuItemGroupsNavView ref={stickyRef}>
      <MenuItemGroupsNavInner stuck={stuck}>
        <MenuItemGroupsNavContainer>
          <MenuItemGroupsNavScroll
            items={items}
            scrollContainer={scrollContainer}
            headerOffset={headerOffset}
            headerHeight={headerHeight}
          />
        </MenuItemGroupsNavContainer>
      </MenuItemGroupsNavInner>
    </MenuItemGroupsNavView>
  )
}

MenuItemGroupsNav.displayName = 'MenuItemGroupsNav'
MenuItemGroupsNav.propTypes = {
  items: propTypes.array,
  scrollContainer: propTypes.any,
  headerHeight: propTypes.number,
  headerOffset: propTypes.number,
}

export default MenuItemGroupsNav
