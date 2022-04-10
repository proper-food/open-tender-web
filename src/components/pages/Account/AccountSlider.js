import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { isBrowser } from 'react-device-detect'
import { BackgroundLoading, SliderCards } from '../..'

const AccountSliderView = styled('div')`
  flex: 1 0 auto;
  position: relative;
  display: flex;
  height: 50vh;
  min-height: 44rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 28rem;
    min-height: 28rem;
  }
`

const makeImageUrl = (images, isBrowser) => {
  return images.find(
    (i) => i.type === (isBrowser ? 'FEATURED_IMAGE' : 'SECONDARY_IMAGE')
  ).url
}

const makeSlides = (items) => {
  if (!items || !items.length) return null
  return items.map((i) => ({
    ...i,
    imageUrl: makeImageUrl(i.images, isBrowser),
  }))
}

const AccountSlider = ({ announcements, style }) => {
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities)
  const isLoading = loading === 'pending'

  return (
    <AccountSliderView style={style}>
      {isLoading ? (
        <BackgroundLoading />
      ) : slides ? (
        <SliderCards settings={settings} slides={slides} />
      ) : null}
    </AccountSliderView>
  )
}

AccountSlider.displayName = 'AccountSlider'
AccountSlider.propTypes = {
  announcements: propTypes.object,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default AccountSlider
