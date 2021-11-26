import React, { useEffect, useMemo, useState } from 'react'
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
import {
  makeDates,
  makeTimes,
  makeReadableDateStrFromIso,
  serviceTypeNamesMap,
} from '@open-tender/js'
import { ButtonLink, ButtonStyled, SelectOnly } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const OrderTimeView = styled('div')`
  label: OrderTimeSelects;

  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const OrderTimeAsap = styled('div')`
  label: OrderTimeAsap;

  margin: 0 0 3rem;

  button {
    width: 100%;
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
    font-size: ${(props) => props.theme.fonts.sizes.small};
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
    timezone,
    first_times,
    holidays,
    days_ahead,
    valid_times,
  } = revenueCenter
  const menuSlug = `/menu/${slug}`
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const firstTime = first_times[serviceType]
  const [date, setDate] = useState(firstTime.date)
  const [time, setTime] = useState(firstTime.minutes)
  const dates = useMemo(
    () => makeDates(firstTime.date, days_ahead, 'E, MMM d'),
    [firstTime.date, days_ahead]
  )
  const dateOptions = dates.map(({ label, value }) => ({ name: label, value }))
  const timeOptions = useMemo(
    () =>
      makeTimes(date, firstTime, valid_times, holidays, serviceType, timezone),
    [date, firstTime, valid_times, holidays, serviceType, timezone]
  )
  const firstOrderableTime = timeOptions.find((i) => !i.disabled)
  const firstMinutes = firstOrderableTime ? firstOrderableTime.value : null
  console.log(firstTime)
  const asapTime = firstTime
    ? makeReadableDateStrFromIso(firstTime.utc, timezone)
    : null

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

  const changeDate = (evt) => {
    setDate(evt.target.value)
  }

  const changeTime = (evt) => {
    setTime(evt.target.value)
  }

  useEffect(() => {
    setTime(firstMinutes)
  }, [date, firstMinutes])

  return (
    <ModalView>
      <ModalContent
        title={`${serviceTypeName} from ${name}`}
        footer={
          <OrderTimeNevermind>
            <ButtonLink onClick={cancel}>
              Nevermind, let's choose a different location
            </ButtonLink>
            {/* <ButtonStyled onClick={cancel} color="cart">
              Choose a different location
            </ButtonStyled> */}
          </OrderTimeNevermind>
        }
      >
        <OrderTimeView>
          {firstTime.has_asap ? (
            <>
              <OrderTimeAsap>
                <ButtonStyled onClick={handleASAP}>
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
        </OrderTimeView>
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
