import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import { fetchMenu, fetchAllergens, selectMenu } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig, selectBrand } from '../../../slices'
import {
  Container,
  Content,
  HeroSite,
  Main,
  HeaderSite,
  HeroSiteCta,
  PageIntro,
} from '../..'
import MenuSiteCategory from './MenuSiteCategory'

const MenuSiteView = styled.div``

const MenuSiteMenu = styled.div`
  max-width: 128rem;
  margin: 0 auto;
`

const MenuSite = () => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { menuSite } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = menuSite
  const revenueCenterId = 1285
  const serviceType = 'WALKIN'
  const requestedAt = 'asap'
  const { categories } = useSelector(selectMenu)

  const scrollToMenu = () => {
    scroller.scrollTo('menuSite', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

  useEffect(() => {
    if (revenueCenterId) {
      dispatch(fetchAllergens())
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
    }
  }, [revenueCenterId, serviceType, requestedAt, dispatch])

  return (
    <>
      <Helmet>
        <title>Menu | {brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          <HeroSite imageUrl={isBrowser ? background : mobile}>
            <HeroSiteCta title={title} subtitle={subtitle}>
              <ButtonStyled onClick={scrollToMenu}>
                Browse Our Menu
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
          <MenuSiteView>
            <PageIntro content={content} />
            <Element name="menuSite">
              <MenuSiteMenu>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    id={slugify(category.name)}
                    name="section"
                  >
                    <MenuSiteCategory category={category} />
                    {category.children.map((category) => (
                      <MenuSiteCategory
                        key={category.id}
                        category={category}
                        isChild={true}
                      />
                    ))}
                  </div>
                ))}
              </MenuSiteMenu>
            </Element>
          </MenuSiteView>
        </Main>
      </Content>
    </>
  )
}

export default MenuSite
