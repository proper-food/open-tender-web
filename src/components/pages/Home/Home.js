import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import { Account, Guest } from '..'
import { setGeoLatLng, setGeoError, setGeoLoading } from '../../../slices'

const Home = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
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

  return auth ? <Account /> : <Guest />
}

Home.displayName = 'Home'
export default Home
