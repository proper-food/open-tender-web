import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Body, Heading } from '@open-tender/components'

const MenuCategoryHeaderView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 2rem;
  }
`

const MenuCategoryHeaderTitle = styled(Heading)`
  font-size: ${(props) =>
    props.theme.fonts.sizes[props.isChild ? 'big' : 'xBig']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) =>
      props.theme.fonts.sizes[props.isChild ? 'main' : 'big']};
  }
`

const MenuCategoryHeaderSubtitle = styled(Body)`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuCategoryHeader = ({ title, subtitle, isChild }) => {
  return (
    <MenuCategoryHeaderView>
      <MenuCategoryHeaderTitle as="p" isChild={isChild}>
        {title}
      </MenuCategoryHeaderTitle>
      {subtitle && (
        <MenuCategoryHeaderSubtitle as="p">
          {subtitle}
        </MenuCategoryHeaderSubtitle>
      )}
    </MenuCategoryHeaderView>
  )
}

MenuCategoryHeader.displayName = 'MenuCategoryHeader'
MenuCategoryHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  isChild: propTypes.bool,
}

export default MenuCategoryHeader
