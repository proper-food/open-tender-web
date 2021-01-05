import React, { useContext, useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { selectCustomer, authCustomerThanx } from '@open-tender/redux'
import { isObject } from '@open-tender/js'
import { Message } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
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

const Thanx = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { refunds: config } = useSelector(selectConfig)
  const { auth, loading, error } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const errMsg = error
    ? isObject(error)
      ? error.detail || error.message
      : error
    : null
  const title = errMsg ? 'Something went wrong' : 'Retrieving your account'
  const subtitle = errMsg
    ? 'Please review the error below and retry your request or contact support'
    : 'Please hang tight. This will only take a second.'
  const query = new URLSearchParams(useLocation().search)
  const code = query.get('code')
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
  }, [windowRef])

  useEffect(() => {
    if (auth) {
      history.push('/account')
    } else if (code) {
      dispatch(authCustomerThanx(code))
    } else {
      history.push('/')
    }
  }, [auth, code, history, dispatch])

  return (
    <>
      <Helmet>
        <title>Thanx | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderDefault title={isBrowser ? null : 'Thanx'} />
        <Main>
          <Container>
            <PageTitle title={title} subtitle={subtitle} />
            <PageContent>
              {isLoading ? (
                <Loading text="Contacting Thanx..." />
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

Thanx.displayName = 'Thanx'
export default Thanx
