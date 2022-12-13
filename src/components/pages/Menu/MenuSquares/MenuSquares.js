import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuSquare from './MenuSquare'

const MenuSquaresView = styled.div`
  margin: 0 auto;
`

const MenuSquaresContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: -1rem;
  flex-wrap: wrap;
`

const MenuSquares = ({ categories }) => {
  if (!categories || !categories.length) return null

  return (
    <MenuSquaresView>
      <MenuSquaresContainer>
        {categories.map((category, index) => (
          <MenuSquare
            key={category.name}
            category={category}
            isLast={categories.length - 1 === index}
          />
        ))}
      </MenuSquaresContainer>
    </MenuSquaresView>
  )
}

MenuSquares.displayName = 'MenuSquares'
MenuSquares.propTypes = {
  categories: propTypes.array,
}

export default MenuSquares
