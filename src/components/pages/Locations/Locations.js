import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { animateScroll as scroll, scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectOrder,
  setRevenueCenter,
  selectAutoSelect,
  resetOrderType,
  fetchLocations,
  selectRevenueCenters,
  resetCheckout,
} from '@open-tender/redux'
import { makeDisplayedRevenueCenters, renameLocation } from '@open-tender/js'
import {
  ButtonStyled,
  GoogleMap,
  GoogleMapsMarker,
} from '@open-tender/components'
import ClipLoader from 'react-spinners/ClipLoader'

import {
  selectBrand,
  selectConfig,
  selectGeoLatLng,
  selectSettings,
} from '../../../slices'
import {
  Container,
  Content,
  HeroSite,
  Main,
  HeaderSite,
  HeroSiteCta,
  RevenueCenter,
} from '../..'
import LocationsMap from './LocationsMap'

const LocationsView = styled.div`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const LocationsList = styled('ul')`
  max-width: 140rem;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: stretch;
  gap: ${(props) => props.theme.layout.padding};
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    max-width: 72rem;
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: ${(props) => props.theme.layout.paddingMobile};
  }

  & > li {
    & > div {
      width: 100%;
      height: 100%;
      min-height: 21.5rem;
    }
  }
`

const Locations = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [locations, setLocations] = useState([])
  const brand = useSelector(selectBrand)
  const offset = -120
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle } = rcConfig
  const { maxDistance, locationName, googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles, icons } = googleMaps
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { address } = useSelector(selectOrder)
  const serviceType = 'PICKUP'
  const geoLatLng = useSelector(selectGeoLatLng)
  const coords = address || geoLatLng
  const initialCenter = address
    ? { lat: address.lat, lng: address.lng }
    : geoLatLng || defaultCenter
  const [center, setCenter] = useState(initialCenter)
  const [activeMarker, setActiveMarker] = useState(null)

  const scrollToLocations = () => {
    scroller.scrollTo('locations', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

  const setActive = useCallback(
    (revenueCenter) => {
      if (revenueCenter) {
        const { revenue_center_id, address, slug } = revenueCenter
        setActiveMarker(revenue_center_id)
        // setCenter({ lat: address.lat, lng: address.lng })
        const element = document.getElementById(slug)
        if (element) {
          const position = element.offsetTop + offset
          scroll.scrollTo(position, {
            duration: 500,
            smooth: true,
            offset: 0,
          })
        }
      } else {
        setActiveMarker(null)
        const newCenter = address
          ? { lat: address.lat, lng: address.lng }
          : geoLatLng || defaultCenter
        setCenter(newCenter)
      }
    },
    [address, defaultCenter, geoLatLng, offset]
  )

  useEffect(() => {
    let params = { type: 'OLO' }
    if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
    dispatch(fetchLocations(params))
  }, [coords, dispatch])

  useEffect(() => {
    const { error, displayed } = makeDisplayedRevenueCenters(
      revenueCenters,
      serviceType,
      address,
      geoLatLng,
      maxDistance
    )
    setError(error)
    setLocations(displayed)
  }, [revenueCenters, serviceType, address, geoLatLng, maxDistance])

  return (
    <>
      <Helmet>
        <title>Locations | {brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          {apiKey ? (
            <GoogleMap
              apiKey={apiKey}
              zoom={zoom}
              styles={styles}
              center={center}
              loader={<ClipLoader size={30} loading={true} />}
              renderMap={(props) => <LocationsMap {...props} />}
            >
              {/* <MapsAutocomplete setCenter={setCenter} center={center} /> */}
              {/* <RevenueCentersSelect /> */}
              {revenueCenters.map((i) => {
                const isActive = i.revenue_center_id === activeMarker
                const icon = isActive ? icons.locationSelected : icons.location
                return (
                  <GoogleMapsMarker
                    key={i.revenue_center_id}
                    title={i.name}
                    position={{
                      lat: i.address.lat,
                      lng: i.address.lng,
                    }}
                    icon={icon.url}
                    size={icon.size}
                    anchor={icon.anchor}
                    events={{ onClick: () => setActive(i) }}
                  />
                )
              })}
              {(address || geoLatLng) && (
                <GoogleMapsMarker
                  title="Your Location"
                  position={{
                    lat: center.lat,
                    lng: center.lng,
                  }}
                  icon={icons.user.url}
                  size={icons.user.size}
                  anchor={icons.user.anchor}
                  drop={null}
                />
              )}
            </GoogleMap>
          ) : (
            <HeroSite imageUrl={isBrowser ? background : mobile}>
              <HeroSiteCta title={title} subtitle={subtitle}>
                <ButtonStyled onClick={scrollToLocations}>
                  Find a Location
                </ButtonStyled>
              </HeroSiteCta>
            </HeroSite>
          )}
          <LocationsView>
            <Element name="locations">
              <LocationsList>
                {locations.map((location) => (
                  <li id={location.slug} key={location.revenue_center_id}>
                    <RevenueCenter revenueCenter={location} showImage={true} />
                  </li>
                ))}
              </LocationsList>
            </Element>
          </LocationsView>
        </Main>
      </Content>
    </>
  )
}

export default Locations
