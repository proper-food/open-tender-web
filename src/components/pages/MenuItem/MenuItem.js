import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCurrentItem,
  setCurrentItem,
  addItemToCart,
  selectSoldOut,
  selectSelectedAllergenNames,
  selectGroupOrder,
  selectMenuSlug,
  showNotification,
} from '@open-tender/redux'
import { Builder, BuilderOption, BuilderHeader } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectDisplaySettings } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Header, ImageSpinner, Main, ScreenreaderTitle } from '../..'
import { Back } from '../../buttons'
import iconMap from '../../iconMap'

const menuItemsIconMap = {
  plus: iconMap.Plus,
  minus: iconMap.Minus,
}

const MenuItem = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const menuSlug = useSelector(selectMenuSlug)
  const item = useSelector(selectCurrentItem)
  const soldOut = useSelector(selectSoldOut)
  const allergens = useSelector(selectSelectedAllergenNames)
  const displaySettings = useSelector(selectDisplaySettings)
  const { cartId } = useSelector(selectGroupOrder)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!item) history.push(menuSlug)
  }, [item, history, menuSlug])

  const cancel = () => {
    dispatch(setCurrentItem(null))
  }

  const addItem = (item) => {
    dispatch(addItemToCart(item))
    dispatch(showNotification(`${item.name} added to cart`))
    dispatch(setCurrentItem(null))
  }

  if (!item) return null

  return (
    <>
      <Helmet>
        <title>Menu | {item.name}</title>
      </Helmet>
      <Content hasFooter={false}>
        <Header
          // style={isBrowser ? null : { position: 'absolute' }}
          left={<Back text="Back to Menu" onClick={cancel} />}
          // right={<Cart />}
        />
        <Main>
          <ScreenreaderTitle>{item.name}</ScreenreaderTitle>
          {/* <Builder
            menuItem={item}
            addItemToCart={addItem}
            cancel={cancel}
            soldOut={soldOut}
            allergenAlerts={allergenAlerts}
            showImage={true}
            displaySettings={displaySettings}
            cartId={cartId}
            windowRef={windowRef}
          /> */}
          <Builder
            menuItem={item}
            soldOut={soldOut}
            allergens={allergens}
            addItemToCart={addItem}
            renderHeader={(props) => <BuilderHeader {...props} />}
            renderOption={(props) => <BuilderOption {...props} />}
            showImage={true}
            displaySettings={displaySettings}
            iconMap={menuItemsIconMap}
            closeModal={cancel}
            cartId={cartId}
            spinner={<ImageSpinner />}
          />
        </Main>
      </Content>
    </>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
