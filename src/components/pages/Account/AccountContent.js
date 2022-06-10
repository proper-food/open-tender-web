import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

import { selectContent } from '../../../slices'

const AccountContentView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  width: ${(props) => props.theme.layout.maxWidth};
  margin: 3rem 0;
  line-height: ${(props) => props.theme.lineHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    margin: 0 0 3rem;
  }

  p {
    margin: 0.5em 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const AccountContent = () => {
  const { account } = useSelector(selectContent)
  const { content } = account || {}
  const hasContent = !!(content && content.length)
  if (!hasContent || content === '<p><br></p>') return null
  return <AccountContentView dangerouslySetInnerHTML={{ __html: content }} />
}

AccountContent.displayName = 'AccountContent'

export default AccountContent
