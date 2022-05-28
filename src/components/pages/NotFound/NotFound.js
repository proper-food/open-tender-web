import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { title: siteTitle } = useSelector(selectBrand)
  const { notFound: config } = useSelector(selectConfig)
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) return navigate('/')
  }, [token, navigate])

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
              <Link to="/account">{config.back}</Link>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

NotFound.displayName = 'NotFound'
export default NotFound
