import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Checkmark, Heading, Text } from '@open-tender/components'

const CheckoutTipButtonView = styled.button`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  margin: 0 0.5rem;
  border-width: ${(props) => props.theme.border.width};
  border-style: solid;
  border-color: ${(props) =>
    props.isApplied ? props.theme.colors.success : props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};

  &:disabled {
    opacity: 1;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.bgColors[
        props.isApplied ? 'primary' : props.disabled ? 'primary' : 'tertiary'
      ]};
  }

  & > span {
    display: block;
    text-align: center;
  }
`

const CheckoutTipButtonCheckmark = styled.div`
  position: absolute;
  z-index: 2;
  top: -0.8rem;
  right: -0.8rem;
`

const CheckoutTipButtonTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.medium};
  color: ${(props) =>
    props.theme.colors[props.isApplied ? 'primary' : 'primary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CheckoutTipButtonSubtitle = styled(Text)`
  margin: 0.3rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) =>
    props.theme.colors[props.isApplied ? 'secondary' : 'secondary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CheckoutTipButton = ({
  title,
  subtitle,
  onPress,
  isApplied,
  disabled,
}) => {
  return (
    <CheckoutTipButtonView
      onClick={onPress}
      disabled={disabled}
      isApplied={isApplied}
    >
      {isApplied ? (
        <CheckoutTipButtonCheckmark>
          <Checkmark />
        </CheckoutTipButtonCheckmark>
      ) : null}
      <CheckoutTipButtonTitle isApplied={isApplied}>
        {title}
      </CheckoutTipButtonTitle>
      {subtitle && (
        <CheckoutTipButtonSubtitle isApplied={isApplied}>
          {subtitle}
        </CheckoutTipButtonSubtitle>
      )}
    </CheckoutTipButtonView>
  )
}

CheckoutTipButton.displayName = 'CheckoutTipButton'
CheckoutTipButton.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  onPress: propTypes.func,
  isApplied: propTypes.bool,
  disabled: propTypes.bool,
}

export default CheckoutTipButton
