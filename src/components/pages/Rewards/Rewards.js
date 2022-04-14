import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand } from '../../../slices'
import { Content, HeaderUser, Main, PageContainer } from '../..'
import LevelUpLoyalty from './LevelUpLoyalty'
import ThanxLoyalty from './ThanxLoyalty'
import LoyaltyRewards from './LoyaltyRewards'

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx, has_levelup } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth) return history.push('/account')
  }, [auth, history])

  return auth ? (
    <>
      <Helmet>
        <title>Rewards | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          {has_levelup ? (
            <PageContainer>
              <LevelUpLoyalty />
            </PageContainer>
          ) : has_thanx ? (
            <PageContainer>
              <ThanxLoyalty />
            </PageContainer>
          ) : (
            <LoyaltyRewards />
          )}
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
