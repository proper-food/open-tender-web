import { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useGeolocation } from '@open-tender/components'

import { setGeoLatLng, setGeoError, setGeoLoading } from '../slices'

const Geolocation = ({ children }) => {
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()

  useEffect(() => {
    console.log('loading geo')
    dispatch(setGeoLoading())
  }, [dispatch])

  useEffect(() => {
    if (geoLatLng) {
      console.log('geo set')
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      console.log('geo failed')
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
