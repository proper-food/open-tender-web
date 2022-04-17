import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isoToDateStr } from '@open-tender/js'
import OrderProgress from './OrderProgress'
import { fetchCustomerOrder, selectCustomerOrder } from '@open-tender/redux'

const OrderPrepView = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`

const OrderPrepContainer = styled.div`
  position: relative;
  padding: 0 0 0 7rem;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 0 7rem;
  }
`

const OrderPrepProgress = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  bottom: 3rem;
  width: 7rem;
  display: flex;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 7rem;
  }
`

const OrderPrepStepView = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const OrderPrepStepTitle = styled.p`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  ${(props) =>
    props.isActive ? `font-weight: ${props.theme.boldWeight};` : null}
`

const OrderPrepStepSubtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.tertiary};
`

const OrderPrepStep = ({ title, timestamp, isActive }) => {
  return (
    <OrderPrepStepView>
      <div>
        <OrderPrepStepTitle isActive={isActive}>{title}</OrderPrepStepTitle>
        <OrderPrepStepSubtitle>
          {timestamp
            ? isoToDateStr(timestamp, null, 'MMM d, yyyy @ h:mma')
                .replace('PM', 'pm')
                .replace('AM', 'am')
            : ' '}
        </OrderPrepStepSubtitle>
      </div>
    </OrderPrepStepView>
  )
}

const OrderPrep = ({ orderId, orderPrep }) => {
  const dispatch = useDispatch()
  const { order } = useSelector(selectCustomerOrder)
  const { prep_status, created_at, fire_at, done_at, completed_at } =
    order && order.order_id === orderId ? order.order_prep : orderPrep

  useEffect(() => {
    if (fire_at !== null) {
      const update = setInterval(
        () => dispatch(fetchCustomerOrder(orderId)),
        15000
      )
      return () => clearInterval(update)
    }
  }, [dispatch, orderId, fire_at])

  if (fire_at === null) return null

  return (
    <OrderPrepView>
      {/* <OrderPrepHeader>
        <OrderPrepTitle>Order Progress</OrderPrepTitle>
      </OrderPrepHeader> */}
      <OrderPrepContainer>
        <OrderPrepProgress>
          <OrderProgress prepStatus={prep_status} />
        </OrderPrepProgress>
        <OrderPrepStep title="Order submitted" timestamp={created_at} />
        <OrderPrepStep
          title="Order received"
          timestamp={created_at}
          isActive={prep_status === 'TODO'}
        />
        <OrderPrepStep
          title="Preparing your order"
          timestamp={fire_at}
          isActive={prep_status === 'IN_PROGRESS'}
        />
        <OrderPrepStep
          title="Double checking your order"
          timestamp={done_at}
          isActive={prep_status === 'DONE'}
        />
        <OrderPrepStep
          title="Order ready for pickup!"
          timestamp={completed_at}
          isActive={prep_status === 'COMPLETED'}
        />
      </OrderPrepContainer>
    </OrderPrepView>
  )
}

OrderPrep.displayName = 'OrderPrep'
OrderPrep.propTypes = {
  orderId: propTypes.number,
  orderPrep: propTypes.object,
}

export default OrderPrep
