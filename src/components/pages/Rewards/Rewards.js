import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand } from '../../../slices'
import { Content, HeaderUser, Main, PageContainer } from '../..'
import LevelUpLoyalty from './LevelUpLoyalty'
import ThanxLoyalty from './ThanxLoyalty'
import RewardsList from './RewardsList'

const Rewards = () => {
  const navigate = useNavigate()
  const {
    title: siteTitle,
    has_thanx,
    has_levelup,
    has_rewards,
  } = useSelector(selectBrand)
  const hasRewards = has_rewards || has_thanx || has_levelup
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth || !hasRewards) return navigate('/account')
  }, [auth, hasRewards, navigate])

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
            <RewardsList />
          )}
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
