import styled from '@emotion/styled'
import { Box, FormRow, Preface } from '@open-tender/components'
import { useSelector } from 'react-redux'
import { selectAutoSelect, selectGroupOrder } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {
  Account,
  CancelEdit,
  GroupGuest,
  GroupOrder,
  LeaveGroup,
  RequestedAt,
  RevenueCenter,
  ServiceType,
} from '../../buttons'

const MenuMobileMenuView = styled('div')`
  position: fixed;
  z-index: 12;
  top: 6rem;
  left: 0;
  right: 0;
  padding: ${(props) => props.theme.layout.paddingMobile};
  transition: all 0.125s ease;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.show ? '0' : '-100%')});
  background-color: ${(props) => props.theme.bgColors.primary};
`

const MenuMobileMenuOverlay = styled('div')`
  position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const MenuMobileMenuContainer = styled(Box)`
  padding: 0 ${(props) => props.theme.layout.paddingMobile};
  margin-top: ${(props) => props.theme.layout.paddingMobile};
`

const MenuMobileMenuButtons = styled('div')`
  padding: 0 ${(props) => props.theme.layout.paddingMobile};
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: block;
  }

  button + button {
    margin-left: 3rem;
  }
`

const MenuMobileMenu = ({ order, showMenu, setShowMenu }) => {
  const { revenueCenter, serviceType, requestedAt } = order
  const autoSelect = useSelector(selectAutoSelect)
  const { cartGuest } = useSelector(selectGroupOrder)

  return (
    <>
      <MenuMobileMenuView show={showMenu}>
        <MenuMobileMenuButtons>
          {cartGuest ? (
            <>
              <LeaveGroup useButton={true} />
              <GroupGuest useButton={true} />
            </>
          ) : (
            <>
              <Account useButton={true} />
              <GroupOrder useButton={true} />
              <CancelEdit useButton={true} />
            </>
          )}
        </MenuMobileMenuButtons>
        {!cartGuest && (
          <MenuMobileMenuContainer>
            {revenueCenter && !autoSelect && (
              <FormRow
                as="div"
                label={<Preface size="xSmall">Location</Preface>}
                input={
                  <RevenueCenter
                    style={{ position: 'relative' }}
                    useButton={true}
                  />
                }
              />
            )}
            {serviceType && (
              <FormRow
                as="div"
                label={<Preface size="xSmall">Service Type</Preface>}
                input={
                  <ServiceType
                    style={{ position: 'relative' }}
                    useButton={true}
                  />
                }
              />
            )}
            {requestedAt && (
              <FormRow
                as="div"
                label={<Preface size="xSmall">Requested Time</Preface>}
                input={
                  <RequestedAt
                    style={{ position: 'relative' }}
                    useButton={true}
                  />
                }
              />
            )}
          </MenuMobileMenuContainer>
        )}
      </MenuMobileMenuView>
      <TransitionGroup component={null}>
        {showMenu ? (
          <CSSTransition
            key="mobile-menu-overlay"
            classNames="overlay"
            timeout={250}
          >
            <MenuMobileMenuOverlay onClick={() => setShowMenu(false)} />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

export default MenuMobileMenu
