import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { ButtonLink, ButtonStyled, Preface } from '@open-tender/components'

import { selectConfig, selectSettings, selectGeoLatLng } from '../../../slices'
import { Container, Loading, PageContent, RevenueCenter } from '../..'
import styled from '@emotion/styled'
import iconMap from '../../iconMap'

const RevenueCentersSelectView = styled('div')`
  position: relative;
  z-index: 1;
  flex-grow: 1;
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 1.5rem 0 0;
  margin: ${(props) => props.theme.layout.navHeight} 0 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 3rem 0 0;
    margin: 44rem 0 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    margin: ${(props) => props.theme.layout.navHeightMobile} 0
      ${(props) => (props.showMap ? '25rem' : '0')};
    transition: all 0.25s ease;
    transform: translateY(${(props) => (props.showMap ? '25rem' : '0')});
  }
`

const RevenueCentersSelectTitle = styled('div')`
  margin: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 3rem;
    text-align: center;
  }

  h2 {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  & > p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 1rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const RevenueCentersSelectShowMap = styled('div')`
  display: none;
  width: 100%;
  margin: 0.5rem 0 1rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }

  button {
    display: inline-block;
    padding: 0.5rem 0;
  }

  span {
    pointer-events: none;
    display: block;
    line-height: 1;
    color: ${(props) => props.theme.links.primary.color};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const RevenueCentersSelectList = styled('ul')`
  margin: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.marginMobile};
  }

  & > li {
    margin: ${(props) => props.theme.layout.padding} 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 0 0 2.5rem;
      border-bottom: 0.1rem solid ${(props) => props.theme.border.color};
      margin: 0 0 2rem;
    }

    &:last-of-type {
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        padding: 0;
        border: 0;
        margin: 0;
      }
    }
  }
`

const RevenueCentersSelect = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { maxDistance, locationName } = useSelector(selectSettings)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { serviceType, orderType, isOutpost, address, requestedAt } =
    useSelector(selectOrder)
  const coords = address || geoLatLng
  const autoSelect = useSelector(selectAutoSelect)
  const [title, setTitle] = useState(rcConfig.title)
  const [msg, setMsg] = useState(rcConfig.subtitle)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const missingAddress = serviceType === 'DELIVERY' && !address
  const hasCount = displayedRevenueCenters && displayedRevenueCenters.length > 0
  const showRevenueCenters = hasCount && !isLoading && !error && !missingAddress
  const names = locationName[isOutpost ? 'OUTPOST' : serviceType]
  const renamedTitle = renameLocation(title, names)
  const renamedError = renameLocation(error, names)
  const renamedMsg = renameLocation(msg, names)

  useEffect(() => {
    if (orderType) {
      let params = { type: orderType }
      if (isOutpost) params = { ...params, is_outpost: true }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      if (orderType === 'CATERING' && requestedAt) {
        params = { ...params, requestedAt }
      }
      // dispatch(fetchRevenueCenters(params))
      dispatch(fetchLocations(params))
    }
  }, [orderType, isOutpost, coords, requestedAt, dispatch])

  const autoRouteCallack = useCallback(
    (revenueCenter) => {
      dispatch(setRevenueCenter(revenueCenter))
      return navigate(`/menu/${revenueCenter.slug}`)
    },
    [dispatch, navigate]
  )

  useEffect(() => {
    const { title, msg, error, displayed } = makeDisplayedRevenueCenters(
      revenueCenters,
      serviceType,
      address,
      geoLatLng,
      maxDistance
    )
    const count = displayed ? displayed.length : 0
    if (count && autoSelect && !error && !missingAddress) {
      autoRouteCallack(displayed[0])
    } else {
      setTitle(title)
      setMsg(msg)
      setError(error)
      setDisplayedRevenueCenters(displayed)
    }
  }, [
    revenueCenters,
    serviceType,
    address,
    geoLatLng,
    maxDistance,
    autoSelect,
    autoRouteCallack,
    missingAddress,
  ])

  const handleStartOver = () => {
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    navigate(`/`)
  }

  return (
    <RevenueCentersSelectView showMap={showMap}>
      <Container>
        {isLoading ? (
          <PageContent>
            <Loading text="Retrieving nearest locations..." />
          </PageContent>
        ) : (
          <>
            <RevenueCentersSelectTitle>
              <RevenueCentersSelectShowMap>
                <ButtonLink onClick={() => setShowMap(!showMap)}>
                  <Preface>{showMap ? 'Hide Map' : 'Show Map'}</Preface>
                </ButtonLink>
              </RevenueCentersSelectShowMap>
              <h2>{renamedTitle}</h2>
              <p>{renamedError || renamedMsg}</p>
            </RevenueCentersSelectTitle>
            {showRevenueCenters ? (
              <RevenueCentersSelectList>
                {displayedRevenueCenters.map((revenueCenter) => (
                  <li
                    id={revenueCenter.slug}
                    key={revenueCenter.revenue_center_id}
                  >
                    <RevenueCenter
                      revenueCenter={revenueCenter}
                      showImage={true}
                    />
                  </li>
                ))}
              </RevenueCentersSelectList>
            ) : (
              <div style={{ margin: '3rem auto 0', textAlign: 'center' }}>
                <ButtonStyled
                  icon={iconMap.RefreshCw}
                  onClick={handleStartOver}
                >
                  Start Over
                </ButtonStyled>
              </div>
            )}
          </>
        )}
      </Container>
    </RevenueCentersSelectView>
  )
}

RevenueCentersSelect.displayName = 'RevenueCentersSelect'
RevenueCentersSelect.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default RevenueCentersSelect
