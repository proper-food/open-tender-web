import React, { useCallback, useMemo, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAmountRemaining, isString, updateTenders } from '@open-tender/js'
import { selectCheckout, updateForm } from '@open-tender/redux'
import { FormError } from '@open-tender/components'
import { PlusCircle } from 'react-feather'

import CheckoutButton from './CheckoutButton'
import CheckoutSection from './CheckoutSection'
import CheckoutCreditCards from './CheckoutCreditCards'
// import CheckoutHouseAccounts from './CheckoutHouseAccounts'

const CheckoutTendersErrors = styled.div`
  margin: 0 0 1.5rem;
`

const makeTenderErrors = (errors) => {
  if (!errors) return []
  const tenderErrors = errors ? Object.values(errors) : []
  return tenderErrors.reduce((arr, i) => {
    return isString(i) ? arr.concat([i]) : arr.concat(Object.values(i))
  }, [])
}

const CheckoutTenders = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [hasTender, setHasTender] = useState(false)
  const { check, form, errors } = useSelector(selectCheckout)
  const total = check.totals ? check.totals.total : 0.0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const isPaid = amount === '0.00'
  const tenderErrors = makeTenderErrors(errors.tenders)
  const hasErrors = tenderErrors.length > 0
  const giftTenders = useMemo(
    () => form.tenders.filter((i) => i.tender_type === 'GIFT_CARD'),
    [form.tenders]
  )
  const cards = check.customer ? check.customer.credit_cards : []
  const hasCards = cards && cards.length > 0
  const noTender = form.tenders.length === 0
  const customer_card_id =
    hasCards && noTender ? cards[0].customer_card_id : null

  // useEffect(() => {
  //   return () => dispatch(updateForm({ tenders: [] }))
  // }, [dispatch])

  useEffect(() => {
    const tenders = updateTenders(form.tenders, total)
    if (tenders) {
      dispatch(updateForm({ tenders }))
    }
  }, [form.tenders, total, dispatch])

  // automatically apply first credit card if user has one
  useEffect(() => {
    setHasTender(true)
    if (customer_card_id && !hasTender) {
      const tender = { tender_type: 'CREDIT', amount, customer_card_id }
      dispatch(updateForm({ tenders: [tender] }))
    }
  }, [hasTender, customer_card_id, amount, dispatch])

  const apply = useCallback(
    (data, swap) => {
      if (parseFloat(amount) > 0 || swap) {
        const tender = { tender_type: 'CREDIT', amount, ...data }
        dispatch(updateForm({ tenders: [...giftTenders, tender] }))
      }
    },
    [dispatch, amount, giftTenders]
  )

  const remove = () => {
    dispatch(updateForm({ tenders: giftTenders }))
  }

  return (
    <CheckoutSection>
      <h4>Apply Payment</h4>
      {hasErrors && (
        <CheckoutTendersErrors>
          {tenderErrors.map((errMsg, index) => (
            <FormError key={`${index}-${errMsg}`} errMsg={errMsg} />
          ))}
        </CheckoutTendersErrors>
      )}
      <CheckoutCreditCards apply={apply} remove={remove} isPaid={isPaid} />
      <CheckoutButton
        icon={
          <PlusCircle color={theme.colors.primary} width={18} height={18} />
        }
        title="Add new credit card"
        // onPress={() => navigation.navigate('/credit-card')}
        isApplied={false}
        disabled={isPaid}
      />
      {/* <CheckoutHouseAccounts apply={apply} remove={remove} isPaid={isPaid} /> */}
    </CheckoutSection>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'
CheckoutTenders.propTypes = {}

export default CheckoutTenders
