import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Preface } from '@open-tender/components'

const CardView = styled(Box)`
  position: relative;
  height: 100%;
  padding: 1.5rem 1.5rem 1rem;
`

const CardContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CardHeader = styled('div')`
  flex-grow: 0;
`

const CardPreface = styled('p')`
  span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CardTitle = styled('p')`
  margin: 0.4rem 0;
  color: ${(props) => props.theme.fonts.headings.color};
`

const CardSubtitle = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CardContent = styled('div')`
  margin: 1rem 0 0;
  flex-grow: 1;

  > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const CardFooter = styled('div')`
  flex-grow: 0;
  margin: 1.9rem 0 0;

  > div {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    button {
      margin: 0 0.5rem 0.5rem 0;
      &:last-child {
        margin: 0;
      }
    }
  }
`

const Card = ({ tag, preface, title, subtitle, content, footer }) => {
  return (
    <CardView>
      {tag}
      <CardContainer>
        <CardHeader>
          {preface && (
            <CardPreface>
              <Preface>{preface}</Preface>
            </CardPreface>
          )}
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>
          <div>{footer}</div>
        </CardFooter>
      </CardContainer>
    </CardView>
  )
}

Card.displayName = 'Card'
Card.propTypes = {
  tag: propTypes.element,
  preface: propTypes.oneOfType([propTypes.string, propTypes.element]),
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  content: propTypes.element,
  footer: propTypes.element,
}

export default Card
