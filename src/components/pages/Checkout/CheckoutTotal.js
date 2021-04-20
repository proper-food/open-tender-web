import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import { BarLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

import { selectLightColor } from '../../../slices'
import { Container } from '../..'

const CheckoutTotalView = styled('header')`
  position: fixed;
  z-index: 10;
  right: 0;
  width: 100%;
  max-width: 100%;
  top: ${(props) => props.theme.layout.navHeight};
  height: ${(props) => props.theme.layout.navHeight};
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.dark};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: ${(props) => props.theme.layout.navHeightMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const CheckoutTotalContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 36rem;
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const CheckoutTotalLabel = styled(Preface)`
  // font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.light};
`

const CheckoutTotal = ({ checkout = {} }) => {
  const colorLight = useSelector(selectLightColor)
  const { check, loading, submitting } = checkout
  const updating = submitting ? false : loading === 'pending'
  const total =
    check && check.totals ? `${formatDollars(check.totals.total)}` : null
  const hasTip = check && check.config ? check.config.gratuity.has_tip : false
  return total ? (
    <CheckoutTotalView role="banner">
      <Container>
        <CheckoutTotalContainer>
          <div>
            <CheckoutTotalLabel>
              Order Total w/ Tax{hasTip && ' & Tip'}
            </CheckoutTotalLabel>
          </div>
          <div>
            {updating ? (
              <BarLoader
                width={50}
                height={4}
                color={colorLight}
                loading={true}
              />
            ) : (
              <CheckoutTotalLabel>{total}</CheckoutTotalLabel>
            )}
          </div>
        </CheckoutTotalContainer>
      </Container>
    </CheckoutTotalView>
  ) : null
}

CheckoutTotal.displayName = 'CheckoutTotal'
CheckoutTotal.propTypes = {
  checkout: propTypes.object,
}

export default CheckoutTotal
