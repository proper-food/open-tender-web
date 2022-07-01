import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Heading } from '@open-tender/components'

import iconMap from './iconMap'

const ScrollableSectionHeaderView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: 0 0 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 0 0 0.7rem;
  }

  p {
    line-height: 1;
  }
`

const ScrollableSectionTitle = styled.div`
  text-align: left;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const ScrollableSectionLink = styled.div`
  margin: 0 -0.5rem 0 0;

  p {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.big};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }

    a {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    span {
      display: block;
    }
  }
`

const ScrollableSectionChevron = styled.span`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0.1rem 0 0 0;
  color: ${(props) => props.theme.colors.primary};
`

const ScrollableSectionHeader = ({ title, to, style }) => (
  <ScrollableSectionHeaderView style={style}>
    <ScrollableSectionTitle>
      <Heading as="p">{title}</Heading>
    </ScrollableSectionTitle>
    {to && (
      <ScrollableSectionLink>
        <p>
          <Link to={to}>
            <Heading>View All</Heading>
            <ScrollableSectionChevron>
              {iconMap.ChevronRight}
            </ScrollableSectionChevron>
          </Link>
        </p>
      </ScrollableSectionLink>
    )}
  </ScrollableSectionHeaderView>
)

ScrollableSectionHeader.displayName = 'ScrollableSectionHeader'
ScrollableSectionHeader.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
  style: propTypes.object,
}

export default ScrollableSectionHeader
