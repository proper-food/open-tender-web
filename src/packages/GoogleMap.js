/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import useGoogleMap from './useGoogleMap'

const GoogleMap = ({ apiKey, center, zoom, styles, events, children }) => {
  const { maps, map, mapRef, loading } = useGoogleMap({
    apiKey,
    zoom,
    styles,
    center,
    events,
  })

  useEffect(() => {
    map && map.panTo(center)
  }, [center.lat, center.lng])

  return (
    <div className="map">
      <div ref={mapRef} className="map-ref" />
      {!loading &&
        React.Children.map(children, (child) => {
          return React.cloneElement(child, { map, maps })
        })}
    </div>
  )
}

GoogleMap.displayName = 'GoogleMap'
GoogleMap.propTypes = {
  apiKey: propTypes.string,
  center: propTypes.object,
  zoom: propTypes.number,
  styles: propTypes.object,
  events: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}
export default GoogleMap
