import { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useGeolocation } from '@open-tender/components'

import { setGeoLatLng, setGeoError, setGeoLoading } from '../slices'

const Geolocation = ({ children }) => {
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()

  useEffect(() => {
    dispatch(setGeoLoading())
  }, [dispatch])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  return children || null
}

Geolocation.displayName = 'Geolocation'
Geolocation.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Geolocation
