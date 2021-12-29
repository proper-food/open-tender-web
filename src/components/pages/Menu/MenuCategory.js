import React from 'react'
import propTypes from 'prop-types'
import MenuItem from './MenuItem'
import styled from '@emotion/styled'
import { Container } from '../..'

export const MenuCategoryView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: ${(props) => (props.isChild ? '2rem 0 0' : '4rem 0 0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => (props.isChild ? '2rem 0 0' : '3rem 0 0')};
  }
`

export const MenuCategoryHeader = styled('div')`
  margin: 0 0 1rem;

  h2 {
    margin: 0 0 0 -0.1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  h3 {
    margin: 0 0 0 -0.1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }

  p {
    margin: 0.5rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItems = styled('div')`
  // display: flex;
  // flex-flow: row wrap;
  // justify-content: space-between;
  // align-items: stretch;
  display: grid;

  justify-content: center;
  align-items: stretch;
  padding: ${(props) => props.theme.layout.padding};
  gap: ${(props) => props.theme.layout.padding};
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 1560px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    gap: ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 0.6rem;
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
      {category.items.length > 0 && (
        <MenuItems>
          {category.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </MenuItems>
      )}
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
