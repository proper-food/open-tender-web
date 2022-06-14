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
`

const RewardView = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
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
  flex: 0 0 7rem;
  height: 7rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.cards.default.borderRadius};
`

const RewardDetails = styled('div')`
  flex: 1 1 100%;
  // height: 100%;
  padding: 0 2rem 0 1.5rem;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 7rem;
  }
`

const RewardContent = styled('div')`
  padding: 0 1rem 0 0;
`

const RewardNote = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 0 0.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};

  span {
    display: block;
    line-height: 1.4;
  }
`

const RewardNoteIcon = styled.span`
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.4rem 0 0;
`

// const RewardTitle = styled('p')`
//   color: ${(props) => props.theme.colors.primary};
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   // font-weight: ${(props) => props.theme.boldWeight};
//   line-height: 1.25;
// `

const RewardTitle = styled(Heading)`
  line-height: 1.25;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const RewardDescription = styled('p')`
  margin: 0.5rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  display: none;
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
          <RewardNoteIcon>{iconMap.Grid}</RewardNoteIcon>In-store only
        </>
      )
    case 'PICKUP':
      return (
        <>
          <RewardNoteIcon>{iconMap.ShoppingBag}</RewardNoteIcon>Pickup only
        </>
      )
    case 'DELIVERY':
      return (
        <>
          <RewardNoteIcon>{iconMap.Truck}</RewardNoteIcon>Delivery only
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

const RewardChannel = styled.span`
  color: ${(props) => props.theme.colors.alert};
`

const RewardDash = styled.span`
  margin: 0 0.2rem;
`

const makeChannelType = (channelType) => {
  switch (channelType) {
    case 'APP':
      return <RewardChannel>App Only!</RewardChannel>
    case 'ONLINE':
      return <RewardChannel>Online Only!</RewardChannel>
    case 'POS':
      return <RewardChannel>At POS Only!</RewardChannel>
    case 'KIOSK':
      return <RewardChannel>Kiosk Only!</RewardChannel>
    default:
      return null
  }
}

export const makeLimitations = (item) => {
  const { channel_type, order_type, service_type } = item
  const serviceType = makeServiceType(service_type)
  const orderType = makeOrderType(order_type)
  const channelType = makeChannelType(channel_type)
  const comma = serviceType && orderType ? ', ' : null
  const dash =
    (serviceType || orderType) && channelType ? (
      <RewardDash>-</RewardDash>
    ) : null
  if (serviceType || orderType || channelType) {
    return (
      <>
        {serviceType}
        {comma}
        {orderType}
        {dash}
        {channelType}
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
            {reward.end_date && (
              <RewardExpiration>
                {reward.end_date === today ? (
                  <p>Valid today only</p>
                ) : reward.end_date ? (
                  <p>Use by {reward.expiration}</p>
                ) : null}
              </RewardExpiration>
            )}
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
