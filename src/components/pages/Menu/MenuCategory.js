import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

import { selectDisplaySettings } from '../../../slices'
import { Container } from '../..'
import MenuCategoryHeader from './MenuCategoryHeader'
import MenuItems from './MenuItems'
import MenuItem from './MenuItem'

export const MenuCategoryView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuCategory = ({ category, isChild }) => {
  const { itemsTwoPerRowMobile: showTwo } = useSelector(selectDisplaySettings)
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
          <MenuItems perRow={showTwo ? 2 : 1}>
            {category.items.map((item, index) => (
              <MenuItem key={`${item.id}-${index}`} item={item} />
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
