import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  selectCurrentItem,
  setCurrentItem,
  selectMenuSlug,
} from '@open-tender/redux'
import { selectMenuPath } from '../../../slices'
import { Back, NavMenu } from '../../buttons'
import {
  BackgroundImage,
  Content,
  Header,
  Main,
  MenuItem as MenuItemComponent,
  ScreenreaderTitle,
} from '../..'
import { MenuHeader } from '../Menu'
import { MenuContext } from '../Menu/Menu'

const MenuItemPageView = styled.div`
  label: MenuItemPageView;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`

const MenuItemPageImage = styled.div`
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

const MenuItemPageContent = styled.div`
  flex: 0 0 64rem;
  width: 64rem;
  height: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`

const MenuItem = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { siteTitle } = useContext(MenuContext)
  const menuPath = useSelector(selectMenuPath)
  const menuSlug = useSelector(selectMenuSlug)
  const item = useSelector(selectCurrentItem)

  const cancel = () => {
    dispatch(setCurrentItem(null))
  }

  useEffect(() => {
    if (!item) navigate(menuPath || menuSlug)
  }, [item, navigate, menuSlug, menuPath])

  if (!item) return null

  return (
    <>
      <Helmet>
        <title>
          Menu - {item.name} | {siteTitle}
        </title>
      </Helmet>
      <Content hasFooter={false}>
        {isMobile ? (
          <Header
            style={{ boxShadow: 'none' }}
            left={<Back onClick={cancel} />}
            right={<NavMenu />}
          />
        ) : (
          <MenuHeader backClick={cancel} />
        )}
        <Main style={{ height: '100%' }}>
          <ScreenreaderTitle>{item.name}</ScreenreaderTitle>
          <MenuItemPageView>
            <MenuItemPageImage>
              <BackgroundImage imageUrl={item.imageUrl} />
            </MenuItemPageImage>
            <MenuItemPageContent>
              <MenuItemComponent cancel={cancel} showImage={false} />
            </MenuItemPageContent>
          </MenuItemPageView>
        </Main>
      </Content>
    </>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
