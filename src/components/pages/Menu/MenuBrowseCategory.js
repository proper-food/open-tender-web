import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import { BgImage, Body, Heading } from '@open-tender/components'
import { ArrowRight } from 'react-feather'

const MenuBrowseCategoryView = styled.div`
  width: 33.3333%;
  padding: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0;
  }
`

const MenuBrowseCategoryButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.buttons.colors.large.borderColor};
  border-bottom-width: ${(props) =>
    props.theme.buttons.sizes.large.borderWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem 0;
  }
`

const MenuBrowseCategoryImage = styled(BgImage)`
  width: 7rem;
  height: 7rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const MenuBrowseCategoryText = styled.span`
  flex-grow: 1;
  line-height: ${(props) => props.theme.lineHeight};
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 2rem;
  }
`

const MenuBrowseCategoryTitle = styled(Heading)`
  display: block;
  margin: 0 0 0 -0.1rem;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.large.color};
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
    // font-size: 1.6rem;
  }

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.largeHover.color};
  }
`

const MenuBrowseCategorySubtitle = styled(Body)`
  display: block;
  margin: 0.1rem 0 0;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.large.subtitleColor};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.largeHover.subtitleColor};
  }
`

const MenuBrowseCategoryArrow = styled('span')`
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
  line-height: 0;
  flex-shrink: 0;
  color: ${(props) => props.theme.buttons.colors.large.iconColor};
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover & {
    transform: translateX(1rem);
    color: ${(props) => props.theme.buttons.colors.largeHover.iconColor};

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: translateX(0);
    }
  }
`

const MenuBrowseCategory = ({ category }) => {
  const { name, description, small_image_url, large_image_url, app_image_url } =
    category
  const imageUrl = app_image_url || small_image_url || large_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <MenuBrowseCategoryView>
      <MenuBrowseCategoryButton>
        <MenuBrowseCategoryImage style={bgStyle}>
          &nbsp;
        </MenuBrowseCategoryImage>
        <MenuBrowseCategoryText>
          <MenuBrowseCategoryTitle>{name}</MenuBrowseCategoryTitle>
          <MenuBrowseCategorySubtitle>{description}</MenuBrowseCategorySubtitle>
        </MenuBrowseCategoryText>
        <MenuBrowseCategoryArrow>
          <ArrowRight size={null} strokeWidth={2} />
        </MenuBrowseCategoryArrow>
      </MenuBrowseCategoryButton>
    </MenuBrowseCategoryView>
  )
}

MenuBrowseCategory.displayName = 'MenuBrowseCategory'
MenuBrowseCategory.propTypes = {
  category: propTypes.object,
}
export default MenuBrowseCategory
