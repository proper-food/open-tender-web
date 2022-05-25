import propTypes from 'prop-types'
import styled from '@emotion/styled'

import iconMap from '../iconMap'

const OrderProgressView = styled.div`
  position: relative;
  width: 0.4rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: 0.5rem;
`

const OrderProgressFill = styled.div`
  width: 0.4rem;
  height: 0;
  border-radius: 0.5rem;
  animation: fill-bar-vertical 0.5s ease-in-out 0.5s forwards;
  background-color: ${(props) => props.theme.colors.primary};
`

const OrderProgressPoint = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}%`};
  left: -0.8rem;
  margin-top: -1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  // border: 0.2rem solid ${(props) => props.theme.bgColors.primary};
  background-color: ${(props) =>
    props.filled ? props.theme.colors.primary : props.theme.bgColors.tertiary};
`

const OrderProgressPointCheck = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0 0 0.1rem;
    color: ${(props) => props.theme.bgColors.primary};
  }
`

const statusPercentages = {
  TODO: 25,
  IN_PROGRESS: 50,
  DONE: 75,
  COMPLETED: 100,
}

const OrderProgress = ({ prepStatus }) => {
  const percent = statusPercentages[prepStatus]
  const style = { height: `${percent || 0}%` }
  const steps = [0, 25, 50, 75, 100]

  return (
    <OrderProgressView>
      <div style={style}>
        <OrderProgressFill />
      </div>
      {steps.map((step) => (
        <OrderProgressPoint key={step} top={step} filled={percent >= step}>
          {percent >= step && (
            <OrderProgressPointCheck>
              <span>{iconMap.Check}</span>
            </OrderProgressPointCheck>
          )}
        </OrderProgressPoint>
      ))}
    </OrderProgressView>
  )
}

OrderProgress.displayName = 'OrderProgress'
OrderProgress.propTypes = {
  prepStatus: propTypes.string,
}

export default OrderProgress
