import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { capitalize, serviceTypeNamesMap } from '@open-tender/js'
import {
  setAddress,
  setOrderServiceType,
  setRequestedAt,
  setRevenueCenter,
  showNotification,
} from '@open-tender/redux'
import {
  ButtonStyled,
  RequestedAtDateTime,
  RequestedAtTimes,
} from '@open-tender/components'

import { closeModal, toggleSidebar } from '../../slices'
import { ModalClose, ModalContent } from '..'
import ModalView from '../Modal/ModalView'

const RequestedAtModalView = styled(ModalView)`
  width: ${(props) => props.width};
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  //   max-width: 100%;
  //   min-height: 100%;
  //   margin: 0;
  //   border-radius: 0;
  // }

  & > div {
    padding: 3.5rem 3.5rem 4rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 3rem ${(props) => props.theme.layout.paddingMobile};
    }
  }
`

const RequestedAt = ({
  revenueCenter,
  orderType,
  serviceType,
  requestedAt,
  openSidebar = false,
  isReorder = false,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const isLocation = pathname.includes('/locations')
  if (!revenueCenter) return null

  const {
    slug,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
    first_times,
    order_times,
  } = revenueCenter
  const menuSlug = `/menu/${slug}`
  const firstTimes = first_times ? first_times[serviceType] : null
  const orderTimes = order_times ? order_times[serviceType] : null
  const serviceTypeName = serviceTypeNamesMap[serviceType].toLowerCase()

  const chooseTime = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(showNotification('Requested time updated!'))
    if (isLocation) {
      dispatch(setRevenueCenter(revenueCenter))
      dispatch(setOrderServiceType(rcType, serviceType, isOutpost))
      if (isOutpost) dispatch(setAddress(address))
      dispatch(closeModal())
      history.push(menuSlug)
    } else {
      dispatch(closeModal())
    }
    if (openSidebar) dispatch(toggleSidebar())
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <RequestedAtModalView width={firstTimes ? '44rem' : '56rem'}>
      {firstTimes ? (
        <>
          <ModalClose />
          <RequestedAtDateTime
            revenueCenter={revenueCenter}
            serviceType={serviceType}
            orderType={orderType}
            requestedAt={requestedAt}
            chooseTime={chooseTime}
            cancel={cancel}
            isLocation={isLocation}
            isReorder={isReorder}
          />
        </>
      ) : orderTimes ? (
        <ModalContent
          title="Choose an order date & time"
          subtitle={
            <p>
              Please select from the available {serviceTypeName} times below
            </p>
          }
        >
          <RequestedAtTimes
            orderTimes={orderTimes}
            revenueCenter={revenueCenter}
            requestedAt={requestedAt}
            setRequestedAt={chooseTime}
          />
        </ModalContent>
      ) : (
        <ModalContent
          title={`${capitalize(serviceTypeName)} is not available`}
          subtitle={<p>Please choose a different location</p>}
        >
          <ModalClose />
          <ButtonStyled onClick={() => dispatch(closeModal())}>
            Close
          </ButtonStyled>
        </ModalContent>
      )}
    </RequestedAtModalView>
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
  orderType: propTypes.string,
  requestedAt: propTypes.string,
  openSidebar: propTypes.bool,
  isReorder: propTypes.bool,
}

export default RequestedAt
