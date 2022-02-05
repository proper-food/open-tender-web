import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectOrder,
  setServiceType,
  resetOrder,
  setOrderType,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { selectBrand, selectContent } from '../../../slices'
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

const CateringPolicy = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: 2.5rem 0;
  line-height: ${(props) => props.theme.lineHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0;
    text-align: center;
  }

  p {
    margin: 0.5em 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const CateringStartOver = styled('div')`
  margin: 3rem 0 0;

  button {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

// const CateringContentSection = ({ policy }) => {
//   return (
//     <CateringPolicy>
//       {policy.title && <h2>{policy.title}</h2>}
//       {/* {policy.subtitle && <p>{policy.subtitle}</p>} */}
//       {policy.content.length > 0 && (
//         <div>
//           {policy.content.map((i, index) => (
//             <p key={index}>{i}</p>
//           ))}
//         </div>
//       )}
//     </CateringPolicy>
//   )
// }

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { catering: config } = useSelector(selectContent)
  const { title, subtitle, background, content } = config
  const { orderType, address } = useSelector(selectOrder)
  const hasContent = !!(content && content.length)
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
        <Header
          maxWidth="76.8rem"
          title={isMobile ? 'Order Catering' : null}
          left={<StartOver />}
          right={<Account />}
        />
        <Main>
          <ScreenreaderTitle>Catering</ScreenreaderTitle>
          <CateringView>
            <CateringTitle>
              <PageTitle
                title={title}
                subtitle={subtitle}
                style={{ maxWidth: '100%' }}
              />
            </CateringTitle>
            {hasCatering ? (
              <CateringContent>
                <CateringAutocomplete />
                <CateringButtons>
                  <ButtonStyled
                    icon={iconMap.Truck}
                    onClick={() => chooseServiceType('DELIVERY')}
                    disabled={!address}
                    size={isMobile ? 'small' : 'default'}
                  >
                    Order Delivery
                  </ButtonStyled>
                  <ButtonStyled
                    icon={iconMap.ShoppingBag}
                    onClick={() => chooseServiceType('PICKUP')}
                    disabled={!address}
                    size={isMobile ? 'small' : 'default'}
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
            {hasContent && (
              <CateringPolicy dangerouslySetInnerHTML={{ __html: content }} />
            )}
            {/* <CateringContentSection policy={policy} /> */}
          </CateringView>
        </Main>
      </Content>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
