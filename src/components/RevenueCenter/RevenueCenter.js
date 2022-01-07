import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectGroupOrder, selectOrder } from '@open-tender/redux'
import { stripTags } from '@open-tender/js'
import { BgImage, Box } from '@open-tender/components'

import iconMap from '../iconMap'
import bentocartButton from '../../assets/bentocart-button.png'
import RevenueCenterOrder from './RevenueCenterOrder'
import RevenueCenterAction from './RevenueCenterAction'
import { selectDisplaySettings } from '../../slices'

const RevenueCenterView = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: ${(props) =>
    props.theme.bgColors[props.isMenu ? 'primary' : 'secondary']};
`

const RevenueCenterImage = styled(BgImage)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 24rem;
  background-color: ${(props) => props.theme.bgColors.secondary};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const RevenueCenterContent = styled('div')`
  padding: 0 ${(props) => (props.showImage ? `24rem` : null)} 0 0;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
  }

  > div {
    padding: 1.5rem 2rem 2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 1.5rem 1.5rem;
    }
  }
`

const RevenueCenterHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: 1rem;
  }

  & > * {
    display: block;
  }

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }

  p {
    padding-top: 0.4rem;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const RevenueCenterActions = styled('div')`
  a,
  button {
    display: block;
    width: 100%;
    text-align: left;
  }
`

const RevenueCenterDesc = styled('div')`
  margin: 0.75rem 0 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const RevenueCenterDelivery = styled('div')`
  p {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }

  a {
    display: block;
    width: 28rem;
    margin: 2.5rem 0 0;
  }
`

export const RevenueCenterChild = ({ revenueCenter, style }) => {
  const { hours_desc, description } = revenueCenter
  const hoursDesc = hours_desc ? stripTags(hours_desc) : null
  const desc = description ? stripTags(description) : null
  return (
    <RevenueCenterView style={style}>
      <RevenueCenterContent>
        <div>
          <RevenueCenterHeader>
            <h2>{revenueCenter.name}</h2>
          </RevenueCenterHeader>
          <RevenueCenterActions>
            {desc && (
              <RevenueCenterDesc>
                <p>{desc}</p>
              </RevenueCenterDesc>
            )}
            {hoursDesc && (
              <RevenueCenterAction
                icon={iconMap['Clock']}
                text={hoursDesc}
                arrow={null}
              />
            )}
          </RevenueCenterActions>
        </div>
      </RevenueCenterContent>
    </RevenueCenterView>
  )
}

RevenueCenterChild.displayName = 'RevenueCenterChild'
RevenueCenterChild.propTypes = {
  revenueCenter: propTypes.object,
  style: propTypes.object,
}

const RevenueCenter = ({
  revenueCenter,
  showImage,
  isMenu,
  isLanding,
  style = null,
}) => {
  const { cartGuest } = useSelector(selectGroupOrder)
  const { storePhone = true } = useSelector(selectDisplaySettings)
  const { serviceType } = useSelector(selectOrder)
  const { address, images, hours, is_outpost, delivery_url, description } =
    revenueCenter
  const smallImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const largeImg = images.find((i) => i.type === 'SMALL_IMAGE')
  const bgImage = smallImg.url || largeImg.url
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const phoneUrl = address.phone ? `tel:${address.phone}` : null
  const hoursDesc = hours.description ? stripTags(hours.description) : null
  const hoursDescIcon = is_outpost ? iconMap.AlertCircle : iconMap.Clock
  const isExternalDelivery = serviceType === 'DELIVERY' && delivery_url

  const distance =
    revenueCenter.distance !== null && revenueCenter.distance !== undefined
      ? revenueCenter.distance
      : null

  const createMarkup = () => {
    return { __html: description }
  }

  return (
    <RevenueCenterView style={style} isMenu={isMenu}>
      {showImage && (
        <RevenueCenterImage style={bgStyle}>&nbsp;</RevenueCenterImage>
      )}
      <RevenueCenterContent showImage={showImage}>
        {isExternalDelivery ? (
          <div>
            <RevenueCenterHeader>
              <h2>Proper@Home Delivered By Bentocart</h2>
            </RevenueCenterHeader>
            <RevenueCenterDelivery>
              <div dangerouslySetInnerHTML={createMarkup()} />
              <a href={delivery_url} rel="noopener noreferrer" target="_blank">
                <img src={bentocartButton} alt="Order on BentoCart" />
              </a>
            </RevenueCenterDelivery>
          </div>
        ) : (
          <div>
            <RevenueCenterHeader>
              <h2>{revenueCenter.name}</h2>
              {distance !== null && <p>{distance.toFixed(2)} miles away</p>}
            </RevenueCenterHeader>
            <RevenueCenterActions>
              <a
                href={revenueCenter.directions_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <RevenueCenterAction
                  icon={iconMap.MapPin}
                  text={address.street}
                />
              </a>
              {storePhone && phoneUrl && (
                <a href={phoneUrl} rel="noopener noreferrer" target="_blank">
                  <RevenueCenterAction
                    icon={iconMap.Phone}
                    text={address.phone}
                  />
                </a>
              )}
              {hoursDesc && (
                <RevenueCenterAction
                  icon={hoursDescIcon}
                  text={hoursDesc}
                  arrow={null}
                />
              )}
            </RevenueCenterActions>
            {!cartGuest && (
              <RevenueCenterOrder
                revenueCenter={revenueCenter}
                isMenu={isMenu}
                isLanding={isLanding}
              />
            )}
          </div>
        )}
      </RevenueCenterContent>
    </RevenueCenterView>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  showImage: propTypes.bool,
  isMenu: propTypes.bool,
  isLanding: propTypes.bool,
  style: propTypes.object,
}

export default RevenueCenter
