import { useContext, useMemo } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { setCurrentItem } from '@open-tender/redux'
import { makeMenuItemLookup } from '@open-tender/js'
import { Body, ButtonLink, Heading } from '@open-tender/components'
import { UpsellItem } from '../..'
import { MenuContext } from '../Menu/Menu'
import MenuItemUpsellOverlay from './MenuItemUpsellOverlay'
import { isBrowser } from 'react-device-detect'
import { selectContentSection } from '../../../slices'

const MenuItemUpsellView = styled.div`
  position: fixed;
  z-index: 16;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile} 0;
  }
`

const MenuItemUpsellHeader = styled.div`
  text-align: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const MenuItemUpsellTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuItemUpsellSubtitle = styled(Body)`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemUpsellDecline = styled.div`
  margin: 1.5rem 0 0;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemUpsellContainer = styled.div`
  label: MenuItemUpsellContainer;
  display: flex;
  justify-content: center;
`

const MenuItemUpsellItems = styled.div`
  label: MenuItemUpsellItems;
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MenuItemUpsellItem = styled.div`
  flex: 0 0 31rem;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 24rem;
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  & > div {
    width: 31rem;
    height: 100%;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 24rem;
    }
  }
`

const MenuItemUpsell = ({ showUpsell, setShowUpsell, upsellItemIds }) => {
  const dispatch = useDispatch()
  const { categories } = useContext(MenuContext)
  const upsells = useSelector(selectContentSection('upsells'))
  const { show, title, subtitle, decline } = upsells?.item || {}
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
  const menuItems = upsellItemIds.map((id) => itemLookup[id])

  const backToMenu = () => {
    setShowUpsell(false)
    setTimeout(() => dispatch(setCurrentItem(null)), 200)
  }

  if (!show) return null

  return (
    <>
      <MenuItemUpsellOverlay isOpen={showUpsell} cancel={backToMenu} />
      <TransitionGroup component={null}>
        {showUpsell ? (
          <CSSTransition key="upsell" classNames="tray" timeout={250}>
            <MenuItemUpsellView>
              <MenuItemUpsellHeader>
                <MenuItemUpsellTitle as="div">{title}</MenuItemUpsellTitle>
                {subtitle && (
                  <MenuItemUpsellSubtitle as="div">
                    {subtitle}
                  </MenuItemUpsellSubtitle>
                )}
                <MenuItemUpsellDecline>
                  <ButtonLink onClick={backToMenu}>{decline}</ButtonLink>
                </MenuItemUpsellDecline>
              </MenuItemUpsellHeader>
              <MenuItemUpsellContainer>
                <MenuItemUpsellItems className="centered">
                  {menuItems.map((item, index) => (
                    <MenuItemUpsellItem
                      count={menuItems.length}
                      key={`${item.id}-${index}`}
                    >
                      <UpsellItem
                        menuItem={item}
                        addCallback={backToMenu}
                        showDesc={isBrowser}
                      />
                    </MenuItemUpsellItem>
                  ))}
                </MenuItemUpsellItems>
              </MenuItemUpsellContainer>
            </MenuItemUpsellView>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

MenuItemUpsell.displayName = 'MenuItemUpsell'
MenuItemUpsell.propTypes = {
  showUpsell: propTypes.bool,
  setShowUpsell: propTypes.func,
  upsellItemIds: propTypes.array,
}

export default MenuItemUpsell
