import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchLocation,
  resetOrderType,
  selectCustomer,
  selectMenuSlug,
  selectOrder,
  setOrderServiceType,
  setPrepType,
  setTable,
} from '@open-tender/redux'
import { ButtonStyled, Text } from '@open-tender/components'

import { selectBrand } from '../../../slices'
import iconMap from '../../iconMap'
import {
  Content,
  Header,
  HeaderLogo,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
  Loading,
} from '../..'
import { Account, Logout } from '../../buttons'

const QRButtons = styled('div')`
  label: QRButtons;
  margin: 2rem 0 0;

  button + button {
    margin: 0 0 0 1rem;
  }
`

const notFoundMsg =
  "Sorry, but we couldn't find this location. Please try again"

const validPrepTypes = ['EAT_HERE', 'TAKE_OUT']

const makePrepType = (prepType) => {
  if (!prepType) return null
  const upper = prepType.toUpperCase()
  return validPrepTypes.includes(upper) ? upper : null
}

const QR = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [init, setInit] = useState(false)
  const { id: locationId } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { prepType, revenueCenter, loading, error } = order
  const { revenue_center_type: orderType, name } = revenueCenter || {}
  const title = name ? `Welcome to ${name}` : 'Welcome'
  const isLoading = loading === 'pending'
  const errMsg = error && error.includes('exist') ? notFoundMsg : error
  const query = new URLSearchParams(useLocation().search)
  const serviceType = query.get('service_type') || 'WALKIN'
  const table = query.get('table') || null
  const prep_type = query.get('prep_type') || null
  const presetPrepType = makePrepType(prep_type)

  useEffect(() => {
    dispatch(resetOrderType())
    dispatch(setPrepType(presetPrepType))
    dispatch(fetchLocation(locationId))
    setInit(true)
  }, [dispatch, presetPrepType, locationId])

  useEffect(() => {
    if (init && menuSlug !== '/' && prepType) {
      dispatch(setTable(table))
      dispatch(setOrderServiceType(orderType, serviceType, false))
      history.push(menuSlug)
    }
  }, [
    init,
    prepType,
    menuSlug,
    orderType,
    serviceType,
    table,
    dispatch,
    history,
  ])

  return (
    <>
      <Helmet>
        <title>Dine In | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header left={<HeaderLogo />} right={auth ? <Logout /> : <Account />} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageContent>
              {isLoading ? (
                <Loading text="Loading menu..." />
              ) : errMsg ? (
                <Text color="error" style={{ width: '100%' }}>
                  {errMsg}
                </Text>
              ) : (
                <>
                  <PageTitle
                    title={title}
                    subtitle="Please choose an order type"
                  />
                  <QRButtons>
                    <ButtonStyled
                      icon={iconMap.Coffee}
                      onClick={() => dispatch(setPrepType('EAT_HERE'))}
                      size={isMobile ? 'small' : 'default'}
                    >
                      Eat Here
                    </ButtonStyled>
                    <ButtonStyled
                      icon={iconMap.ShoppingBag}
                      onClick={() => dispatch(setPrepType('TAKE_OUT'))}
                      size={isMobile ? 'small' : 'default'}
                    >
                      Take Out
                    </ButtonStyled>
                  </QRButtons>
                </>
              )}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

QR.displayName = 'QR'
export default QR
