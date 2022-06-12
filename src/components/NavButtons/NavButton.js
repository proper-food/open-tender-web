import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading, Text } from '@open-tender/components'
import { isMobileOnly } from 'react-device-detect'

import iconMap from '../iconMap'

const NavButtonView = styled('button')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  height: 7.5rem;
  padding: 0 2rem 0 2.5rem;
  margin: 0 0 1rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;
  transition: ${(props) => props.theme.links.transition};
  border-style: solid;
  border-width: ${(props) => props.theme.buttons.sizes.large.borderWidth};
  border-radius: ${(props) => props.theme.buttons.sizes.large.borderRadius};
  border-color: ${(props) => props.theme.buttons.colors.large.borderColor};
  background-color: ${(props) => props.theme.buttons.colors.large.bgColor};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 7rem;
    padding: 0 1rem 0 2rem;
  }

  &:hover {
    // border-style: solid;
    // border-width: ${(props) => props.theme.buttons.sizes.large.borderWidth};
    // border-radius: ${(props) =>
      props.theme.buttons.sizes.large.borderRadius};
    border-color: ${(props) =>
      props.theme.buttons.colors.largeHover.borderColor};
    background-color: ${(props) =>
      props.theme.buttons.colors.largeHover.bgColor};
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const NavButtonIcon = styled('span')`
  position: relative;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  line-height: 0;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.large.iconColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 1.8rem;
    height: 1.8rem;
  }

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.largeHover.iconColor};
  }
`

const NavButtonTitle = styled.span`
  flex-grow: 1;
  line-height: ${(props) => props.theme.lineHeight};
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 2rem;
  }

  & > span {
    display: block;
    transition: ${(props) => props.theme.links.transition};
  }

  & > span:first-of-type {
    line-height: 1.2;
    margin: 0 0 0.1rem -0.1rem;
    color: ${(props) => props.theme.buttons.colors.large.color};
  }

  & > span:last-of-type {
    color: ${(props) => props.theme.buttons.colors.large.subtitleColor};
  }

  button:hover & > span:first-of-type {
    color: ${(props) => props.theme.buttons.colors.largeHover.color};
  }

  button:hover & > span:last-of-type {
    color: ${(props) => props.theme.buttons.colors.largeHover.subtitleColor};
  }
`

const NavButtonArrow = styled('span')`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  line-height: 0;
  flex-shrink: 0;
  color: ${(props) => props.theme.buttons.colors.large.iconColor};
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover & {
    transform: translateX(1rem);
    color: ${(props) => props.theme.buttons.colors.largeHover.iconColor};

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: translateX(0);
    }
  }
`

const NavButton = ({ title, subtitle, icon, onClick, delay = '0.125s' }) => {
  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    onClick()
  }

  return (
    <NavButtonView onClick={onUp} delay={delay}>
      <NavButtonIcon>{icon}</NavButtonIcon>
      <NavButtonTitle>
        <Heading size={isMobileOnly ? 'medium' : 'big'}>{title}</Heading>
        <Text size={isMobileOnly ? 'xSmall' : 'small'} color="tertiary">
          {subtitle}
        </Text>
      </NavButtonTitle>
      <NavButtonArrow>{iconMap.ChevronRight}</NavButtonArrow>
    </NavButtonView>
  )
}

NavButton.displayName = 'NavButton'
NavButton.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
  iconName: propTypes.string,
}
export default NavButton
