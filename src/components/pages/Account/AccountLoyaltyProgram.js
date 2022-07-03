import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerLoyalty,
  selectCustomerLoyaltyProgram,
} from '@open-tender/redux'

import { selectBrand } from '../../../slices'
import Loading from '../../Loading'
import AccountLoyaltyPoints from './AccountLoyaltyPoints'
import AccountLoyaltySpend from './AccountLoyaltySpend'

const AccountLoyaltyProgram = () => {
  const dispatch = useDispatch()
  const { loyalty } = useSelector(selectBrand)
  const { terms = {} } = loyalty || {}
  const { program, loading } = useSelector(selectCustomerLoyaltyProgram)
  const hasProgram = program ? true : false
  const { points, credit, redemption, spend } = program || {}

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return loading === 'pending' && !hasProgram ? (
    <Loading text="Retrieving your loyalty status..." />
  ) : points ? (
    <AccountLoyaltyPoints terms={points} thresholds={terms.thresholds} />
  ) : credit ? (
    <AccountLoyaltySpend
      credit={credit.current}
      spend={spend.current}
      threshold={redemption.threshold}
      reward={redemption.reward}
    />
  ) : terms.thresholds ? (
    <AccountLoyaltyPoints
      isGuest={true}
      terms={{ points: 0, ...terms }}
      thresholds={terms.thresholds}
    />
  ) : (
    <AccountLoyaltySpend
      credit="0.00"
      spend="0.00"
      threshold={terms.threshold}
      reward={terms.reward}
      isGuest={true}
    />
  )
}

AccountLoyaltyProgram.displayName = 'AccountLoyaltyProgram'
AccountLoyaltyProgram.propTypes = {}

export default AccountLoyaltyProgram
