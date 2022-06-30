import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Heading } from '@open-tender/components'

import iconMap from './iconMap'

const SeeMoreLinkView = styled.div`
  flex-grow: 0;
  margin: 0 -0.5rem 0 0;

  p {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.small};

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

const SeeMoreLinkChevron = styled.span`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0.1rem 0 0 0;
  color: ${(props) => props.theme.colors.primary};
`

const SeeMoreLink = ({ text, to }) => (
  <SeeMoreLinkView>
    <p>
      <Link to={to}>
        <Heading>{text}</Heading>
        <SeeMoreLinkChevron>{iconMap.ChevronRight}</SeeMoreLinkChevron>
      </Link>
    </p>
  </SeeMoreLinkView>
)

SeeMoreLink.displayName = 'SeeMoreLink'
SeeMoreLink.propTypes = {
  text: propTypes.string,
  to: propTypes.string,
}

export default SeeMoreLink
