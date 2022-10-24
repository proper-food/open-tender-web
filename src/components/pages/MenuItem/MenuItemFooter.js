import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { Body, ButtonLink, ButtonStyled } from '@open-tender/components'
import React, { useCallback, useEffect, useState } from 'react'
import { selectDisplaySettings } from '../../../slices'
import { useSelector } from 'react-redux'

const MenuItemFooterView = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 0;
  right: 0;
  width: 64rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  // background-color: palegreen;
  padding: 1.5rem ${(props) => props.theme.layout.padding};
  box-shadow: ${(props) =>
    props.isCustomize
      ? '0 -3px 6px rgba(0, 0, 0, 0.06), 0 -2px 4px rgba(0, 0, 0, 0.05)'
      : 'none'};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 1.5rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const MenuItemFooterButtons = styled.div`
  height: 100%;
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
    padding-top: 0;
    padding-bottom: 0;

    // &:disabled {
    //   opacity: 1;
    //   color: ${(props) => props.theme.colors.primary};
    //   background-color: ${(props) => props.theme.bgColors.tertiary};
    //   border-color: ${(props) => props.theme.bgColors.tertiary};
    //   box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.05);
    // }
  }
`

const MenuItemFooterWarning = styled.div`
  padding: 0 0 1.5rem;
  text-align: center;

  p {
    color: ${(props) => props.theme.colors.error};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemFooter = ({
  builtItem,
  addItem,
  cancel,
  isCustomize,
  setIsCustomize,
  setFooterHeight,
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
  const hasCustomize = groups.filter((g) => !g.isSize).length > 0
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete = totalPrice === 0 || quantity === '' || groupsBelowMin
  const requiresCustomization = isIncomplete && !missingSize
  const shouldSkip = (hasCustomize && skip) || requiresCustomization

  useEffect(() => {
    if (init) {
      setInit(false)
      if (shouldSkip) setIsCustomize(true)
    }
  }, [init, shouldSkip, setIsCustomize])

  const onRefChange = useCallback(
    (node) => {
      if (node !== null) {
        setFooterHeight(node.offsetHeight)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isIncomplete, setFooterHeight]
  )

  return (
    <MenuItemFooterView ref={onRefChange} isCustomize={isCustomize}>
      {isIncomplete ? (
        <MenuItemFooterWarning>
          {isCustomize ? (
            <Body as="p">
              Certain groups are below their minimums and require selections.
            </Body>
          ) : (
            <Body as="p">
              {missingSize
                ? 'Please select a size to add to bag!'
                : 'Item requires customization. Tap the Customize button.'}
            </Body>
          )}
        </MenuItemFooterWarning>
      ) : !isCustomize && !isMobile ? (
        <MenuItemFooterWarning>
          <p>
            <ButtonLink onClick={cancel}>
              Cancel and head back to menu
            </ButtonLink>
          </p>
        </MenuItemFooterWarning>
      ) : null}
      {isCustomize ? (
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
          {hasCustomize && (
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
