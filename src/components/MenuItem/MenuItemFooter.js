import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { ButtonStyled } from '@open-tender/components'
import { selectDisplaySettings } from '../../slices'

const MenuItemFooterView = styled.div`
  label: MenuItemFooter;
  flex: 0 0 auto;
  position: relative;
  padding: ${(props) => props.theme.layout.itemPadding};
  background-color: ${(props) => props.theme.bgColors.primary};
  // box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.9);
  box-shadow: 0 -15px 30px ${(props) => props.theme.overlay.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${(props) => props.theme.layout.itemPaddingMobile};
  }
`

const MenuItemFooterButtons = styled.div`
  margin: 0 -0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuItemFooterButton = styled.div`
  flex: 1 1 50%;
  padding: 0 0.6rem;

  button {
    width: 100%;
    height: 5rem;
    padding: 0;
  }
`

const MenuItemFooter = ({
  builtItem,
  addItem,
  cancel,
  hasCustomize,
  isCustomize,
  setIsCustomize,
}) => {
  const [init, setInit] = useState(true)
  const { skipToCustomize, skipToCustomizeMobile } = useSelector(
    selectDisplaySettings
  )
  const skip = isMobile ? skipToCustomizeMobile : skipToCustomize
  const { groups, quantity, totalPrice } = builtItem
  const sizeGroup = groups.find((g) => g.isSize)
  const missingSize = sizeGroup
    ? !sizeGroup.options.find((i) => i.quantity >= 1)
    : false
  const hasGroups = groups.filter((g) => !g.isSize).length > 0
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete = totalPrice === 0 || quantity === '' || groupsBelowMin
  const requiresCustomization = isIncomplete && !missingSize
  const shouldSkip = hasCustomize
    ? (hasGroups && skip) || requiresCustomization
    : false

  useEffect(() => {
    if (init) {
      setInit(false)
      if (shouldSkip) setIsCustomize(true)
    }
  }, [init, shouldSkip, setIsCustomize])

  return (
    <MenuItemFooterView>
      {!hasCustomize ? (
        <MenuItemFooterButtons>
          <MenuItemFooterButton>
            <ButtonStyled onClick={cancel} size="big" color="secondary">
              Nevermind
            </ButtonStyled>
          </MenuItemFooterButton>
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => addItem(builtItem)}
              disabled={isIncomplete}
              size="big"
            >
              Add To Order
            </ButtonStyled>
          </MenuItemFooterButton>
        </MenuItemFooterButtons>
      ) : isCustomize ? (
        <MenuItemFooterButtons>
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => setIsCustomize(false)}
              size="big"
              color="secondary"
            >
              Cancel
            </ButtonStyled>
          </MenuItemFooterButton>
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => setIsCustomize(false)}
              disabled={isIncomplete}
              size="big"
            >
              All Done
            </ButtonStyled>
          </MenuItemFooterButton>
        </MenuItemFooterButtons>
      ) : (
        <MenuItemFooterButtons>
          {hasGroups && (
            <MenuItemFooterButton>
              <ButtonStyled
                onClick={() => setIsCustomize(true)}
                size="big"
                color={requiresCustomization ? 'primary' : 'secondary'}
              >
                Customize
              </ButtonStyled>
            </MenuItemFooterButton>
          )}
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => addItem(builtItem)}
              disabled={isIncomplete}
              size="big"
            >
              Add To Order
            </ButtonStyled>
          </MenuItemFooterButton>
        </MenuItemFooterButtons>
      )}
    </MenuItemFooterView>
  )
}

MenuItemFooter.displayName = 'MenuItemFooter'
MenuItemFooter.propTypes = {
  builtItem: propTypes.object,
  addItem: propTypes.func,
  isCustomize: propTypes.bool,
  setIsCustomize: propTypes.func,
  setFooterHeight: propTypes.func,
}

export default MenuItemFooter
