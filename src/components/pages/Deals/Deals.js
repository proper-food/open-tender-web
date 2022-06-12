import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isMobile } from 'react-device-detect'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
  Rewards,
  Reward,
} from '../..'

const DealsView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  max-width: ${(props) => props.theme.breakpoints.tablet};
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    max-width: 60rem;
  }
`

const DealView = styled.div`
  margin: 0 0 1.5rem;
`

const Deals = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { deals: config } = useSelector(selectConfig)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!has_deals) return navigate('/account')
  }, [has_deals, navigate])

  useEffect(() => {
    dispatch(fetchDeals())
  }, [dispatch, customer_id])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer>
            <PageTitle {...config} />
            {error ? (
              <PageError error={error} />
            ) : hasDeals ? (
              <DealsView>
                {isMobile ? (
                  <>
                    {deals.map((deal) => (
                      <DealView>
                        <Reward item={deal} />
                      </DealView>
                    ))}
                  </>
                ) : (
                  <Rewards rewards={deals} />
                )}
              </DealsView>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving today's deals..." />
                ) : (
                  <p>
                    We're not featuring any deals today. Please check back soon!
                  </p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Deals.displayName = 'Deals'
export default Deals
