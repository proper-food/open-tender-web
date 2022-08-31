import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { getItemOptions } from '@open-tender/js'
import { Body, ButtonLink, Heading } from '@open-tender/components'
import MenuItemSelectedOption from './MenuItemSelectedOption'

const MenuItemSelectionsView = styled.div`
  margin: 2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1.5rem 0 0;
  }
`

const MenuItemSelectionsEdit = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemSelectionsTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.main};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemSelectionsContainer = styled.div`
  margin: 0.6rem 0 0;
  padding: 0 ${(props) => props.theme.layout.padding};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemSelectionsOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1.1rem 0 0;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }

  & > span {
    margin-bottom: 0.6rem;
  }
`

const MenuItemSelectionsIncomplete = styled(Body)`
  color: ${(props) => props.theme.colors.error};
`

const MenuItemSelections = ({
  groups,
  decrementOption,
  requiresCustomization,
  setIsCustomize,
}) => {
  const currentOptions = getItemOptions({ groups: groups })
  const hasSelections = currentOptions.length > 0

  return (
    <MenuItemSelectionsView>
      <MenuItemSelectionsEdit>
        <MenuItemSelectionsTitle>Current Selections: </MenuItemSelectionsTitle>
        <ButtonLink onClick={() => setIsCustomize(true)}>
          {hasSelections ? 'edit selections' : 'customize item'}
        </ButtonLink>
      </MenuItemSelectionsEdit>
      {hasSelections ? (
        <MenuItemSelectionsOptions>
          {currentOptions.map((option, index) => (
            <MenuItemSelectedOption
              key={`${option.id}-${index}`}
              option={option}
            />
          ))}
        </MenuItemSelectionsOptions>
      ) : (
        <MenuItemSelectionsContainer>
          {requiresCustomization ? (
            <MenuItemSelectionsIncomplete>
              requires customization
            </MenuItemSelectionsIncomplete>
          ) : (
            <Body>nothing selected</Body>
          )}
        </MenuItemSelectionsContainer>
      )}
    </MenuItemSelectionsView>
  )
}

MenuItemSelections.displayName = 'MenuItemSelections'
MenuItemSelections.propTypes = {
  groups: propTypes.array,
  decrementOption: propTypes.func,
  requiresCustomization: propTypes.bool,
  setIsCustomize: propTypes.func,
}

export default MenuItemSelections
