import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { BackgroundImage, BackgroundLoading, Slider } from '.'
import { isBrowser } from 'react-device-detect'

const PageHeroView = styled('div')`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  // min-height: 42rem;
  // max-height: ${(props) => props.maxHeight || '100%'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    // max-height: 100%;
    // min-height: 0;
  }
`

const PageHeroGreeting = styled('div')`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 4rem ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2rem ${(props) => props.theme.layout.paddingMobile};
    background-color: ${(props) => props.theme.bgColors.primary};
  }
`

const PageHeroContent = styled('div')`
  flex-grow: 1;
  position: relative;
  display: flex;
  min-height: 44rem;
  // min-height: 50vh;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 32rem;
  }
`

const makeImageUrl = (images, isBrowser) => {
  return images.find((i) =>
    i.type === isBrowser ? 'FEATURED_IMAGE' : 'SECONDARY_IMAGE'
  ).url
}

const makeSlides = (items) => {
  if (!items || !items.length) return null
  return items.map((i) => ({
    ...i,
    imageUrl: makeImageUrl(i.images, isBrowser),
  }))
}

const PageHero = ({ announcements, imageUrl, maxHeight, children }) => {
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities)
  const isLoading = loading === 'pending'
  // const hasAnnouncements = entities && entities.length > 0

  return (
    <PageHeroView
      minHeight={announcements ? '18rem' : '0'}
      maxHeight={maxHeight}
    >
      {children && <PageHeroGreeting>{children}</PageHeroGreeting>}
      <PageHeroContent>
        {isLoading ? (
          <BackgroundLoading />
        ) : slides ? (
          <Slider settings={settings} slides={slides} />
        ) : (
          <BackgroundImage imageUrl={imageUrl} />
        )}
      </PageHeroContent>
    </PageHeroView>
  )
}

PageHero.displayName = 'PageHero'
PageHero.propTypes = {
  imageUrl: propTypes.string,
  announcements: propTypes.object,
  showHero: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHero
