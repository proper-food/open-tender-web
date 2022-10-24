import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import MenuItemGroupHeaderAlt from './MenuItemGroupHeaderAlt'
import MenuItemGroupsNav from './MenuItemGroupsNav'
import MenuItemOption from './MenuItemOption'
import MenuItemOptionSquare from './MenuItemOptionSquare'

const MenuItemGroupsView = styled.div`
  // padding-top: ${(props) => props.theme.layout.navHeight};
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   padding-top: 6rem;
  // }
`

const MenuItemGroupsList = styled.div`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: 4.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 4.5rem 0;
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
`

const MenuItemOptionsSquare = styled.div`
  margin: 2rem -0.6rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
`

const MenuItemGroups = ({
  builtItem,
  allergenAlerts,
  displaySettings,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
  scrollContainer,
  headerOffset,
  headerHeight,
}) => {
  const { groups } = builtItem
  const nonSizeGroups = groups.filter((i) => !i.isSize)
  const navItems = nonSizeGroups.map(({ name }) => name)
  const { modifiersType } = displaySettings
  const showCards = modifiersType === 'CARDS'

  return (
    <MenuItemGroupsView>
      {scrollContainer && (
        <MenuItemGroupsNav
          items={navItems}
          scrollContainer={scrollContainer}
          headerOffset={headerOffset}
          headerHeight={headerHeight}
        />
      )}
      <MenuItemGroupsList>
        {nonSizeGroups.map((group) => (
          <MenuItemGroup key={group.id} id={slugify(group.name)} name="section">
            <MenuItemGroupHeaderAlt group={group} />
            {showCards ? (
              <MenuItemOptionsSquare>
                {group.options.map((option) => (
                  <MenuItemOptionSquare
                    key={`${group.id}-${option.id}`}
                    group={group}
                    option={option}
                    incrementOption={incrementOption}
                    decrementOption={decrementOption}
                  />
                ))}
              </MenuItemOptionsSquare>
            ) : (
              <MenuItemOptions>
                {group.options.map((option, index) => (
                  <MenuItemOption
                    key={`${group.id}-${option.id}`}
                    index={index}
                    group={group}
                    option={option}
                    toggleOption={toggleOption}
                    incrementOption={incrementOption}
                    decrementOption={decrementOption}
                    setOptionQuantity={setOptionQuantity}
                  />
                ))}
              </MenuItemOptions>
            )}
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
  scrollContainer: propTypes.any,
  headerHeight: propTypes.number,
  headerOffset: propTypes.number,
}

export default MenuItemGroups
