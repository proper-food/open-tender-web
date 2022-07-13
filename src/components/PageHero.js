import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isBrowser } from 'react-device-detect'
import { BackgroundImage, BackgroundLoading, Slider } from '.'

const PageHeroView = styled.div`
  display: flex;
  height: 100vh;
  height: -webkit-fill-available;
  min-height: 64rem;
  ${(props) =>
    props.ht ? `height: ${props.ht}; min-height: ${props.ht};` : ''}
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

const PageHero = ({ announcements, imageUrl, height, style, children }) => {
  const theme = useTheme()
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities)
  const isLoading = loading === 'pending'
  const hideHero = !slides && !imageUrl

  if (hideHero) return null

  return (
    <PageHeroView ht={height} style={style}>
      {isLoading ? (
        <BackgroundLoading />
      ) : slides ? (
        <Slider
          settings={settings}
          slides={slides}
          bgColor={theme.bgColors.dark}
        />
      ) : imageUrl ? (
        <BackgroundImage imageUrl={imageUrl} bgColor={theme.bgColors.dark}>
          {children}
        </BackgroundImage>
      ) : null}
    </PageHeroView>
  )
}

PageHero.displayName = 'PageHero'
PageHero.propTypes = {
  announcements: propTypes.object,
  imageUrl: propTypes.string,
  height: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHero
