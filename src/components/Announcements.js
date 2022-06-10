import { useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  selectAnnouncementsPage,
  fetchAnnouncementPage,
} from '@open-tender/redux'
import { Preface } from '@open-tender/components'
import BackgroundImage from './BackgroundImage'
import BackgroundContent from './BackgroundContent'

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

const AnnouncementsView = styled.div`
  label: AnnouncementsView;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0;
  }
`

const AnnouncementsTitle = styled.div`
  label: AnnouncementsTitle;
  width: 100%;
  margin: 0 0 1.5rem;
  text-align: left;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 1.2rem;
  }
`

const AnnouncementsContainer = styled.div`
  label: AnnouncementsView;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Announcement = styled.div`
  label: Announcement;
  display: flex;
  width: 100%;
  height: 36rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.border.radius};
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 24rem;
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Announcements = ({ page = 'HOME' }) => {
  const dispatch = useDispatch()
  const announcements = useSelector(selectAnnouncementsPage(page))
  const { settings, entities, loading, error } = announcements || {}
  const { title } = settings || {}
  const isLoading = loading === 'pending'
  const slides = isLoading || error ? null : makeSlides(entities)

  useEffect(() => {
    dispatch(fetchAnnouncementPage(page))
  }, [dispatch, page])

  if (!slides) return null

  return (
    <AnnouncementsView>
      {title ? (
        <AnnouncementsTitle>
          <Preface as="p">{title}</Preface>
        </AnnouncementsTitle>
      ) : null}
      <AnnouncementsContainer>
        {slides.map((slide) => {
          return (
            <Announcement key={slide.imageUrl}>
              <BackgroundImage {...slide}>
                <BackgroundContent {...slide} />
              </BackgroundImage>
            </Announcement>
          )
        })}
      </AnnouncementsContainer>
    </AnnouncementsView>
  )
}

Announcements.displayName = 'Announcements'
Announcements.propTypes = {
  page: propTypes.string,
}

export default Announcements
