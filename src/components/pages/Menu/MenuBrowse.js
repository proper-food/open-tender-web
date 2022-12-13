import { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { Heading } from '@open-tender/components'
import { Container } from '../..'
import { MenuContext } from './Menu'
import MenuCards from './MenuCards'
import MenuList from './MenuList'

const MenuBrowseView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  ${(props) =>
    props.hasTop ? '' : `margin-top: ${props.theme.layout.padding};`}
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
    ${(props) =>
      props.hasTop ? '' : `margin-top: ${props.theme.layout.paddingMobile};`}
  }
`

const MenuBrowseHeader = styled.div`
  padding: 0 0 1rem;
`

const MenuBrowseTitle = styled(Heading)`
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuBrowse = ({ categories, isRcs }) => {
  const { hasTop, displaySettings } = useContext(MenuContext)
  const { categoryType, categoryTypeMobile } = displaySettings
  const displayType = isMobile ? categoryTypeMobile : categoryType

  if (!categories || !categories.length) return null

  return (
    <Container>
      <MenuBrowseView id="full-menu" hasTop={hasTop}>
        {hasTop && (
          <MenuBrowseHeader>
            <MenuBrowseTitle>
              Browse by {isRcs ? 'Vendor' : 'Category'}
            </MenuBrowseTitle>
          </MenuBrowseHeader>
        )}
        {displayType === 'VERTICAL' ? (
          <MenuCards categories={categories} />
        ) : (
          <MenuList categories={categories} />
        )}
      </MenuBrowseView>
    </Container>
  )
}

MenuBrowse.displayName = 'MenuBrowse'
MenuBrowse.propTypes = {
  categories: propTypes.array,
  isRcs: propTypes.bool,
}

export default MenuBrowse
