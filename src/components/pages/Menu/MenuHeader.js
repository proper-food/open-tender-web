import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectGroupOrder,
  selectOrder,
  selectCustomer,
} from '@open-tender/redux'
import { serviceTypeNamesMap } from '@open-tender/js'
import { Preface, Heading } from '@open-tender/components'

import { Header } from '../..'
import {
  Allergens,
  Back,
  CancelEdit,
  GroupGuest,
  GroupOrder,
  LeaveGroup,
  NavMenu,
  Points,
  RequestedAt,
  RevenueCenter,
  ServiceType,
} from '../../buttons'
import iconMap from '../../iconMap'
import { useTheme } from '@emotion/react'

const MenuHeaderTitleServiceType = styled(Preface)`
  display: block;
  line-height: 1;
  margin: 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.buttons.colors.header.color};
`

const MenuHeaderTitleRevenueCenter = styled('button')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem 0 0;
  color: ${(props) => props.theme.buttons.colors.header.color};

  > span {
    display: inline-block;
    color: ${(props) => props.theme.buttons.colors.header.color};

    &:last-of-type {
      margin: 0.2rem 0 0 0.5rem;
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`

const MenuHeaderName = styled('span')`
  max-width: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: ${(props) => props.theme.buttons.colors.header.color};
  }
`

const MenuHeaderTitle = ({
  serviceType,
  revenueCenter,
  prepType,
  showMenu,
  setShowMenu,
}) => {
  let serviceTypeName = serviceTypeNamesMap[serviceType]
  serviceTypeName = prepType === 'TAKE_OUT' ? 'Take Out' : serviceTypeName
  const orderTypeName =
    revenueCenter && revenueCenter.revenue_center_type === 'CATERING'
      ? ' Catering '
      : ''

  const toggle = (evt) => {
    evt.preventDefault()
    setShowMenu(!showMenu)
  }

  return revenueCenter ? (
    <>
      <MenuHeaderTitleServiceType>
        Ordering {orderTypeName}
        {serviceTypeName}
      </MenuHeaderTitleServiceType>
      <MenuHeaderTitleRevenueCenter onClick={toggle}>
        <span>&nbsp;</span>
        <MenuHeaderName>
          <Heading>{revenueCenter.name}</Heading>
        </MenuHeaderName>
        <span>{showMenu ? iconMap.ChevronUp : iconMap.ChevronDown}</span>
      </MenuHeaderTitleRevenueCenter>
    </>
  ) : null
}

MenuHeaderTitle.displayName = 'MenuHeaderTitle'
MenuHeaderTitle.propTypes = {
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  prepType: propTypes.string,
  showMenu: propTypes.bool,
  setShowMenu: propTypes.func,
}

const MenuHeader = ({ showMenu, setShowMenu }) => {
  const { auth } = useSelector(selectCustomer)
  const order = useSelector(selectOrder)
  const { cartGuest } = useSelector(selectGroupOrder)
  const theme = useTheme()

  const desktopNav = cartGuest ? (
    <>
      <Allergens />
      <GroupGuest />
    </>
  ) : (
    <>
      <RevenueCenter />
      <ServiceType />
      <RequestedAt />
      <Allergens />
      <GroupOrder />
      <CancelEdit />
      {auth ? <Points /> : null}
    </>
  )

  return (
    <Header
      title={
        <MenuHeaderTitle
          {...order}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      }
      borderColor={theme.colors.primary}
      left={cartGuest ? <LeaveGroup /> : <Back path="/locations" />}
      right={<NavMenu />}
    />
  )
}

MenuHeader.displayName = 'MenuHeader'
MenuHeader.propTypes = {
  maxWidth: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  showMenu: propTypes.bool,
  setShowMenu: propTypes.func,
}

export default MenuHeader
