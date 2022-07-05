import propTypes from 'prop-types'
import MenuItem from './MenuItem'
import styled from '@emotion/styled'

import { Container } from '../..'
import MenuCategoryHeader from './MenuCategoryHeader'
import MenuItems from './MenuItems'

export const MenuCategoryView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuCategory = ({ category, isChild }) => {
  const { name, description } = category
  return (
    <MenuCategoryView isChild={isChild}>
      <Container>
        <MenuCategoryHeader
          title={name}
          subtitle={description}
          isChild={isChild}
        />
        {category.items.length > 0 && (
          <MenuItems>
            {category.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </MenuItems>
        )}
      </Container>
    </MenuCategoryView>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
}

export default MenuCategory
