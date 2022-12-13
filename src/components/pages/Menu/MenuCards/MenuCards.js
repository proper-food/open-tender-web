import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuCard from './MenuCard'

const MenuCardsView = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.categories.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: ${(props) => props.theme.categories.mobile.containerMaxWidth};
  }
`

const MenuCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.theme.categories.desktop.justifyContent};
  margin: -${(props) => props.theme.categories.desktop.gap};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: ${(props) => props.theme.categories.mobile.justifyContent};
    margin: -${(props) => props.theme.categories.mobile.gap};
  }
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
