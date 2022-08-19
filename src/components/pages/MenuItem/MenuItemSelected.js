import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Body } from '@open-tender/components'
import { X } from '../../icons'
import MenuItemSelectedCount from './MenuItemSelectedCount'

const MenuItemSelectedView = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  // background-color: pink;
  // margin: 1rem 0 0;
  padding: 0.5rem ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0.5rem ${(props) => props.theme.layout.paddingMobile} 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const MenuItemSelectedOption = styled.span`
  position: relative;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0.2rem 0.7rem;
  margin: 0 0.5rem 0 0;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const MenuItemSelectedOptionContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemSelectedOptionName = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const MenuItemSelectedOptionRemove = styled.button`
  display: block;
  margin: 0 0 0 0.5rem;
`

const makeSelected = (groups) => {
  if (!groups || !groups.length) return []
  const options = groups.reduce((arr, group) => {
    const options = group.options.filter((option) => option.quantity > 0)
    const withGroups = options.map((option) => ({ ...option, group }))
    return [...arr, ...withGroups]
  }, [])
  return options
}

const MenuItemSelected = ({ groups, decrementOption }) => {
  const selected = makeSelected(groups)
  const reversed = [...selected.reverse()]

  if (!reversed.length) return null

  const decrement = (option) => {
    decrementOption(option.group.id, option.id)
  }

  return (
    <MenuItemSelectedView>
      {reversed.map((option) => (
        <MenuItemSelectedOption>
          {option.quantity > 1 ? (
            <MenuItemSelectedCount count={option.quantity} />
          ) : null}
          <MenuItemSelectedOptionContainer>
            <MenuItemSelectedOptionName>
              {option.name}
            </MenuItemSelectedOptionName>
            <MenuItemSelectedOptionRemove onClick={() => decrement(option)}>
              <X size={10} />
            </MenuItemSelectedOptionRemove>
          </MenuItemSelectedOptionContainer>
        </MenuItemSelectedOption>
      ))}
    </MenuItemSelectedView>
  )
}

MenuItemSelected.displayName = 'MenuItemSelected'
MenuItemSelected.propTypes = {
  currentOptions: propTypes.array,
}

export default MenuItemSelected
