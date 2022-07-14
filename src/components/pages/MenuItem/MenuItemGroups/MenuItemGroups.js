import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import { Minus, Plus } from '../../../icons'
import MenuItemGroupHeader from './MenuItemGroupHeader'
import MenuItemRadioGroup from './MenuItemRadioGroup'
import MenuItemOption from './MenuItemOption'
import MenuItemGroupsNav from './MenuItemGroupsNav'

const quantityIconMap = {
  plus: <Plus strokeWidth={2} />,
  minus: <Minus strokeWidth={2} />,
}

const MenuItemGroupsView = styled.div``

const MenuItemGroupsList = styled.div`
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

const MenuItemGroup = styled.div`
  margin: 0 0 3rem;

  &:last-of-type {
    margin: 0;
  }
`

const MenuItemOptions = styled.div`
  width: 100%;
  // border-radius: ${(props) => props.theme.border.radius};
  // background-color: ${(props) => props.theme.bgColors.primary};
`

const MenuItemGroups = ({
  builtItem,
  allergenAlerts,
  displaySettings,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
}) => {
  const { groups } = builtItem
  const navItems = groups.map(({ name }) => name)

  return (
    <MenuItemGroupsView>
      <MenuItemGroupsNav items={navItems} />
      <MenuItemGroupsList>
        {groups.map((group) => (
          <MenuItemGroup key={group.id} id={slugify(group.name)} name="section">
            <MenuItemGroupHeader group={group} />
            <MenuItemOptions>
              {group.min === 1 && group.max === 1 ? (
                <MenuItemRadioGroup
                  group={group}
                  handler={toggleOption}
                  displaySettings={displaySettings}
                />
              ) : (
                group.options.map((option) => (
                  <MenuItemOption
                    key={`${group.id}-${option.id}`}
                    group={group}
                    option={option}
                    adjust={(quantity) =>
                      setOptionQuantity(group.id, option.id, quantity)
                    }
                    increment={() => incrementOption(group.id, option.id)}
                    decrement={() => decrementOption(group.id, option.id)}
                    allergens={allergenAlerts}
                    iconMap={quantityIconMap}
                    displaySettings={displaySettings}
                  />
                ))
              )}
            </MenuItemOptions>
          </MenuItemGroup>
        ))}
      </MenuItemGroupsList>
    </MenuItemGroupsView>
  )
}

MenuItemGroups.displayName = 'MenuItemGroups'
MenuItemGroups.propTypes = {
  builtItem: propTypes.object,
  allergenAlerts: propTypes.array,
  displaySettings: propTypes.object,
  toggleOption: propTypes.func,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
  setOptionQuantity: propTypes.func,
}

export default MenuItemGroups
