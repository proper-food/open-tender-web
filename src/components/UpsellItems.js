import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCartIds, selectMenu } from '@open-tender/redux'
import { makeMenuItemLookup } from '@open-tender/js'
import { Heading } from '@open-tender/components'
import UpsellItem from './UpsellItem'

const UpsellItemsView = styled.div`
  padding: 2rem 0 0;
`

const UpsellItemsHeader = styled.div`
  margin: 0 2rem 0.5rem;
`

const UpsellItemsItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

const UpsellItemsItem = styled.div`
  flex: 0 0 31rem;
  padding: 1.5rem 0;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 22rem;
    margin-right: 2rem;
  }

  &:first-of-type {
    margin-left: 2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: 2rem;
    }
  }

  & > div {
    height: 100%;
  }
`

const UpsellItems = () => {
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

  if (!upsellItems.length) return null

  return (
    <UpsellItemsView>
      <UpsellItemsHeader>
        <Heading size="big">You may also like...</Heading>
      </UpsellItemsHeader>
      <UpsellItemsItems className="centered">
        {upsellItems.map((item) => (
          <UpsellItemsItem key={item.id}>
            <UpsellItem menuItem={item} showDesc={false} />
          </UpsellItemsItem>
        ))}
      </UpsellItemsItems>
    </UpsellItemsView>
  )
}

export default UpsellItems
