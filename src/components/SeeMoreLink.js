import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'react-feather'
import { Heading } from '@open-tender/components'

const SeeMoreLinkView = styled.div`
  flex-grow: 0;

  a {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const SeeMoreLinkText = styled(Heading)`
  display: block;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const SeeMoreLinkChevron = styled.span`
  display: none;
  width: 1.4rem;
  height: 1.4rem;
  // margin: 0.1rem 0 0 0;
  margin: 0.1rem -0.5rem 0 0;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }
`

const SeeMoreLink = ({ text, to }) => (
  <SeeMoreLinkView>
    <Link to={to}>
      <SeeMoreLinkText>{text}</SeeMoreLinkText>
      <SeeMoreLinkChevron>
        <ChevronRight size={null} />
      </SeeMoreLinkChevron>
    </Link>
  </SeeMoreLinkView>
)

SeeMoreLink.displayName = 'SeeMoreLink'
SeeMoreLink.propTypes = {
  text: propTypes.string,
  to: propTypes.string,
}

export default SeeMoreLink
