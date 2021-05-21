import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const TierDiscount = styled('p')`
  font-weight: ${(props) => props.theme.boldWeight};
`

const TierDescription = styled('div')`
  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    margin: 0.5em 0;
  }
`

const LoyaltyTier = ({ tier }) => {
  const dispatch = useDispatch()
  const paragraphs = tier.description
    ? tier.description.split('\n').filter((i) => i)
    : null

  return (
    <ModalView style={{ width: '60rem' }}>
      <ModalContent
        title={
          <span>
            <span style={{ color: `${tier.color}` }}>{tier.name} Tier</span>
          </span>
        }
        subtitle={
          tier.discount ? (
            <TierDiscount>Reward: {tier.discount.title}</TierDiscount>
          ) : null
        }
        footer={
          <div>
            <ButtonStyled onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        }
      >
        {paragraphs && (
          <TierDescription>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </TierDescription>
        )}
      </ModalContent>
    </ModalView>
  )
}

LoyaltyTier.displayName = 'LoyaltyTier'
LoyaltyTier.propTypes = {
  tier: propTypes.object,
}

export default LoyaltyTier
