import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuListItem from './MenuListItem'

const MenuListView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0 -2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
  }
`

const MenuList = ({ categories }) => {
  if (!categories || !categories.length) return null

  return (
    <MenuListView>
      {categories.map((category, index) => (
        <MenuListItem
          key={category.name}
          category={category}
          isLast={categories.length - 1 === index}
        />
      ))}
    </MenuListView>
  )
}

MenuList.displayName = 'MenuCards'
MenuList.propTypes = {
  categories: propTypes.array,
}

export default MenuList
