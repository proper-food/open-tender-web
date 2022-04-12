import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  selectAnnouncementsPage,
  fetchAnnouncementPage,
} from '@open-tender/redux'
import BackgroundImage from './BackgroundImage'
import BackgroundContent from './BackgroundContent'
import AccountSectionTitle from './pages/Account/AccountSectionTitle'
import { selectBrand } from '../slices'

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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Announcement = styled.div`
  label: Announcement;

  display: flex;
  width: 100%;
  height: 24rem;
  border-radius: ${(props) => props.theme.border.radius};
  overflow: hidden;
  height: 36rem;
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 24rem;
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const Announcements = ({ page = 'HOME' }) => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const title = `What's new at ${brand.title}`
  const announcements = useSelector(selectAnnouncementsPage(page))
  const { entities, loading, error } = announcements || {}
  const isLoading = loading === 'pending'
  const slides = isLoading || error ? null : makeSlides(entities)

  useEffect(() => {
    dispatch(fetchAnnouncementPage(page))
  }, [dispatch, page])

  if (!slides) return null

  return (
    <AnnouncementsView>
      <AccountSectionTitle title={title} />
      {slides.map((slide) => {
        return (
          <Announcement key={slide.imageUrl}>
            <BackgroundImage {...slide}>
              <BackgroundContent {...slide} />
            </BackgroundImage>
          </Announcement>
        )
      })}
    </AnnouncementsView>
  )
}

Announcements.displayName = 'Announcements'
export default Announcements
