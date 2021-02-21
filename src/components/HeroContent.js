import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

const HeroContentView = styled('div')`
  max-width: 44rem;

  p {
    color: ${(props) => props.color || props.theme.colors.light};
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }

  p:first-of-type {
    line-height: 1.2;
    font-size: ${(props) => props.theme.fonts.sizes.h2};
    color: ${(props) => props.color || props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xBig};
    }
  }

  p + p {
    line-height: ${(props) => props.theme.lineHeight};
    margin: 0.3rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.main};
    font-weight: ${(props) => props.theme.boldWeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.2rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const HeroContent = ({ title, subtitle, color }) => {
  return (
    <HeroContentView>
      <Heading as="p">{title}</Heading>
      <p>{subtitle}</p>
    </HeroContentView>
  )
}

HeroContent.displayName = 'HeroContent'
HeroContent.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  color: propTypes.string,
}

export default HeroContent
