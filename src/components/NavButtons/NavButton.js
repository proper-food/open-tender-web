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
  height: 8rem;
  padding: 0 2rem 0 2.5rem;
  margin: 0 0 1rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;
  transition: ${(props) => props.theme.links.transition};
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.primary};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 7rem;
    padding: 0 1rem 0 2rem;
    // min-height: 4rem;
    // padding: 2rem 0.5rem 2rem 2rem;
    // border-width: 0;
    // border-bottom-width: ${(props) => props.theme.border.width};
    // margin: 0;
    // border-radius: 0;
    // font-size: ${(props) => props.theme.fonts.sizes.main};
  }

  &:hover {
    border-style: solid;
    border-width: ${(props) => props.theme.border.width};
    border-color: ${(props) => props.theme.border.color};
    border-radius: ${(props) => props.theme.border.radiusSmall};
    background-color: ${(props) => props.theme.bgColors.tertiary};
  }

  &:last-of-type {
    margin-bottom: 0;
    // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    //   border-width: 0;
    // }
  }
`

const NavButtonIcon = styled('span')`
  position: relative;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  line-height: 0;
  color: ${(props) => props.theme.colors.primary};
`

const NavButtonTitle = styled('span')`
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
  }

  & > span:first-of-type {
    line-height: 1.2;
    margin: 0 0 0.1rem -0.1rem;
  }
`

const NavButtonArrow = styled('span')`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  line-height: 0;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.primary};
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover & {
    transform: translateX(1rem);

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
