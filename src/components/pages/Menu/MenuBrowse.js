import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { selectCustomer } from '@open-tender/redux'
import { Heading } from '@open-tender/components'
import { Container } from '../..'
import MenuBrowseCategory from './MenuBrowseCategory'
import { useSelector } from 'react-redux'

const MenuBrowseView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  ${(props) =>
    props.isGuest ? `margin-top: ${props.theme.layout.padding};` : ''}
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
    ${(props) =>
      props.isGuest ? `margin-top: ${props.theme.layout.paddingMobile};` : ''}
  }
`

const MenuBrowseHeader = styled.div`
  padding: 0 0 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    // border: 0;
    // border-style: solid;
    // border-color: ${(props) => props.theme.buttons.colors.large.borderColor};
    // border-bottom-width: ${(props) =>
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
  const { auth } = useSelector(selectCustomer)
  if (!categories || !categories.length) return null
  return (
    <Container>
      <MenuBrowseView id="full-menu" isGuest={!auth}>
        {auth && (
          <MenuBrowseHeader>
            <MenuBrowseTitle>Full Menu</MenuBrowseTitle>
          </MenuBrowseHeader>
        )}
        <MenuBrowseCategories>
          {categories.map((category, index) => (
            <MenuBrowseCategory
              key={category.name}
              category={category}
              isLast={categories.length - 1 === index}
            />
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
