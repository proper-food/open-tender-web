import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuItemGroupHeader from './MenuItemGroupHeader'
import MenuItemRadioGroup from './MenuItemRadioGroup'
import { Minus, Plus } from '../../icons'

const quantityIconMap = {
  plus: <Plus strokeWidth={2} />,
  minus: <Minus strokeWidth={2} />,
}

const MenuItemGroupsView = styled.div``

const MenuItemGroup = styled.div`
  margin: 0 0 3rem;
`

const MenuItemOptions = styled.div`
  width: 100%;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};
`

const MenuItemGroups = ({
  builtItem,
  allergenAlerts,
  displaySettings,
  renderOption,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
}) => {
  const { groups } = builtItem
  return (
    <MenuItemGroupsView>
      {groups.map((group) => (
        <MenuItemGroup key={group.id}>
          <MenuItemGroupHeader group={group} />
          <MenuItemOptions>
            {group.min === 1 && group.max === 1 ? (
              <MenuItemRadioGroup
                group={group}
                handler={toggleOption}
                displaySettings={displaySettings}
              />
            ) : (
              group.options.map((option) => {
                const optionProps = {
                  key: `${group.id}-${option.id}`,
                  group,
                  option,
                  adjust: (quantity) =>
                    setOptionQuantity(group.id, option.id, quantity),
                  increment: () => incrementOption(group.id, option.id),
                  decrement: () => decrementOption(group.id, option.id),
                  allergens: allergenAlerts,
                  iconMap: quantityIconMap,
                  displaySettings,
                }
                return renderOption(optionProps)
              })
            )}
          </MenuItemOptions>
        </MenuItemGroup>
      ))}
    </MenuItemGroupsView>
  )
}

MenuItemGroups.displayName = 'MenuItemGroups'
MenuItemGroups.propTypes = {
  builtItem: propTypes.object,
  allergenAlerts: propTypes.array,
  displaySettings: propTypes.object,
  renderOption: propTypes.func,
  toggleOption: propTypes.func,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
  setOptionQuantity: propTypes.func,
}

export default MenuItemGroups
