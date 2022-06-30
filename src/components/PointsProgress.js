import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { openModal } from '../slices'
import { useDispatch } from 'react-redux'

const ProgressPointsView = styled('div')`
  position: relative;
  width: 100%;
  border-style: solid;
  border-width: 0.05rem;
  border-color: ${(props) => props.theme.border.color};
  background-color: ${(props) => props.theme.bgColors.primary};
`

const ProgressPointsFill = styled('div')`
  width: 0;
  height: 1.2rem;
  animation: fill-bar 0.5s ease-in-out 0.5s forwards;
  background-color: ${(props) => props.theme.bgColors.success};
`

const ProgressPoint = styled('div')`
  position: absolute;
  top: -0.7rem;
  margin-left: -1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isFilled
      ? props.theme.colors.primary
      : props.theme.bgColors.tertiary};
`

const ProgressPointContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const ProgressPointButton = styled('button')`
  position: absolute;
  z-index: 1;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  text-indent: -5000px;

  &:hover ~ div {
    opacity: 1;
    visiblity: visible;
    transform: translateY(0);
  }
`

const ProgressPointHover = styled('div')`
  position: absolute;
  bottom: 125%;
  left: 0;
  width: 16rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: all 250ms ease;
  opacity: 0;
  visiblity: hidden;
  transform: translateY(1rem);
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }

  & > span {
    display: block;
    background-color: ${(props) => props.theme.bgColors.primary};
    margin: 0 auto;
    padding: 1rem 2rem;
    box-shadow: ${(props) => props.theme.boxShadow.outer};
    text-align: center;

    & > span {
      display: block;

      &:first-of-type {
        color: ${(props) => props.color};
        font-size: ${(props) => props.theme.fonts.sizes.small};
        margin: 0 0 0.5rem;
      }

      &:last-of-type {
        font-size: ${(props) => props.theme.fonts.sizes.xSmall};
      }
    }
  }
`

const ProgressAmount = styled('div')`
  position: absolute;
  top: 2.2rem;
  width: 5rem;
  margin-left: -2.6rem;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const ProgressPoints = ({ progress, tiers = [] }) => {
  const dispatch = useDispatch()
  const style = { width: `${progress || 0}%` }

  const showTier = (evt, tier) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'loyaltyTier', args: { tier } }))
  }

  return (
    <ProgressPointsView>
      <div style={style}>
        <ProgressPointsFill />
      </div>
      {/* {tiers.map((tier) => (
        <ProgressPoint
          key={tier.percentage}
          isFilled={progress > tier.percentage}
          style={{
            left: `${tier.percentage.toFixed(5)}%`,
          }}
        >
          <ProgressPointContainer>
            <ProgressPointButton onClick={(evt) => showTier(evt, tier)}>
              {tier.name}
            </ProgressPointButton>
            <ProgressPointHover color={tier.color}>
              <span>
                <span>{tier.name} Tier</span>
                <span>Click for details</span>
              </span>
            </ProgressPointHover>
          </ProgressPointContainer>
        </ProgressPoint>
      ))}
      {tiers.map((tier) => (
        <ProgressAmount
          key={tier.percentage}
          style={{ left: `${tier.percentage.toFixed(5)}%` }}
        >
          {tier.value}
        </ProgressAmount>
      ))} */}
    </ProgressPointsView>
  )
}

ProgressPoints.displayName = 'ProgressPoints'
ProgressPoints.propTypes = {
  progress: propTypes.number,
}

export default ProgressPoints
