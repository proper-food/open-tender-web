import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { removeCustomerGiftCard } from '@open-tender/redux'
import { Box, ButtonLink, Text } from '@open-tender/components'

import { openModal } from '../slices'
import iconMap from './iconMap'
import { LinkSeparator, QRCode } from '.'
import styled from '@emotion/styled'

const GiftCardView = styled(Box)`
  label: GiftCardView;

  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
`

const GiftCardQRCode = styled('button')`
  width: 8rem;
`

const GiftCardContent = styled('div')`
  label: GiftCardContent;

  flex: 1 1 75%;
  padding: 0.2rem 0 0.2rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }

  div:first-of-type p:first-of-type {
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    margin: 0rem 0 0;
  }
`

const GiftCardAction = styled('div')`
  label: GiftCardAction;

  margin: 0 0 0 0.5rem;

  button {
    width: 2rem;
    height: 2rem;
  }
`

const GiftCard = ({ giftCard }) => {
  const dispatch = useDispatch()
  const expired = dateStrToDate(giftCard.expiration) < new Date()
  const removeable = expired || giftCard.balance === '0.00'
  const src = giftCard.qr_code_url
  const alt = `Gift Card ${giftCard.card_number}`

  const addValue = (giftCard) => {
    dispatch(openModal({ type: 'giftCard', args: { giftCard } }))
  }

  const remove = (giftCard) => {
    const giftCardId = giftCard.gift_card_id
    dispatch(removeCustomerGiftCard(giftCardId))
  }

  const expand = (evt, src, alt) => {
    if (!src) return
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
    const title = alt
    const alert = 'QR codes are for in-store use only'
    const footnote =
      'To use online, simply apply this gift card on the checkout page'
    dispatch(
      openModal({ type: 'qrCode', args: { src, alt, title, alert, footnote } })
    )
  }

  return (
    <GiftCardView>
      {src ? (
        <GiftCardQRCode onClick={(evt) => expand(evt, src, alt)}>
          <QRCode src={src} alt={alt} />
        </GiftCardQRCode>
      ) : null}
      <GiftCardContent>
        <div>
          <p>{giftCard.card_number}</p>
          <p>${giftCard.balance} remaining balance</p>
          <p>
            <ButtonLink
              onClick={() => addValue(giftCard)}
              disabled={giftCard.isLoading || expired}
            >
              Add value
            </ButtonLink>
            {removeable && (
              <>
                <LinkSeparator />
                <ButtonLink
                  onClick={() => remove(giftCard)}
                  disabled={giftCard.isLoading}
                >
                  remove
                </ButtonLink>
              </>
            )}
          </p>
        </div>
        {giftCard.expiration && (
          <div>
            <Text
              color={expired ? 'alert' : 'secondary'}
              size="xSmall"
              // bold={expired ? true : false}
              as="p"
            >
              {expired ? 'Expired ' : 'Expires '}
              {formatDateStr(giftCard.expiration, 'MMM d, yyyy')}
            </Text>
          </div>
        )}
      </GiftCardContent>
      <GiftCardAction>
        <ButtonLink
          onClick={() => expand(null, src, alt)}
          disabled={false}
          label={`Apply gift card ${giftCard.card_number}`}
        >
          {iconMap.PlusCircle}
        </ButtonLink>
      </GiftCardAction>
    </GiftCardView>
  )
}

GiftCard.displayName = 'GiftCard'
GiftCard.propTypes = {
  giftCard: propTypes.object,
  isLoading: propTypes.bool,
}

export default GiftCard
