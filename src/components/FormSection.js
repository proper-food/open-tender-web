import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { isMobileOnly } from 'react-device-detect'
import { Preface, Text } from '@open-tender/components'

const FormSectionView = styled('div')`
  text-align: left;
  margin: 4rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0 0;
  }

  & > p {
    margin: 0.5em 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const FormSectionContent = styled.div`
  margin: 1.5rem 0 0;
`

const FormSection = ({ title, subtitle, children, style = null }) => {
  return (
    <FormSectionView style={style}>
      {title ? (
        <Preface
          as="div"
          size={isMobileOnly ? 'xSmall' : 'small'}
          color="tertiary"
        >
          {title}
        </Preface>
      ) : null}
      {subtitle ? (
        <Text as="p" size="small">
          {subtitle}
        </Text>
      ) : null}
      <FormSectionContent>{children}</FormSectionContent>
    </FormSectionView>
  )
}

FormSection.displayName = 'FormSection'
FormSection.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default FormSection
