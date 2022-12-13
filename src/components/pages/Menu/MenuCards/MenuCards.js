import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuCard from './MenuCard'

const MenuCardsView = styled.div`
  margin: 0 auto;
`

const MenuCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: -1rem;
  flex-wrap: wrap;
`

const MenuCards = ({ categories }) => {
  if (!categories || !categories.length) return null

  return (
    <MenuCardsView>
      <MenuCardsContainer>
        {categories.map((category, index) => (
          <MenuCard
            key={category.name}
            category={category}
            isLast={categories.length - 1 === index}
          />
        ))}
      </MenuCardsContainer>
    </MenuCardsView>
  )
}

MenuCards.displayName = 'MenuCards'
MenuCards.propTypes = {
  categories: propTypes.array,
}

export default MenuCards
