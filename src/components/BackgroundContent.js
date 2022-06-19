import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { ContainerSite } from '.'
import BackgroundCta from './BackgroundCta'

const BackgroundContentView = styled('div')`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: ${(props) => props.theme.layout.headerHeightSite}
    ${(props) => props.theme.layout.padding};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.headerHeightSiteMobile}
      ${(props) => props.theme.layout.paddingMobile};
    justify-content: center;
    align-items: flex-end;
    text-align: center;
  }
`

const BackgroundContentText = styled('div')`
  max-width: 72rem;
  padding: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile} 0;
  }
`

const BackgroundContentTitle = styled(Heading)`
  margin-left: -0.3rem;
  line-height: 1;
  color: #${(props) => props.textColor};
  font-size: ${(props) => props.theme.fonts.sizes.mega};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.h1};
  }
`

const BackgroundContentSubtitle = styled.p`
  margin: 0.5em 0;
  line-height: ${(props) => props.theme.lineHeight};
  color: #${(props) => props.textColor};
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const makeAlignment = (alignment) => {
  switch (alignment) {
    case 'TOP':
    case 'LEFT':
      return 'flex-start'
    case 'BOTTOM':
    case 'RIGHT':
      return 'flex-end'
    default:
      return 'center'
  }
}

const BackgroundContent = ({
  title,
  subtitle,
  url,
  url_text,
  title_color = 'ffffff',
  subtitle_color = 'ffffff',
  vertical = 'BOTTOM',
  horizontal = 'CENTER',
  hide_text = false,
}) => {
  if (!title && !subtitle) return null
  const justifyContent = makeAlignment(horizontal)
  const alignItems = makeAlignment(vertical)

  if (hide_text) return null

  return (
    <BackgroundContentView
      justifyContent={justifyContent}
      alignItems={alignItems}
      textAlign={horizontal}
    >
      <ContainerSite>
        <BackgroundContentText>
          {title && (
            <BackgroundContentTitle as="p" textColor={title_color}>
              {title}
            </BackgroundContentTitle>
          )}
          {subtitle && (
            <BackgroundContentSubtitle textColor={subtitle_color}>
              {subtitle}
            </BackgroundContentSubtitle>
          )}
          <BackgroundCta url={url} urlText={url_text} />
        </BackgroundContentText>
      </ContainerSite>
    </BackgroundContentView>
  )
}

BackgroundContent.displayName = 'BackgroundContent'
BackgroundContent.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  title_color: propTypes.string,
  subtitle_color: propTypes.string,
  vertical: propTypes.string,
  horizontal: propTypes.string,
}

export default BackgroundContent
