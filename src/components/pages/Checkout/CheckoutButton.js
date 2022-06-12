import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { PlusCircle, XCircle } from 'react-feather'
import { Checkmark, Heading, Text } from '@open-tender/components'

const CheckoutButtonView = styled.button`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-width: ${(props) => props.theme.buttons.sizes.large.borderWidth};
  border-style: solid;
  border-color: ${(props) =>
    props.isApplied
      ? props.theme.colors.success
      : props.theme.buttons.colors.large.borderColor};
  border-radius: ${(props) => props.theme.buttons.sizes.large.borderRadius};
  margin: 1rem 0 0;
  background-color: ${(props) => props.theme.buttons.colors.large.bgColor};

  &:hover {
    background-color: ${(props) =>
      props.isApplied || props.disabled
        ? props.theme.buttons.colors.large.bgColor
        : props.theme.buttons.colors.largeHover.bgColor};
  }
`

const CheckoutButtonCheckmark = styled.div`
  position: absolute;
  z-index: 2;
  top: -0.8rem;
  right: -0.8rem;
`

const CheckoutButtonInfo = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 0 1.5rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem 0 1rem 1.5rem;
  }
`

const CheckoutButtonIcon = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 3rem;
  margin: 0 2rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 1.5rem 0 0;
  }
`

const CheckoutButtonText = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;

  & > span {
    display: block;
    text-align: left;
  }
`

const CheckoutButtonTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.medium};
  color: ${(props) =>
    props.theme.colors[props.isApplied ? 'primary' : 'primary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CheckoutButtonSubtitle = styled(Text)`
  margin: 0.3rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) =>
    props.theme.colors[props.isApplied ? 'secondary' : 'secondary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CheckoutButtonButton = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 12rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem 0 0;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem 0 0;
  }
`

const CheckoutButtonButtonIcon = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 1.6rem;
    height: 1.6rem;
  }
`

const CheckoutButtonApply = styled(Text)`
  display: block;
  line-height: 1;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  margin: 0 0 0 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    margin: 0.1 0 0 0.4rem;
  }
`

const CheckoutButtonRemove = styled(CheckoutButtonApply)`
  color: ${(props) => props.theme.colors.error};
`

const CheckoutButton = ({
  icon,
  title,
  subtitle,
  finePrint,
  onPress,
  isApplied,
  disabled,
  applyText = 'Apply',
}) => {
  const { colors } = useTheme()
  return (
    <CheckoutButtonView
      onClick={onPress}
      disabled={disabled}
      isApplied={isApplied}
    >
      {isApplied ? (
        <CheckoutButtonCheckmark>
          <Checkmark />
        </CheckoutButtonCheckmark>
      ) : null}
      <CheckoutButtonInfo>
        {icon && <CheckoutButtonIcon>{icon}</CheckoutButtonIcon>}
        <CheckoutButtonText>
          <CheckoutButtonTitle isApplied={isApplied}>
            {title}
          </CheckoutButtonTitle>
          {subtitle && (
            <CheckoutButtonSubtitle isApplied={isApplied}>
              {subtitle}
            </CheckoutButtonSubtitle>
          )}
          {finePrint && (
            <CheckoutButtonSubtitle isApplied={isApplied}>
              {finePrint}
            </CheckoutButtonSubtitle>
          )}
        </CheckoutButtonText>
      </CheckoutButtonInfo>
      <CheckoutButtonButton disabled={disabled}>
        {isApplied ? (
          <>
            {disabled ? (
              <CheckoutButtonApply>Applied</CheckoutButtonApply>
            ) : (
              <>
                <CheckoutButtonButtonIcon>
                  <XCircle size={null} color={colors.error} />
                </CheckoutButtonButtonIcon>
                <CheckoutButtonRemove>Remove</CheckoutButtonRemove>
              </>
            )}
          </>
        ) : (
          <>
            <CheckoutButtonButtonIcon>
              <PlusCircle size={null} color={colors.primary} />
            </CheckoutButtonButtonIcon>
            <CheckoutButtonApply>{applyText}</CheckoutButtonApply>
          </>
        )}
      </CheckoutButtonButton>
    </CheckoutButtonView>
  )
}

CheckoutButton.displayName = 'CheckoutButton'
CheckoutButton.propTypes = {
  icon: propTypes.element,
  title: propTypes.string,
  subtitle: propTypes.string,
  finePrint: propTypes.string,
  onPress: propTypes.func,
  isApplied: propTypes.bool,
  disabled: propTypes.bool,
}

export default CheckoutButton
