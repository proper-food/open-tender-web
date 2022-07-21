import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectCartIds,
  selectCustomer,
  selectMenu,
  selectMenuSlug,
} from '@open-tender/redux'
import { makeMenuItemLookup } from '@open-tender/js'
import { ButtonLink, ButtonStyled, Heading } from '@open-tender/components'
import { selectBrand } from '../../../slices'
import { Back, NavMenu } from '../../buttons'
import { Container, Content, Header, Main, UpsellItem } from '../..'
import { useNavigate } from 'react-router-dom'

const UpsellView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const UpsellHeader = styled.div`
  text-align: center;
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const UpsellTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const UpsellItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  margin: 0 -${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const UpsellItemsWrapper = styled.div`
  flex: ${(props) => (props.count >= 4 ? '1' : '0')} 0 31rem;
  padding: 1.5rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: 1390px) {
    flex: 0 0 31rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 22rem;
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  & > div {
    height: 100%;
  }
`

const UpsellFooter = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.layout.padding} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const Upsell = () => {
  const navigate = useNavigate()
  const [itemAdded, setItemAdded] = useState(false)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const cartIds = useSelector(selectCartIds)
  const { categories, soldOut } = useSelector(selectMenu)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
  const menuItems = cartIds.map((id) => itemLookup[id])
  const upsellItemIds = menuItems.reduce(
    (arr, i) => [...arr, ...(i.upsell_items || [])],
    []
  )
  const uniqueIds = [...new Set(upsellItemIds)]
  const filtered = uniqueIds.filter(
    (id) => !cartIds.includes(id) && !soldOut.includes(id)
  )
  const upsellItems = filtered.map((id) => itemLookup[id])

  const checkout = () => {
    navigate(auth ? '/checkout' : '/checkout/guest')
  }

  if (!upsellItems.length) return null

  return (
    <>
      <Helmet>
        <title>Add-ons | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header left={<Back path={menuSlug} />} right={<NavMenu />} />
        <Main>
          <UpsellView>
            <Container>
              <UpsellHeader>
                <UpsellTitle>You may also like...</UpsellTitle>
              </UpsellHeader>
              <UpsellItems className="centered">
                {upsellItems.map((item) => (
                  <UpsellItemsWrapper key={item.id} count={upsellItems.length}>
                    <UpsellItem
                      menuItem={item}
                      showDesc={false}
                      addCallback={() => setItemAdded(true)}
                    />
                  </UpsellItemsWrapper>
                ))}
              </UpsellItems>
              <UpsellFooter>
                {itemAdded ? (
                  <ButtonStyled onClick={checkout}>
                    All Done, Proceed To Checkout
                  </ButtonStyled>
                ) : (
                  <ButtonLink onClick={checkout}>
                    No, thanks. Procced to checkout.
                  </ButtonLink>
                )}
              </UpsellFooter>
            </Container>
          </UpsellView>
        </Main>
      </Content>
    </>
  )
}

export default Upsell
