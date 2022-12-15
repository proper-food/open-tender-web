import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuCard from './MenuCard'

const MenuCardsView = styled.div`
  margin: ${(props) => props.theme.layout.padding} auto;
  max-width: ${(props) => props.theme.categories.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
    max-width: ${(props) => props.theme.categories.mobile.containerMaxWidth};
  }
`

const MenuCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.theme.categories.desktop.justifyContent};
  margin: -${(props) => props.theme.categories.desktop.gapHalf};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: ${(props) => props.theme.categories.mobile.justifyContent};
    margin: -${(props) => props.theme.categories.mobile.gapHalf};
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
