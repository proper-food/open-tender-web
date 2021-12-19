import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import CheckoutButton from './CheckoutButton'
import { cardIconMap } from '../../../assets/cardIcons'

const CheckoutCreditCardsView = styled.div``

const CheckoutCreditCards = ({ apply, remove, isPaid }) => {
  const { check, form } = useSelector(selectCheckout)
  const cards = check.customer ? check.customer.credit_cards || [] : []
  const [cardCount, setCardCount] = useState(cards.length)
  const hasCards = cards && cards.length > 0
  const appliedCard = form.tenders.find((i) => i.customer_card_id) || {}
  const appliedCardId = appliedCard.customer_card_id || null
  const defaultCard = cards.find((i) => i.is_default)
  const defaultCardId = defaultCard ? defaultCard.customer_card_id : null

  // if customer adds new default card, replace the current credit tender
  useEffect(() => {
    if (cards.length > cardCount) {
      setCardCount(cards.length)
      if (defaultCardId && appliedCardId !== defaultCardId) {
        apply({ tender_type: 'CREDIT', customer_card_id: defaultCardId }, true)
      }
    }
  }, [appliedCardId, defaultCardId, apply, cardCount, cards.length])

  if (!hasCards) return null

  return (
    <CheckoutCreditCardsView>
      {cards.map((card) => {
        const {
          card_type_name,
          card_type,
          last4,
          customer_card_id,
          is_default,
        } = card
        const title = `${card_type_name} - ${last4}`
        const isApplied = customer_card_id === appliedCard.customer_card_id
        const subtitle = isApplied
          ? `${formatDollars(appliedCard.amount)} applied to check`
          : is_default
          ? 'Default Card'
          : null
        const disabled = isPaid && !isApplied
        const tender = { tender_type: 'CREDIT', customer_card_id }
        const onPress = isApplied ? () => remove() : () => apply(tender)
        return (
          <CheckoutButton
            key={customer_card_id}
            icon={<img src={cardIconMap[card_type]} alt={card_type_name} />}
            title={title}
            subtitle={subtitle}
            onPress={onPress}
            isApplied={isApplied}
            disabled={disabled}
          />
        )
      })}
    </CheckoutCreditCardsView>
  )
}

export default CheckoutCreditCards
