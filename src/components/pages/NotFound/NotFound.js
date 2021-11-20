import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectToken } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
  HeaderDefault,
} from '../..'

const NotFound = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { notFound: config } = useSelector(selectConfig)
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) return history.push('/')
  }, [token, history])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <PageTitle {...config} />
            <PageContent>
              <Link to="/">{config.back}</Link>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

NotFound.displayName = 'NotFound'
export default NotFound
