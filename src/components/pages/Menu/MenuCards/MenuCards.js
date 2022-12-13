import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuCard from './MenuCard'

const MenuCardsView = styled.div`
  display: grid;
  justify-content: center;
  padding: 0;
  margin: 2rem 0 0;
  gap: ${(props) => props.theme.layout.padding};
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1350px) {
    grid-template-columns: repeat(3, 1fr);
  }
  // @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: 650px) {
    margin: 1rem 0 0;
    column-gap: 1.5rem;
    row-gap: ${(props) => props.theme.layout.paddingMobile};
    grid-template-columns: repeat(2, 1fr);
  }
`

const MenuCards = ({ categories }) => {
  if (!categories || !categories.length) return null

  return (
    <MenuCardsView>
      {categories.map((category, index) => (
        <MenuCard
          key={category.name}
          category={category}
          isLast={categories.length - 1 === index}
        />
      ))}
    </MenuCardsView>
  )
}

MenuCards.displayName = 'MenuCards'
MenuCards.propTypes = {
  categories: propTypes.array,
}

export default MenuCards
