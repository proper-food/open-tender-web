import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { Container } from '../..'
import MenuBrowseCategory from './MenuBrowseCategory'

const MenuBrowseView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0 100rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuBrowseHeader = styled.div`
  padding: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    border: 0;
    border-style: solid;
    border-color: ${(props) => props.theme.buttons.colors.large.borderColor};
    border-bottom-width: ${(props) =>
      props.theme.buttons.sizes.large.borderWidth};
  }
`

const MenuBrowseTitle = styled(Heading)`
  line-height: 1;
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
      <MenuBrowseView id="full-menu">
        <MenuBrowseHeader>
          <MenuBrowseTitle>Browse by category</MenuBrowseTitle>
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
