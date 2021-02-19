import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const AccountRewardsImageView = styled('div')`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  flex-shrink: 0;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.secondary};

  img {
    height: ${(props) => props.size}rem;
    width: auto;
    max-width: none;
  }
`

const AccountRewardsImage = ({ imageUrl, title, size = 4.5 }) => {
  return (
    <AccountRewardsImageView size={size}>
      <img src={imageUrl} title={title} alt={title} />
    </AccountRewardsImageView>
  )
}

AccountRewardsImage.displayName = 'AccountRewardsImage'
AccountRewardsImage.propTypes = {
  imageUrl: propTypes.string,
  title: propTypes.string,
  size: propTypes.number,
}

export default AccountRewardsImage
