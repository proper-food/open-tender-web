import { useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAnnouncementsPage,
  fetchAnnouncementPage,
} from '@open-tender/redux'

import { BackgroundImage, BackgroundLoading, Slider } from '.'
import { useTheme } from '@emotion/react'

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

const PageHero = ({ page, imageUrl, height, style, children }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const announcements = useSelector(selectAnnouncementsPage(page))
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities)
  const isLoading = loading === 'pending'
  const hideHero = !slides && !imageUrl

  useEffect(() => {
    if (page) dispatch(fetchAnnouncementPage(page))
  }, [dispatch, page])

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
  page: propTypes.string,
  imageUrl: propTypes.string,
  height: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHero
