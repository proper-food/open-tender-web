import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
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
import { ButtonStyled } from '@open-tender/components'

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
    // gap: 0;
  }
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   gap: ${(props) => props.theme.layout.paddingMobile};
  // }

  & > li {
    & > div {
      width: 100%;
      height: 100%;
    }
  }
`

const Locations = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [locations, setLocations] = useState([])
  const brand = useSelector(selectBrand)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle } = rcConfig
  const { maxDistance, locationName } = useSelector(selectSettings)
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { address } = useSelector(selectOrder)
  const serviceType = 'WALKIN'
  const geoLatLng = useSelector(selectGeoLatLng)
  const coords = address || geoLatLng

  const scrollToLocations = () => {
    scroller.scrollTo('locations', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

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
          <HeroSite imageUrl={isBrowser ? background : mobile}>
            <HeroSiteCta title={title} subtitle={subtitle}>
              <ButtonStyled onClick={scrollToLocations}>
                Find a Location
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
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
