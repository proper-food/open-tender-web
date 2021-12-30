import React from 'react'
import propTypes from 'prop-types'
import { isMobileOnly } from 'react-device-detect'
import styled from '@emotion/styled'

import { BackgroundImage } from '.'

const BackgroundView = styled('div')`
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 76.8rem;
  display: flex;
`

const Background = ({ imageUrl }) => {
  if (isMobileOnly) return null

  return (
    <BackgroundView>
      <BackgroundImage imageUrl={imageUrl} />
    </BackgroundView>
  )
}

Background.displayName = 'Background'
Background.propTypes = {
  imageUrl: propTypes.string,
}

export default Background
