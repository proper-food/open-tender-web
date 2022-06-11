import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { HtmlContent } from '../..'

const AccountContentView = styled.div`
  padding: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 3rem;
  }
`

const AccountContent = ({ content }) => {
  const hasContent = !!(content && content.length)
  if (!hasContent) return null
  return (
    <AccountContentView>
      <HtmlContent content={content} />
    </AccountContentView>
  )
}

AccountContent.displayName = 'AccountContent'
AccountContent.propTypes = {
  content: propTypes.string,
}

export default AccountContent
