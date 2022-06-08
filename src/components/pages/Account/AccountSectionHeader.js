import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Preface } from '@open-tender/components'

import iconMap from '../../iconMap'

const AccountSectionHeaderView = styled.div`
  width: 100%;
  margin: 0 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 0.5rem;
  }
`

const AccountSectionTitle = styled.div`
  text-align: left;
  // font-size: ${(props) => props.theme.fonts.sizes.h5};
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  //   font-size: ${(props) => props.theme.fonts.sizes.main};
  // }
`

const AccountSectionLink = styled.div`
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

const AccountSectionHeader = ({ title, to, style }) => (
  <AccountSectionHeaderView style={style}>
    <AccountSectionTitle>
      <Preface as="p">{title}</Preface>
    </AccountSectionTitle>
    {to && (
      <AccountSectionLink>
        <p>
          <Link to={to}>
            <span>View all</span>
            <span>{iconMap.ArrowRight}</span>
          </Link>
        </p>
      </AccountSectionLink>
    )}
  </AccountSectionHeaderView>
)

AccountSectionHeader.displayName = 'AccountSectionHeader'
AccountSectionHeader.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
  style: propTypes.object,
}

export default AccountSectionHeader
