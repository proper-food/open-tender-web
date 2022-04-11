import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { BgImage, Box, Heading } from '@open-tender/components'
import { makeLocalDateStr, formatDateStr } from '@open-tender/js'

import { openModal } from '../slices'
import iconMap from './iconMap'
import { Tag } from '.'

const RewardButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;

  &:hover,
  &:active {
    & > div {
      transition: all 0.25s ease-in-out;
      transform: translate3D(0, -0.5rem, 0);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        transform: none;
        box-shadow: none;
      }
    }
  }
`

const RewardView = styled(Box)`
  position: relative;
  height: 100%;
  min-height: 16rem;
  display: flex;
  align-items: center;
  padding: 0;
  border: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 8rem;
  }
`

const RewardTag = styled('div')`
  position: absolute;
  top: -0.9rem;
  right: 1rem;

  & > span {
    padding: 0.3rem 1rem 0.4rem;
  }
`

const RewardImage = styled(BgImage)`
  flex: 0 0 16rem;
  height: 100%;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.cards.default.borderRadius};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 8rem;
  }
`

const RewardDetails = styled('div')`
  flex: 1 1 100%;
  height: 100%;
  padding: 1.5rem 2rem 1.5rem 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 1 1 100%;
    padding: 1rem 2rem 1rem 1.5rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`

const RewardContent = styled('div')`
  padding: 0 1rem 0 0;
`

const RewardNote = styled('div')`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    margin: 0 0 0.5rem;
  }

  span {
    display: block;
    line-height: 1.4;
  }

  span:first-of-type {
    width: 1.6rem;
    height: 1.6rem;
    margin: 0 0.8rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0 0.4rem 0 0;
    }
  }
`

// const RewardTitle = styled('p')`
//   color: ${(props) => props.theme.colors.primary};
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   // font-weight: ${(props) => props.theme.boldWeight};
//   line-height: 1.25;
// `

const RewardTitle = styled(Heading)`
  line-height: 1.25;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RewardDescription = styled('p')`
  margin: 0.5rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    display: none;
  }
`

const RewardExpiration = styled('div')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const makeImageUrl = (images) => {
  const imagesMap = images
    .filter((i) => i.url)
    .reduce((obj, i) => ({ ...obj, [i.type]: i.url }), {})
  return imagesMap.SMALL_IMAGE || imagesMap.APP_IMAGE || imagesMap.LARGE_IMAGE
}

const makeServiceType = (serviceType) => {
  switch (serviceType) {
    case 'WALKIN':
      return (
        <>
          <span>{iconMap.Grid}</span>Scan in-store only
        </>
      )
    case 'PICKUP':
      return (
        <>
          <span>{iconMap.ShoppingBag}</span>Pickup orders only
        </>
      )
    case 'DELIVERY':
      return (
        <>
          <span>{iconMap.Truck}</span>Delivery orders only
        </>
      )
    default:
      return null
  }
}

const makeOrderType = (orderType) => {
  switch (orderType) {
    case 'OLO':
      return null
    case 'CATERING':
      return 'Catering only'
    case 'MERCH':
      return 'Merch only'
    default:
      return null
  }
}

export const makeLimitations = (item) => {
  const { order_type, service_type } = item
  const serviceType = makeServiceType(service_type)
  const orderType = makeOrderType(order_type)
  const comma = serviceType && orderType ? ', ' : null
  if (serviceType || orderType) {
    return (
      <>
        {serviceType}
        {comma}
        {orderType}
      </>
    )
  }
  return (
    <>
      <span>{iconMap.Star}</span>Valid on all orders
    </>
  )
}

const makeReward = (item) => {
  const imageUrl = makeImageUrl(item.images)
  const expiration = formatDateStr(item.end_date, 'MMMM d, yyyy')
  const limitations = makeLimitations(item)
  return { ...item, imageUrl, expiration, limitations }
}

const Reward = ({ item }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'yyyy-MM-dd')
  const reward = makeReward(item)
  const todayOnly = reward.end_date === today
  const bgStyle = reward.imageUrl
    ? { backgroundImage: `url(${reward.imageUrl}` }
    : null

  const redeem = () => {
    const rewardForModal = { ...reward }
    delete rewardForModal.limitations
    const args = { reward: rewardForModal }
    dispatch(openModal({ type: 'reward', args }))
  }

  return (
    <RewardButton onClick={redeem} label={`Apply ${reward.name}`}>
      <RewardView>
        <RewardTag>
          {todayOnly && <Tag text="Today only!" icon={null} bgColor="alert" />}
        </RewardTag>
        <RewardImage style={bgStyle}>&nbsp;</RewardImage>
        <RewardDetails>
          <div>
            <RewardContent>
              <RewardNote>{reward.limitations}</RewardNote>
              <RewardTitle as="p">{reward.title}</RewardTitle>
              {reward.short_description && (
                <RewardDescription>
                  {reward.short_description}
                </RewardDescription>
              )}
            </RewardContent>
            <RewardExpiration>
              {reward.end_date === today ? (
                <p>Valid today only</p>
              ) : reward.end_date ? (
                <p>Use by {reward.expiration}</p>
              ) : (
                <p>Expires never!</p>
              )}
            </RewardExpiration>
          </div>
        </RewardDetails>
      </RewardView>
    </RewardButton>
  )
}

Reward.displayName = 'Reward'
Reward.propTypes = {
  item: propTypes.object,
}

export default Reward
