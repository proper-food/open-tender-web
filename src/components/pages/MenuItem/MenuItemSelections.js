import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Body, ButtonLink, Heading } from '@open-tender/components'

const MenuItemSelectionsView = styled.p`
  margin: 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }

  &.isCustomize {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemSelectionsEdit = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0.5rem;
  // background-color: palegreen;
`

const MenuItemSelectionsTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.main};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemSelectionsOptions = styled(Body)``

const MenuItemSelectionsIncomplete = styled.span`
  color: ${(props) => props.theme.colors.error};
`

const MenuItemSelections = ({
  currentOptions,
  requiresCustomization,
  isCustomize,
  setIsCustomize,
}) => {
  const klass = isCustomize ? 'isCustomize' : ''
  const currentSelections = currentOptions
    .map((i) => {
      return i.quantity === 1 ? i.name : `${i.name} x ${i.quantity}`
    })
    .join(', ')

  return (
    <MenuItemSelectionsView className={klass}>
      {!isCustomize && (
        <MenuItemSelectionsEdit>
          <MenuItemSelectionsTitle>
            Current Selections:{' '}
          </MenuItemSelectionsTitle>
          <ButtonLink onClick={() => setIsCustomize(true)}>
            {currentSelections ? 'edit selections' : 'customize item'}
          </ButtonLink>
        </MenuItemSelectionsEdit>
      )}
      <MenuItemSelectionsOptions>
        {currentSelections ? (
          <span>{currentSelections}</span>
        ) : isCustomize ? (
          <span>please make your selections below</span>
        ) : requiresCustomization ? (
          <MenuItemSelectionsIncomplete>
            requires customization
          </MenuItemSelectionsIncomplete>
        ) : (
          <span>nothing selected</span>
        )}
      </MenuItemSelectionsOptions>
    </MenuItemSelectionsView>
  )
}

MenuItemSelections.displayName = 'MenuItemSelections'
MenuItemSelections.propTypes = {
  currentOptions: propTypes.array,
  requiresCustomization: propTypes.bool,
  isCustomize: propTypes.bool,
  setIsCustomize: propTypes.func,
}

export default MenuItemSelections
