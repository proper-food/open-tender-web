import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import { useTheme } from '@emotion/react'
import { selectConfig, closeModal, selectBrand } from '../../../slices'
import { BackgroundContent, Content, HeaderSite, Main, PageIntro } from '../..'
import PageHero from '../../PageHero'

const Home = () => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = home
  const hasContent = !!(content && content.length)

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          <PageHero page="HOME" imageUrl={isBrowser ? background : mobile}>
            <BackgroundContent
              title={title}
              subtitle={subtitle}
              title_color={colors.light}
              subtitle_color={colors.light}
              vertical="BOTTOM"
              horizontal="LEFT"
            />
          </PageHero>
          {hasContent && <PageIntro content={content} />}
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home
