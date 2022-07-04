import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'react-feather'
import { resetOrder, selectOrder } from '@open-tender/redux'
import { openModal } from '../../../slices'
import { UserCircle } from '../../icons'
import { ButtonLarge } from '../..'

const GuestButtonsView = styled('div')`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 4rem 0 0;
  }

  button {
    width: 25rem;
    max-width: calc(50% - 1rem);
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      margin: 0;
    }
  }

  button + button {
    margin: 0 2rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const GuestButtons = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0

  const continueCurrent = () => {
    navigate(revenueCenter ? `/menu/${revenueCenter.slug}` : '/order-type')
  }

  const startNewOrder = () => {
    dispatch(resetOrder())
    navigate(`/order-type`)
  }

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <GuestButtonsView>
      <ButtonLarge onClick={login} text="Sign in or sign up" color="secondary">
        <UserCircle size={22} />
      </ButtonLarge>
      <ButtonLarge
        onClick={isCurrentOrder ? continueCurrent : startNewOrder}
        text={isCurrentOrder ? 'Continue Order' : 'Order Now'}
        color="primary"
      >
        <ArrowRight size={22} />
      </ButtonLarge>
    </GuestButtonsView>
  )
}

GuestButtons.displayName = 'GuestButtons'

export default GuestButtons
