import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars } from '@open-tender/js'
import { TriangleDown } from './icons'
import {
  ProgressPointsView,
  ProgressPointsFill,
  ProgressPoint,
  ProgressPointText,
  ProgressPointCircle,
  ProgressPointPoints,
} from './ProgressPoints'

const ProgressSpendRemaining = styled.div`
  margin: 1rem 0 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const ProgressSpend = ({ spend, threshold, reward }) => {
  const s = parseFloat(spend)
  const t = parseFloat(threshold)
  const r = parseFloat(reward)
  const remaining = t - s
  const progress = Math.min((s / t) * 100, 100)
  const style = { width: `${progress || 0}%` }

  return (
    <>
      <ProgressPointsView style={{ margin: '4rem 0 0' }}>
        <div style={style}>
          <ProgressPointsFill />
        </div>
        <ProgressPoint style={{ left: '100%' }} isLast={true}>
          <ProgressPointText>{formatDollars(t, '', 0)}</ProgressPointText>
          <ProgressPointCircle />
        </ProgressPoint>
        <ProgressPoint style={{ left: `${progress}%` }}>
          <ProgressPointPoints>{formatDollars(s, '', 0)}</ProgressPointPoints>
          <TriangleDown />
        </ProgressPoint>
      </ProgressPointsView>
      <ProgressSpendRemaining>
        <p>
          {formatDollars(remaining)} away from your next ${formatDollars(r)}{' '}
          off!
        </p>
      </ProgressSpendRemaining>
    </>
  )
}

ProgressSpend.displayName = 'ProgressSpend'
ProgressSpend.propTypes = {
  spend: propTypes.string,
  threshold: propTypes.string,
  reward: propTypes.string,
}

export default ProgressSpend
