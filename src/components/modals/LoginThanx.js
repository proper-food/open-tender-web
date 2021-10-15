import styled from '@emotion/styled'
import React from 'react'
import { Heading, Text } from '@open-tender/components'

import { ModalClose, ModalContent, ModalView } from '..'
import { Heart } from 'react-feather'
import { useTheme } from '@emotion/react'

const LoginThanxContent = styled('div')`
  padding: 4rem;
  text-align: center;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.alert};

  h2 {
    color: ${(props) => props.theme.colors.light};
    font-size: 2rem;
    line-height: 1.5;
  }
`

const LoginThanxFootnote = styled('div')`
  margin-top: 1.5rem;

  p {
    line-height: 1.5;
  }
`

const LoginThanxHeart = styled('span')`
  position: relative;
  top: 0.3rem;
  display: inline-block;
  line-height: 0.1;
  margin: 0 0 0 0.5rem;

  svg {
    fill: ${(props) => props.theme.colors.light};
  }
`

const LoginThanx = () => {
  const theme = useTheme()
  return (
    <ModalView style={{ width: '60rem' }}>
      <ModalContent close={false} style={{ padding: '0' }}>
        <ModalClose
          color={theme.colors.light}
          hoverColor={theme.colors.light}
        />
        <LoginThanxContent>
          <Heading as="h2" size="h2">
            Brilliant! Check your email for the magic link & click to connect
            your account and finish your order.
          </Heading>
          <LoginThanxFootnote>
            <Text as="p" size="xSmall">
              Not seeing? Be sure to give your junk folder a quick peek.
            </Text>
            <Text as="p" size="xSmall">
              We hate to say it, but it does happen!
              <LoginThanxHeart>
                <Heart size={14} />
              </LoginThanxHeart>
            </Text>
          </LoginThanxFootnote>
        </LoginThanxContent>
      </ModalContent>
    </ModalView>
  )
}

LoginThanx.displayName = 'LoginThanx'
LoginThanx.propTypes = {}

export default LoginThanx
