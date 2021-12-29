import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { selectNotifications } from '@open-tender/redux'

import Notification from './Notification'

const NotificationsView = styled('div')`
  position: fixed;
  z-index: 15;
  bottom: 12rem;
  right: ${(props) => props.theme.layout.padding};
  // right: calc(
  //   ${(props) => props.theme.layout.padding} +
  //     ${(props) => props.theme.layout.padding} + 8rem
  // );
  // bottom: calc(${(props) => props.theme.layout.padding} + 1.5rem);
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: ${(props) => props.theme.layout.paddingMobile};
    right: auto;
    bottom: 2rem;
    // right: calc(
    //   ${(props) => props.theme.layout.paddingMobile} +
    //     ${(props) => props.theme.layout.paddingMobile} + 7rem
    // );
    // bottom: calc(${(props) => props.theme.layout.padding} + 1rem);
  }
`

const Notifications = () => {
  const messages = useSelector(selectNotifications)
  // const messages = [
  //   { id: 1, message: 'Item added to cart' },
  //   { id: 2, message: 'Item added to cart' },
  // ]

  return (
    <NotificationsView>
      <TransitionGroup component={'ul'}>
        {messages.map((message) => (
          <CSSTransition key={message.id} classNames="flash" timeout={500}>
            <Notification {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </NotificationsView>
  )
}

Notifications.displayName = 'Notifications'

export default Notifications
