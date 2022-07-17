import { useContext, useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { animateScroll as scroll } from 'react-scroll'
import {
  selectCustomer,
  selectCustomerFavorites,
  selectCustomerOrders,
  selectMenuSlug,
} from '@open-tender/redux'
import {
  capitalize,
  makeFavorites,
  makeFeatured,
  makeMenuItemLookup,
  makeRecents,
  makeUniqueDisplayItems,
} from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { selectMenuSection, setMenuSection } from '../../../slices'
import { Container, Loading, SeeMoreLink } from '../..'
import { MenuContext } from './Menu'
import MenuItem from './MenuItem'

const MenuTopView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 0rem;
  }
`

const MenuTopNav = styled.div`
  flex: 1;
`

const MenuTopMore = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`

const MenuTopButtonView = styled.button`
  padding: 0 0 0.2rem;
  margin: 0 4rem 0 0;
  border-bottom: ${(props) => props.theme.border.width} solid transparent;
  border-color: ${(props) =>
    props.isActive ? props.theme.border.color : 'transparent'};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 3rem 0 0;
  }

  span {
    font-weight: ${(props) =>
      props.theme.fonts[props.isActive ? 'headings' : 'body'].weight};
  }
`

const MenuTopButton = ({ title, section, menuSection, onClick }) => {
  return (
    <MenuTopButtonView isActive={menuSection === section} onClick={onClick}>
      <MenuTopTitle>{title}</MenuTopTitle>
    </MenuTopButtonView>
  )
}

MenuTopButton.displayName = 'MenuTopButton'
MenuTopButton.propTypes = {
  section: propTypes.string,
  menuSection: propTypes.string,
  onClick: propTypes.func,
}

const MenuTopTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuTopItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  margin: 0 -${(props) => props.theme.layout.padding} -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile} -1.5rem;
  }
`

const MenuTopItemsItem = styled.div`
  flex: ${(props) => (props.count >= 4 ? '1' : '0')} 0 31rem;
  padding: 1.5rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: 1390px) {
    flex: 0 0 31rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 20rem;
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  & > div {
    height: 100%;
  }
`

const MenuTop = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isBrowser ? navHeight : navHeightMobile
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels + 30
  const menuSection = useSelector(selectMenuSection)
  const { auth } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const { categories, soldOut, menuContent } = useContext(MenuContext)
  const { displayed: displayedDesktop, displayedMobile } = menuContent
  const displayed = isBrowser ? displayedDesktop : displayedMobile
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])

  // handle featured
  const featured = makeFeatured(categories)

  // handle favorites
  const favs = useSelector(selectCustomerFavorites)
  const favorites = useMemo(
    () => makeFavorites(favs.entities, itemLookup, soldOut),
    [favs.entities, itemLookup, soldOut]
  )
  const hasFavorites = favorites && favorites.length > 0
  const loadingFavs = favs.loading === 'pending' && !hasFavorites ? true : false

  // handle recents
  const orders = useSelector(selectCustomerOrders)
  const displayItems = useMemo(
    () => makeUniqueDisplayItems(orders.entities),
    [orders.entities]
  )
  const recents = useMemo(
    () => makeRecents(displayItems, itemLookup, soldOut),
    [displayItems, itemLookup, soldOut]
  )
  const hasRecents = recents.length > 0
  const loadingRecents =
    orders.loading === 'pending' && !hasRecents ? true : false

  // tie it all together
  const sections = {
    FEATURED: featured,
    RECENTS: recents,
    FAVORITES: favorites,
  }
  const displayedSections = displayed.reduce((obj, i) => {
    return sections[i] ? { ...obj, [i]: sections[i] } : obj
  }, {})
  const displayedKeys = Object.keys(displayedSections)
  const firstSection = displayedKeys[0] || null
  const currentSection = displayedSections[menuSection] || []
  const hasSection = currentSection.length > 0
  const currentTitle = isBrowser ? ` ${capitalize(menuSection)}` : ''
  const currentDisplayed = currentSection.slice(0, 4)
  const displayMore = currentSection.length > 4

  const isLoading = loadingRecents || loadingFavs
  const hasItems = displayedKeys.length > 0
  const showLoading = isLoading && !hasItems

  const scrollToMenu = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById('full-menu')
    const position = element.offsetTop - topOffset
    scroll.scrollTo(position, {
      duration: 500,
      smooth: true,
      offset: 0,
    })
  }

  useEffect(() => {
    if (!hasSection) dispatch(setMenuSection(firstSection))
  }, [hasSection, firstSection, dispatch])

  if (!auth) return null

  if (!isLoading && !hasItems) return null

  return (
    <MenuTopView className="compact">
      <Container>
        {showLoading ? (
          <Loading text="Checking for recents and favorites..." />
        ) : (
          <>
            <MenuTopHeader>
              <MenuTopNav>
                {displayedKeys.map((section) => (
                  <MenuTopButton
                    title={capitalize(section)}
                    section={section}
                    menuSection={menuSection}
                    onClick={() => dispatch(setMenuSection(section))}
                  >
                    <MenuTopTitle>Recents</MenuTopTitle>
                  </MenuTopButton>
                ))}
                {isBrowser && (
                  <MenuTopButton
                    title="Full Menu"
                    section="FULL_MENU"
                    menuSection={menuSection}
                    onClick={scrollToMenu}
                  />
                )}
              </MenuTopNav>
              <MenuTopMore>
                {displayMore && (
                  <SeeMoreLink
                    text={`View All${currentTitle}`}
                    to={`${menuSlug}/${menuSection.toLowerCase()}`}
                  />
                )}
              </MenuTopMore>
            </MenuTopHeader>
            {currentDisplayed.length > 0 ? (
              <MenuTopItems>
                {currentDisplayed.map((item, index) => (
                  <MenuTopItemsItem
                    count={currentDisplayed.length}
                    key={`${menuSection}-${item.id}-${index}`}
                  >
                    <MenuItem item={item} />
                  </MenuTopItemsItem>
                ))}
              </MenuTopItems>
            ) : null}
          </>
        )}
      </Container>
    </MenuTopView>
  )
}

MenuTop.displayName = 'MenuTop'
MenuTop.propTypes = {}

export default MenuTop
