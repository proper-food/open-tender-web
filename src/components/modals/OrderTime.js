import React, { useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setAddress,
  setOrderServiceType,
  setRequestedAt,
  setRevenueCenter,
} from '@open-tender/redux'
import {
  dateStrMinutesToIso,
  isoToDateStrMinutes,
  makeDates,
  makeTimes,
  makeReadableDateStrFromIso,
  serviceTypeNamesMap,
} from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  SelectOnly,
} from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const OrderTimeView = styled('div')`
  label: OrderTimeSelects;

  text-align: center;
  margin: 3rem 0 0;

  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const OrderTimeTitle = styled('p')`
  width: 100%;
  margin: 0;
  line-height: 1;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.h3};
`

const OrderTimeAsap = styled('div')`
  label: OrderTimeAsap;

  margin: 0 0 3rem;
  text-align: center;

  button {
    min-width: 32rem;
    max-width: 100%;
  }
`

const OrderTimeSelects = styled('div')`
  label: OrderTimeSelects;

  width: 100%;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OrderTimeSelect = styled('div')`
  width: 47.5%;

  select {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const OrderTimeNevermind = styled('div')`
  button {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const OrderTime = ({ revenueCenter, serviceType, orderType, requestedAt }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const isLocation = pathname.includes('/locations')
  const {
    name,
    slug,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
    timezone,
    first_times,
    holidays,
    days_ahead,
    valid_times,
    time_ranges,
  } = revenueCenter
  const menuSlug = `/menu/${slug}`
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const firstTime = first_times[serviceType]
  const timeRange = time_ranges[serviceType]
  const selected = requestedAt && requestedAt !== 'asap'
  const requested = selected ? isoToDateStrMinutes(requestedAt, timezone) : {}
  const [date, setDate] = useState(requested.date || firstTime.date)
  const [time, setTime] = useState(requested.minutes || firstTime.minutes)
  const [updated, setUpdated] = useState(selected ? true : false)
  const [dateChange, setDateChange] = useState(false)
  const daysAhead = orderType === 'CATERING' ? 100 : days_ahead
  const dates = useMemo(
    () => makeDates(firstTime.date, daysAhead, 'E, MMM d'),
    [firstTime.date, daysAhead]
  )
  const dateOptions = dates.map(({ label, value }) => ({ name: label, value }))
  const timeOptions = useMemo(
    () =>
      makeTimes(
        date,
        firstTime,
        valid_times,
        holidays,
        serviceType,
        timezone,
        timeRange
      ),
    [date, firstTime, valid_times, holidays, serviceType, timezone, timeRange]
  )
  const firstOrderableTime = timeOptions.find((i) => !i.disabled)
  const firstMinutes = firstOrderableTime ? firstOrderableTime.value : null
  const asapTime = firstTime
    ? makeReadableDateStrFromIso(firstTime.utc, timezone)
    : null
  const orderDate = dateOptions.find((i) => i.value === date)
  const orderTime =
    timeOptions.find((i) => i.value === time) ||
    timeOptions.find((i) => i.value === firstMinutes)
  const orderMsg =
    orderDate && orderTime
      ? `Order for ${orderDate.name} @ ${orderTime.name}`
      : 'Choose Time'
  const timeVal = orderTime ? orderTime.value : time
  const requestedTime = dateStrMinutesToIso(date, timeVal, timezone)

  const chooseTime = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    if (isLocation) {
      dispatch(setRevenueCenter(revenueCenter))
      dispatch(setOrderServiceType(rcType, serviceType, isOutpost))
      if (isOutpost) dispatch(setAddress(address))
      dispatch(closeModal())
      history.push(menuSlug)
    } else {
      dispatch(closeModal())
    }
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  const changeDate = (evt) => {
    setUpdated(true)
    setDate(evt.target.value)
    setDateChange(true)
  }

  const changeTime = (evt) => {
    setUpdated(true)
    setTime(parseInt(evt.target.value))
  }

  useEffect(() => {
    if (dateChange) {
      if (firstMinutes) setTime(firstMinutes)
      setDateChange(false)
    }
  }, [dateChange, firstMinutes])

  return (
    <ModalView>
      <ModalContent
        footer={
          <OrderTimeNevermind>
            <ButtonLink onClick={cancel}>
              {isLocation
                ? "Nevermind, let's choose a different location"
                : 'Nevermind, keep current time'}
            </ButtonLink>
          </OrderTimeNevermind>
        }
      >
        <OrderTimeTitle>
          <Heading>
            {serviceTypeName} from {name}
          </Heading>
        </OrderTimeTitle>
        <OrderTimeView>
          {firstTime.has_asap ? (
            <>
              <OrderTimeAsap>
                <ButtonStyled
                  onClick={() => chooseTime('asap')}
                  color={selected ? 'secondary' : 'primary'}
                >
                  Order ASAP (about {asapTime})
                </ButtonStyled>
              </OrderTimeAsap>
              <p>Or choose a different date & time below.</p>
            </>
          ) : (
            <p>Please choose a date & time below.</p>
          )}
          <OrderTimeSelects>
            <OrderTimeSelect>
              <SelectOnly
                label="Order Date"
                name="order-date"
                value={date}
                onChange={changeDate}
                options={dateOptions}
              />
            </OrderTimeSelect>
            <OrderTimeSelect>
              <SelectOnly
                label="Order Time"
                name="order-time"
                value={time}
                onChange={changeTime}
                options={timeOptions}
              />
            </OrderTimeSelect>
          </OrderTimeSelects>
          <OrderTimeAsap>
            <ButtonStyled
              onClick={() => chooseTime(requestedTime)}
              color={!firstTime.has_asap || updated ? 'primary' : 'secondary'}
            >
              {orderMsg}
            </ButtonStyled>
          </OrderTimeAsap>
        </OrderTimeView>
      </ModalContent>
    </ModalView>
  )
}

OrderTime.displayName = 'OrderTime'
OrderTime.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
  orderType: propTypes.string,
  requestedAt: propTypes.string,
}

export default OrderTime
