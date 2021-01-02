import React from 'react'
import propTypes from 'prop-types'
import MenuItem from './MenuItem'
import styled from '@emotion/styled'
import { Container } from '../..'

const MenuCategoryView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: ${(props) => (props.isChild ? '2rem 0 0' : '6rem 0 0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => (props.isChild ? '1rem 0 0' : '4rem 0 0')};
  }
`

const MenuCategoryHeader = styled('div')`
  margin: 0 0 1rem;

  h2,
  h3 {
    margin: 0 0 0 -0.1rem;
  }

  p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const MenuItems = styled('div')`
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.layout.padding};
  padding-top: 0;
  padding-right: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-top: 0;
    padding-right: 0;
  }
`

const MenuCategory = ({ category, isChild }) => {
  return (
    <MenuCategoryView isChild={isChild}>
      <MenuCategoryHeader>
        <Container>
          {isChild ? <h3>{category.name}</h3> : <h2>{category.name}</h2>}
          {category.description && <p>{category.description}</p>}
        </Container>
      </MenuCategoryHeader>
      <MenuItems>
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </MenuItems>
    </MenuCategoryView>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
  isPreview: propTypes.bool,
}

export default MenuCategory
