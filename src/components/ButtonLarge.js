import styled from '@emotion/styled'
import { ButtonStyled, Heading } from '@open-tender/components'

const ButtonLargeContent = styled.span`
  width: 100%;
  height: 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }
`

const ButtonLargeContentPrimary = styled(Heading)`
  padding: 0 1.5rem 0 0;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.primary.color};

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.primaryHover.color};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.buttons.colors.primary.color};
    }
  }
`

const ButtonLargeContentSecondary = styled(Heading)`
  padding: 0 1.5rem 0 0;
  font-weight: normal;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.secondary.color};

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.secondaryHover.color};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.buttons.colors.secondary.color};
    }
  }
`

const ButtonLarge = ({ onClick, text, children, color = 'secondary' }) => {
  return (
    <ButtonStyled onClick={onClick} size="big" color={color}>
      <ButtonLargeContent>
        {color === 'secondary' ? (
          <ButtonLargeContentSecondary>{text}</ButtonLargeContentSecondary>
        ) : (
          <ButtonLargeContentPrimary>{text}</ButtonLargeContentPrimary>
        )}
        {children}
      </ButtonLargeContent>
    </ButtonStyled>
  )
}

ButtonLarge.displayName = 'ButtonLarge'

export default ButtonLarge
