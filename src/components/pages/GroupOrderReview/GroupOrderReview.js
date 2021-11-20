import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectGroupOrder } from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { Box } from '@open-tender/components'

import { selectBrand } from '../../../slices'
import GroupOrderReviewGuest from './GroupOrderReviewGuest'
import GroupOrderReviewOwner from './GroupOrderReviewOwner'

export const GroupOrderCartView = styled(Box)`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.375s forwards;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: ${(props) => props.theme.layout.padding} auto;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
    padding: ${(props) => props.theme.layout.paddingMobile};
  }

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }
`

const GroupOrderReview = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartOwner, cartGuest } = groupOrder

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!cartId) history.push(`/`)
  }, [cartId, history])

  return (
    <>
      <Helmet>
        <title>Review Group Order | {siteTitle}</title>
      </Helmet>
      {cartGuest ? (
        <GroupOrderReviewGuest />
      ) : cartOwner ? (
        <GroupOrderReviewOwner />
      ) : null}
    </>
  )
}

GroupOrderReview.displayName = 'GroupOrderReview'
export default GroupOrderReview
