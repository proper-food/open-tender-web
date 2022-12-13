import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { slugify } from '@open-tender/js'
import {
  selectMenuSlug,
  setCurrentCategory,
  setCurrentVendor,
} from '@open-tender/redux'
import { BgImage, Heading } from '@open-tender/components'
import { ArrowRight } from '../../../icons'

const MenuListItemView = styled.div`
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

const MenuListItemButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  border-bottom-width: ${(props) => props.theme.border.width};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem 0;
    ${(props) => (props.isLast ? 'border: 0;' : '')}
  }
`

const MenuListItemImage = styled(BgImage)`
  flex-shrink: 0;
  width: 7rem;
  height: 7rem;
  background-size: cover;
  transition: ${(props) => props.theme.links.transition};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  transform: scale(1);

  button:hover & {
    transform: scale(1.05);

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: scale(1);
    }
  }
`

const MenuListItemText = styled.span`
  flex-grow: 1;
  line-height: ${(props) => props.theme.fonts.body.lineHeight};
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 2rem;
  }
`

const MenuListItemTitle = styled(Heading)`
  display: block;
  margin: 0 0 0 -0.1rem;
  transition: ${(props) => props.theme.links.transition};
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuListItemArrow = styled.span`
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
  line-height: 0;
  flex-shrink: 0;
  color: ${(props) => props.theme.fonts.headings.color};
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover & {
    transform: translateX(1rem);

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: translateX(0);
    }
  }
`

const MenuListItem = ({ category, isLast = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)
  const {
    name,
    small_image_url,
    large_image_url,
    app_image_url,
    revenue_center_id,
  } = category
  const imageUrl = app_image_url || small_image_url || large_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  const view = (evt) => {
    evt.preventDefault()
    if (revenue_center_id) {
      dispatch(setCurrentVendor(category))
      navigate(`${menuSlug}/vendor/${slugify(category.name)}`)
    } else {
      dispatch(setCurrentCategory(category))
      navigate(`${menuSlug}/category/${slugify(category.name)}`)
    }
  }

  return (
    <MenuListItemView>
      <MenuListItemButton onClick={view} isLast={isLast}>
        <MenuListItemImage style={bgStyle} />
        <MenuListItemText>
          <MenuListItemTitle>{name}</MenuListItemTitle>
        </MenuListItemText>
        <MenuListItemArrow>
          <ArrowRight strokeWidth={2} />
        </MenuListItemArrow>
      </MenuListItemButton>
    </MenuListItemView>
  )
}

MenuListItem.displayName = 'MenuListItem'
MenuListItem.propTypes = {
  category: propTypes.object,
}

export default MenuListItem
