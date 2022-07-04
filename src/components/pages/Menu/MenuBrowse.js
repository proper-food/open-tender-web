import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { Container } from '../..'
import MenuBrowseCategory from './MenuBrowseCategory'

const MenuBrowseView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuBrowseHeader = styled.div`
  margin: 0 0 2rem;
`

const MenuBrowseTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuBrowseCategories = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0 -2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
  }
`

const MenuBrowse = ({ categories }) => {
  if (!categories || !categories.length) return null
  return (
    <Container>
      <MenuBrowseView>
        <MenuBrowseHeader>
          <MenuBrowseTitle>Menu</MenuBrowseTitle>
        </MenuBrowseHeader>
        <MenuBrowseCategories>
          {categories.map((category) => (
            <MenuBrowseCategory key={category.name} category={category} />
          ))}
        </MenuBrowseCategories>
      </MenuBrowseView>
    </Container>
  )
}

MenuBrowse.displayName = 'MenuBrowse'
MenuBrowse.propTypes = {
  categories: propTypes.array,
}

export default MenuBrowse
