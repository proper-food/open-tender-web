import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import ScrollableSectionHeader from './ScrollableSectionHeader'
import Loading from './Loading'

const ScrollableSectionView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile};
  }
`

const ScrollableSectionContainer = styled.div`
  margin: -0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    flex-wrap: nowrap;
    align-items: flex-start;
    overflow-x: auto;
    margin: -0.5rem 0 0;
  }
`

const ScrollableSectionItem = styled.div`
  width: 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 20rem;
    padding: 1.5rem 0;
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }

  &:first-of-type {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }
`

const ScrollableSectionLoading = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 2rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const ScrollableSection = ({
  title,
  to,
  items,
  renderItem,
  keyName,
  isLoading,
  loadingText,
}) => {
  const hasItems = items && items.length > 0 ? true : false
  return (
    <ScrollableSectionView>
      <ScrollableSectionHeader title={title} to={to} />
      {hasItems ? (
        <ScrollableSectionContainer>
          {items.map((item) => (
            <ScrollableSectionItem key={item[keyName]}>
              {renderItem({ item })}
            </ScrollableSectionItem>
          ))}
        </ScrollableSectionContainer>
      ) : isLoading ? (
        <ScrollableSectionLoading>
          <Loading text={loadingText} style={{ textAlign: 'left' }} />
        </ScrollableSectionLoading>
      ) : null}
    </ScrollableSectionView>
  )
}

ScrollableSection.displayName = 'ScrollableSection'
ScrollableSection.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
  items: propTypes.array,
  renderItem: propTypes.func,
  keyName: propTypes.string,
  isLoading: propTypes.bool,
  loadingText: propTypes.string,
}

export default ScrollableSection
