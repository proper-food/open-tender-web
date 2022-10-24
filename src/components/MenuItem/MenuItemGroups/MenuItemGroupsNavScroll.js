import { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'

const MenuItemGroupsNavScrollButtonView = styled.button`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  padding: 1rem 0 0;
  height: 4.5rem;
`

const MenuItemGroupsNavScrollButton = ({ name, active, offset = 0 }) => {
  const id = slugify(name)

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById(id)
    const position = element.offsetTop - offset
    scroll.scrollTo(position, {
      containerId: 'menu-item-content',
      duration: 500,
      smooth: true,
      offset: 0,
    })
    const items = element.querySelectorAll('button')
    const firstItem = items.length ? items[0] : null
    if (firstItem) firstItem.focus()
  }

  return (
    <MenuItemGroupsNavScrollButtonView onClick={onClick}>
      {name}
    </MenuItemGroupsNavScrollButtonView>
  )
}

const MenuItemGroupsNavScrollView = styled.div`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 4.5rem;

    li {
      display: block;
      flex-shrink: 0;
      padding: 0 0 0 ${(props) => props.theme.layout.padding};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        padding-left: ${(props) => props.theme.layout.paddingMobile};
      }

      &:last-child {
        padding-right: ${(props) => props.theme.layout.padding};
        @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
          padding-right: ${(props) => props.theme.layout.paddingMobile};
        }
      }
    }
  }
`

// https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
const smoothHorizontalScrolling = (container, time, amount, start) => {
  let eAmt = amount / 100
  let curTime = 0
  let scrollCounter = 0
  while (curTime <= time) {
    window.setTimeout(shs, curTime, container, scrollCounter, eAmt, start)
    curTime += time / 100
    scrollCounter++
  }
}

const shs = (e, scrollCounter, eAmt, start) => {
  const scrolledAmount = eAmt * scrollCounter + start
  e.scrollLeft = scrolledAmount
}

const getActiveElement = (elements, navOffset) => {
  return elements
    .filter((i) => i.getBoundingClientRect().top <= navOffset)
    .reduce((max, i) => {
      return max &&
        max.getBoundingClientRect().top > i.getBoundingClientRect().top
        ? max
        : i
    }, null)
}

const MenuItemGroupsNavScroll = ({
  items,
  scrollContainer,
  headerHeight,
  headerOffset,
}) => {
  const navRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const [sections, setSections] = useState([])
  const [current, setCurrent] = useState(null)
  const navBarHeight = navRef.current?.offsetHeight || 45
  const topOffset = headerOffset + navBarHeight
  const paddingTop = 20
  const navOffset = topOffset + paddingTop
  const elements = Array.from(document.getElementsByName('section'))
  const scrollOffset = (navBarHeight || 45) + paddingTop - 1

  useEffect(() => {
    const handleScroll = () => {
      if (elements.length) {
        setActive(getActiveElement(elements, navOffset + 10))
      }
    }
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', () => handleScroll)
    }
  }, [navOffset, elements, active, scrollContainer])

  useEffect(() => {
    const navSections = Array.from(
      document.getElementsByClassName('nav-section')
    ).reduce((arr, i) => {
      return [
        ...arr,
        { name: i.id.replace('nav-', ''), offset: i.getBoundingClientRect().x },
      ]
    }, [])
    setSections(navSections)
  }, [])

  useEffect(() => {
    if (active && sections.length) {
      if (active.id === current) return
      const currentSection =
        sections.find((i) => i.name === current) || sections[0]
      const activeSection = sections.find((i) => i.name === active.id)
      if (!currentSection || !activeSection) return
      const start = currentSection.offset - sections[0].offset
      const amountToMove = activeSection.offset - currentSection.offset
      if (navRef.current) {
        smoothHorizontalScrolling(navRef.current, 250, amountToMove, start)
      }
      setCurrent(active.id)
    }
  }, [active, current, sections])

  return (
    <MenuItemGroupsNavScrollView ref={navRef}>
      <ul ref={listRef}>
        {items.map((name, index) => {
          const sectionId = slugify(name)
          const activeId = active ? active.id : null
          return (
            <li
              key={`${sectionId}-${index}`}
              id={`nav-${sectionId}`}
              className="nav-section"
            >
              <MenuItemGroupsNavScrollButton
                name={name}
                offset={scrollOffset}
                active={activeId === sectionId}
              />
            </li>
          )
        })}
      </ul>
    </MenuItemGroupsNavScrollView>
  )
}

MenuItemGroupsNavScroll.displayName = 'MenuItemGroupsNavScroll'
MenuItemGroupsNavScroll.propTypes = {
  items: propTypes.array,
  scrollContainer: propTypes.any,
  headerHeight: propTypes.number,
  headerOffset: propTypes.number,
}

export default MenuItemGroupsNavScroll
