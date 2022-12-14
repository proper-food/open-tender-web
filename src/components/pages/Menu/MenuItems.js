import { Children } from 'react'
import styled from '@emotion/styled'

const MenuItemsView = styled.div`
  max-width: 100%;
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const MenuItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem;
`

const MenuItemsChild = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 25%;
  min-width: 30rem;
  padding: 1rem;
  display: flex;
`

const makeNumbers = (n) => {
  let numbers = []
  for (let i = 2; i <= n; i++) {
    numbers.push(i)
  }
  return numbers
}

const makeEmpty = (perRow, count) => {
  const numbers = makeNumbers(perRow)
  return numbers.reduce((arr, i, index) => {
    const leftOver = count % i
    return leftOver ? [...arr, index] : arr
  }, [])
}

const MenuItems = ({ children }) => {
  const perRow = 5
  const arrayChildren = Children.toArray(children)
  const count = arrayChildren.length
  const empty = makeEmpty(perRow, count)
  return (
    <MenuItemsView>
      <MenuItemsContainer>
        {Children.map(arrayChildren, (child) => (
          <MenuItemsChild>{child}</MenuItemsChild>
        ))}
        {empty.map((idx) => (
          <MenuItemsChild key={idx} />
        ))}
      </MenuItemsContainer>
    </MenuItemsView>
  )
}

export default MenuItems
