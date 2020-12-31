import React, { useContext, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectLevelUp,
  fetchLevelUpCustomer,
  resetLevelUpCustomer,
} from '@open-tender/redux'
import { isObject } from '@open-tender/js'
import { Message } from '@open-tender/components'

import { selectBrand, selectConfig, setGeoLatLng } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
  Loading,
} from '../..'

const LevelUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { home: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectLevelUp)
  const isLoading = loading === 'pending'
  const errMsg = error
    ? isObject(error)
      ? error.detail || error.message
      : error
    : null
  let { token } = useParams()
  const query = new URLSearchParams(useLocation().search)
  token = token || query.get('user_token')
  const lat = query.get('latitude')
  const lng = query.get('longitude')
  const title = errMsg
    ? 'Something went wrong'
    : 'Retrieving your LevelUp account'
  const subtitle = errMsg
    ? 'Please review the error below and retry your request'
    : 'Please hang tight. This will only take a second.'

  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (auth) {
      history.push('/account')
    } else if (token) {
      if (lat && lng) {
        const geoLatLng = { lat: parseFloat(lat), lng: parseFloat(lng) }
        dispatch(setGeoLatLng(geoLatLng))
      }
      dispatch(fetchLevelUpCustomer(token))
    } else {
      history.push('/')
    }
    return () => dispatch(resetLevelUpCustomer())
  }, [auth, token, lat, lng, history, dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : config.title} />
        <Main>
          <Container>
            <PageTitle title={title} subtitle={subtitle} />
            <PageContent>
              {isLoading ? (
                <Loading text="Contacting LevelUp..." />
              ) : errMsg ? (
                <Message color="error" style={{ width: '100%' }}>
                  {errMsg}
                </Message>
              ) : null}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

LevelUp.displayName = 'LevelUp'
export default LevelUp