import React, { useMemo, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setAddress,
  setOrderServiceType,
  setRequestedAt,
  setRevenueCenter,
} from '@open-tender/redux'
import { makeDates, serviceTypeNamesMap } from '@open-tender/js'
import { ButtonLink, ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'
import OrderDatepicker from '../OrderDatepicker'

const OrderTimeView = styled('div')`
  label: OrderTimeView;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 50%;
  }
`

const OrderTime = ({ revenueCenter, serviceType }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    name,
    slug,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
  } = revenueCenter
  const menuSlug = `/menu/${slug}`
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const { first_times, holidays, days_ahead } = revenueCenter
  const firstTime = first_times[serviceType]
  const [date, setDate] = useState(firstTime.date)
  const [time, setTime] = useState(null)
  const dates = useMemo(
    () => makeDates(firstTime.date, days_ahead),
    [firstTime.date, days_ahead]
  )
  console.log(dates)

  const handleASAP = () => {
    dispatch(setRevenueCenter(revenueCenter))
    dispatch(setOrderServiceType(rcType, serviceType, isOutpost))
    dispatch(setRequestedAt('asap'))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(closeModal())
    history.push(menuSlug)
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title={`${serviceTypeName} from ${name}`}
        footer={
          <div>
            <ButtonLink onClick={cancel}>
              Nevermind, let's choose a different location
            </ButtonLink>
            {/* <ButtonStyled onClick={cancel} color="cart">
              Choose a different location
            </ButtonStyled> */}
          </div>
        }
      >
        <div>
          <ButtonStyled onClick={handleASAP}>Order ASAP</ButtonStyled>
          <p>Or choose a different date & time below.</p>
          <OrderTimeView>
            <OrderDatepicker intervals={dates} setValue={setDate} />
            {/* <OrderDatepicker
              revenueCenter={revenueCenter}
              serviceType={serviceType}
            /> */}
          </OrderTimeView>
        </div>
      </ModalContent>
    </ModalView>
  )
}

OrderTime.displayName = 'OrderTime'
OrderTime.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
}

export default OrderTime
