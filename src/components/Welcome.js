import propTypes from 'prop-types'
import styled from '@emotion/styled'

const WelcomeView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin-top: ${(props) => props.theme.welcome.desktop.marginTop};
  margin-bottom: ${(props) => props.theme.welcome.desktop.marginBottom};
  text-align: ${(props) => props.theme.welcome.desktop.textAlign};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: ${(props) => props.theme.welcome.mobile.marginTop};
    margin-bottom: ${(props) => props.theme.welcome.mobile.marginBottom};
    text-align: ${(props) => props.theme.welcome.mobile.textAlign};
  }
`

const WelcomeTitle = styled.h1`
  line-height: ${(props) =>
    props.theme.welcome.desktop.titleLineHeight || '1.2'};
  font-size: ${(props) => props.theme.welcome.desktop.titleSize};
  margin-left: ${(props) => props.theme.welcome.desktop.titleMarginLeft};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.welcome.mobile.titleSize};
    line-height: ${(props) =>
      props.theme.welcome.mobile.titleLineHeight || '1.2'};
    margin-left: ${(props) => props.theme.welcome.mobile.titleMarginLeft};
  }
`

const WelcomeSubtitle = styled.p`
  line-height: ${(props) =>
    props.theme.welcome.desktop.subtitleLineHeight || '1.4'};
  font-size: ${(props) => props.theme.welcome.desktop.subtitleSize};
  margin-top: ${(props) => props.theme.welcome.desktop.subtitleMarginTop};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.welcome.mobile.subtitleSize};
    line-height: ${(props) =>
      props.theme.welcome.mobile.subtitleLineHeight || '1.4'};
    margin-top: ${(props) => props.theme.welcome.mobile.subtitleMarginTop};
  }
`

const Welcome = ({ title, subtitle }) => {
  return (
    <WelcomeView>
      <WelcomeTitle>{title}</WelcomeTitle>
      {subtitle && <WelcomeSubtitle>{subtitle}</WelcomeSubtitle>}
    </WelcomeView>
  )
}

Welcome.displayName = 'Welcome'
Welcome.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
}

export default Welcome
