import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ProgressView = styled('div')`
  position: relative;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`

const ProgressBarFill = styled('div')`
  width: 0;
  height: 1rem;
  border-radius: 0.5rem;
  animation: fill-bar 0.5s ease-in-out 0.5s forwards;
  // background-color: ${(props) => props.theme.links.primary.color};
  background-color: ${(props) => props.theme.colors.primary};
`

const ProgressPoint = styled('div')`
  position: absolute;
  top: -0.7rem;
  margin-left: -1.2rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 0.2rem solid ${(props) => props.theme.bgColors.primary};
  background-color: ${(props) => props.theme.links.primary.color};
`

const ProgressAmount = styled('div')`
  position: absolute;
  top: 2.2rem;
  width: 5rem;
  margin-left: -2.6rem;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const ProgressBar = ({ progress, tiers = [] }) => {
  const style = { width: `${progress || 0}%` }
  return (
    <ProgressView>
      <div style={style}>
        <ProgressBarFill />
      </div>
      {tiers.map((point) => (
        <ProgressPoint
          key={point.percentage}
          style={{
            left: `${point.percentage.toFixed(5)}%`,
            backgroundColor: point.color,
          }}
        />
      ))}
      {tiers.map((point) => (
        <ProgressAmount
          key={point.percentage}
          style={{ left: `${point.percentage.toFixed(5)}%` }}
        >
          {point.value}
        </ProgressAmount>
      ))}
    </ProgressView>
  )
}

ProgressBar.displayName = 'ProgressBar'
ProgressBar.propTypes = {
  progress: propTypes.number,
}

export default ProgressBar
