import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Preface } from '@open-tender/components'

import iconMap from './iconMap'

const ScrollableSectionHeaderView = styled.div`
  width: 100%;
  margin: 0 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 0;
  }
`

const ScrollableSectionTitle = styled.div`
  text-align: left;
`

const ScrollableSectionLink = styled.div`
  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};

    a {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    span {
      display: block;
    }

    span + span {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0 0 0 0.5rem;
    }
  }
`

const ScrollableSectionHeader = ({ title, to, style }) => (
  <ScrollableSectionHeaderView style={style}>
    <ScrollableSectionTitle>
      <Preface as="p">{title}</Preface>
    </ScrollableSectionTitle>
    {to && (
      <ScrollableSectionLink>
        <p>
          <Link to={to}>
            <span>View all</span>
            <span>{iconMap.ArrowRight}</span>
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
