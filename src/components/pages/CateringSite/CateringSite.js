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
  Content,
  HeroSite,
  Main,
  HeaderSite,
  HeroSiteCta,
  PageIntro,
} from '../..'
import CateringSiteCategory from './CateringSiteCategory'

const CateringSiteView = styled.div``

const CateringSiteMenu = styled.div`
  max-width: 128rem;
  margin: 0 auto;
`

const CateringSite = () => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { cateringSite } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = cateringSite
  const revenueCenterId = 1285
  const serviceType = 'DELIVERY'
  const requestedAt = 'asap'
  const { categories } = useSelector(selectMenu)

  const scrollToMenu = () => {
    scroller.scrollTo('cateringSite', {
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
                Browse Our Catering Menu
              </ButtonStyled>
            </HeroSiteCta>
          </HeroSite>
          <CateringSiteView>
            <PageIntro content={content} />
            <Element name="cateringSite">
              <CateringSiteMenu>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    id={slugify(category.name)}
                    name="section"
                  >
                    <CateringSiteCategory category={category} />
                    {category.children.map((category) => (
                      <CateringSiteCategory
                        key={category.id}
                        category={category}
                        isChild={true}
                      />
                    ))}
                  </div>
                ))}
              </CateringSiteMenu>
            </Element>
          </CateringSiteView>
        </Main>
      </Content>
    </>
  )
}

export default CateringSite
