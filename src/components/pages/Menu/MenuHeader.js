import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isBrowser, isMobile } from 'react-device-detect'
import {
  resetOrderType,
  resetGroupOrder,
  resetCheckout,
  selectGroupOrder,
  selectOrder,
} from '@open-tender/redux'
import { serviceTypeNamesMap } from '@open-tender/js'
import { Preface, Heading } from '@open-tender/components'
import { Allergens, Back, Cart, NavMenu } from '../../buttons'
import { ChevronDown, ChevronUp } from '../../icons'
import { Header } from '../..'
import MenuMobileMenu from './MenuMobileMenu'

const MenuHeaderTitleServiceType = styled(Preface)`
  display: block;
  line-height: 1;
  margin: 0.5rem 0 0;
  color: ${(props) => props.theme.buttons.colors.header.color};
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  }
`

const MenuHeaderTitleRevenueCenter = styled.button`
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
      margin: 0.2rem 0 0 0.2rem;
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`

const MenuHeaderName = styled.span`
  max-width: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: ${(props) => props.theme.buttons.colors.header.color};
    font-size: ${(props) => props.theme.fonts.sizes.big};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const MenuHeaderTitle = ({ order, showMenu, setShowMenu }) => {
  const { serviceType, revenueCenter, prepType } = order
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
        {/* <span>&nbsp;</span> */}
        <MenuHeaderName>
          <Heading>{revenueCenter.name}</Heading>
        </MenuHeaderName>
        <span>{showMenu ? <ChevronUp /> : <ChevronDown />}</span>
      </MenuHeaderTitleRevenueCenter>
    </>
  ) : null
}

MenuHeaderTitle.displayName = 'MenuHeaderTitle'
MenuHeaderTitle.propTypes = {
  order: propTypes.object,
  showMenu: propTypes.bool,
  setShowMenu: propTypes.func,
}

const MenuHeader = ({ backPath = '/locations', backClick }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const [showMenu, setShowMenu] = useState(false)
  const order = useSelector(selectOrder)
  const { cartGuest } = useSelector(selectGroupOrder)

  const leave = () => {
    dispatch(resetOrderType())
    dispatch(resetGroupOrder())
    dispatch(resetCheckout())
    navigate(`/account`)
  }

  const onClick = cartGuest ? leave : backClick

  return (
    <>
      <Header
        style={{ boxShadow: 'none' }}
        title={
          <MenuHeaderTitle
            order={order}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        }
        borderColor={theme.colors.primary}
        left={onClick ? <Back onClick={onClick} /> : <Back path={backPath} />}
        right={
          <>
            <Allergens style={isMobile ? { width: '3rem' } : null} />
            {isBrowser && <Cart />}
            <NavMenu />
          </>
        }
      />
      <MenuMobileMenu
        order={order}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  )
}

MenuHeader.displayName = 'MenuHeader'
MenuHeader.propTypes = {
  backPath: propTypes.string,
}

export default MenuHeader
