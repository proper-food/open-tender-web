import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { makeDates } from '@open-tender/js'

const OrderDatepickerView = styled('div')`
  label: OrderDatepickerView;

  height: 26.8rem;
  padding: 2.4rem 0;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  ::-webkit-scrollbar {
    display: none;
  }
`

const OrderDatePickerSpacer = styled('div')`
  label: OrderDatePickerSpacer;

  width: 100%;
  height: ${(props) => (props.height * 4.4).toFixed(1)}rem;
`

const OrderDatepickerDateView = styled('div')`
  label: OrderDatepickerDateView;

  width: 100%;
  height: 4.4rem;

  button {
    width: 100%;
    height: 100%;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const OrderDatepickerDate = ({ date, setDate }) => {
  return (
    <OrderDatepickerDateView>
      <button onClick={(evt) => setDate(date.value)}>{date.label}</button>
    </OrderDatepickerDateView>
  )
}

const OrderDatepicker = ({ revenueCenter, serviceType }) => {
  const { first_times, holidays, days_ahead } = revenueCenter
  const firstTime = first_times[serviceType]

  const dates = makeDates(firstTime.date, days_ahead)
  console.log(dates)

  const setDate = (dateStr) => {
    console.log(dateStr)
  }

  return (
    <OrderDatepickerView>
      <OrderDatePickerSpacer height={2} />
      {dates.map((date) => (
        <OrderDatepickerDate date={date} setDate={setDate} />
      ))}
    </OrderDatepickerView>
  )
}

OrderDatepicker.displayName = 'OrderDatepicker'
OrderDatepicker.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
}

export default OrderDatepicker
