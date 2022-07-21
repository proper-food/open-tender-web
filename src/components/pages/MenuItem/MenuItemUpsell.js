import { useContext, useMemo } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { setCurrentItem } from '@open-tender/redux'
import { makeMenuItemLookup } from '@open-tender/js'
import { ButtonLink, Heading } from '@open-tender/components'
import { UpsellItem } from '../..'
import { MenuContext } from '../Menu/Menu'
import MenuItemUpsellOverlay from './MenuItemUpsellOverlay'

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
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    text-align: left;
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const MenuItemUpsellTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuItemUpsellSubtitle = styled.div`
  margin: 1.5rem 0 0;
  text-align: center;
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

// const makeUpsellItems = (menuItems) => {
//   const orderItems = menuItems.map((i) => makeOrderItem(i))
//   const upsellItems = orderItems.reduce((arr, i) => {
//     const groupsBelowMin = i.groups.filter((g) => g.quantity < g.min)
//     const nonSizeGroups = groupsBelowMin.filter((g) => !g.isSize)
//     if (nonSizeGroups.length) return arr
//     return [...arr, i]
//   }, [])
//   return upsellItems
// }

const MenuItemUpsell = ({ showUpsell, setShowUpsell, upsellItemIds }) => {
  const dispatch = useDispatch()
  const { categories } = useContext(MenuContext)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
  const menuItems = upsellItemIds.map((id) => itemLookup[id])
  // const upsellItems = makeUpsellItems(menuItems)

  const cancel = () => dispatch(setCurrentItem(null))

  const addToOrder = () => {
    setShowUpsell(false)
    setTimeout(cancel, 300)
  }

  return (
    <>
      <MenuItemUpsellOverlay isOpen={showUpsell} cancel={cancel} />
      <TransitionGroup component={null}>
        {showUpsell ? (
          <CSSTransition key="upsell" classNames="tray" timeout={250}>
            <MenuItemUpsellView>
              <MenuItemUpsellHeader>
                <MenuItemUpsellTitle>May we suggest...</MenuItemUpsellTitle>
                <MenuItemUpsellSubtitle>
                  <ButtonLink onClick={cancel}>No, thanks</ButtonLink>
                </MenuItemUpsellSubtitle>
              </MenuItemUpsellHeader>
              <MenuItemUpsellContainer>
                <MenuItemUpsellItems>
                  {menuItems.map((item, index) => (
                    <MenuItemUpsellItem
                      count={menuItems.length}
                      key={`${item.id}-${index}`}
                    >
                      <UpsellItem menuItem={item} addCallback={addToOrder} />
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
