import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectOrder,
  setServiceType,
  resetOrder,
  setOrderType,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import iconMap from '../../iconMap'
import {
  Background,
  Content,
  Header,
  Main,
  PageTitle,
  ScreenreaderTitle,
} from '../..'
import { Account, StartOver } from '../../buttons'
import CateringAutocomplete from './CateringAutocomplete'

const CateringView = styled('div')`
  padding: ${(props) => props.theme.layout.padding};
`

const CateringTitle = styled('div')`
  & > div {
    text-align: left;
  }
`

const CateringContent = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const CateringError = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;

  p:first-of-type {
    color: ${(props) => props.theme.colors.error};
    margin: 0 0 2rem;
  }
`

const CateringButtons = styled('div')`
  margin: 2rem 0 0;

  button {
    margin: 0 1rem 0 0;
  }
`

const CateringStartOver = styled('div')`
  margin: 3rem 0 0;

  button {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CateringPolicy = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: 6rem 0 3rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }

  div p {
    margin: 1em 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const CateringContentSection = ({ policy, startOver }) => {
  return (
    <CateringPolicy>
      {policy.title && <h2>{policy.title}</h2>}
      {/* {policy.subtitle && <p>{policy.subtitle}</p>} */}
      {policy.content.length > 0 && (
        <div>
          {policy.content.map((i, index) => (
            <p key={index}>{i}</p>
          ))}
        </div>
      )}
    </CateringPolicy>
  )
}

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { catering: config } = useSelector(selectConfig)
  const { title, subtitle, background, policy } = config
  const { orderType, address } = useSelector(selectOrder)
  const hasCatering = true

  useEffect(() => {
    if (!orderType) dispatch(setOrderType('CATERING'))
  }, [orderType, dispatch])

  const chooseServiceType = (serviceType) => {
    dispatch(setServiceType(serviceType))
    history.push('/locations')
  }

  const startOver = () => {
    dispatch(resetOrder())
    history.push(`/order-type`)
  }

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <Header maxWidth="76.8rem" left={<StartOver />} right={<Account />} />
        <Main>
          <ScreenreaderTitle>Catering</ScreenreaderTitle>
          <CateringView>
            <CateringTitle>
              <PageTitle title={title} subtitle={subtitle} />
            </CateringTitle>
            {hasCatering ? (
              <CateringContent>
                <CateringAutocomplete />
                <CateringButtons>
                  <ButtonStyled
                    icon={iconMap.Truck}
                    onClick={() => chooseServiceType('DELIVERY')}
                    disabled={!address}
                  >
                    Order Delivery
                  </ButtonStyled>
                  <ButtonStyled
                    icon={iconMap.ShoppingBag}
                    onClick={() => chooseServiceType('PICKUP')}
                    disabled={!address}
                    color="secondary"
                  >
                    Order Pickup
                  </ButtonStyled>
                </CateringButtons>
                <CateringStartOver>
                  <ButtonLink onClick={startOver}>
                    Switch to a regular Pickup or Delivery order
                  </ButtonLink>
                </CateringStartOver>
              </CateringContent>
            ) : (
              <CateringError>
                <p>This order type isn't currently available</p>
                <ButtonStyled icon={iconMap.RefreshCw} onClick={startOver}>
                  Start Over
                </ButtonStyled>
              </CateringError>
            )}
            <CateringContentSection policy={policy} startOver={startOver} />
          </CateringView>
        </Main>
      </Content>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
