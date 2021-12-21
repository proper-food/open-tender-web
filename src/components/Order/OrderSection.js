import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const OrderSectionView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 1.5rem;
  border-bottom: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
  margin: 0 0 1.5rem;

  &:last-of-type {
    padding: 0;
    border: 0;
    margin: 0;
  }
`

const OrderSectionLabel = styled('div')`
  flex: 0 0 15rem;
  margin: 0 2rem 0 0;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 8rem;
  }

  span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const OrderSectionContent = styled('div')`
  flex: 1;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
    margin: 0.3em 0 0;

    &:first-of-type {
      font-size: ${(props) =>
        props.theme.fonts.sizes[props.noTitle ? 'small' : 'main']};
      color: ${(props) =>
        props.theme.fonts[props.noTitle ? 'body' : 'headings'].color};
    }
  }
`

const OrderSection = ({ label, noTitle = false, children }) => {
  return (
    <OrderSectionView>
      <OrderSectionLabel>
        <Preface>{label}</Preface>
      </OrderSectionLabel>
      <OrderSectionContent noTitle={noTitle}>{children}</OrderSectionContent>
    </OrderSectionView>
  )
}

OrderSection.displayName = 'OrderSection'
OrderSection.propTypes = {
  label: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default OrderSection
