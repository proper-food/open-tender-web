import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { slugify, stripTags } from '@open-tender/js'
import {
  selectMenuSlug,
  setCurrentCategory,
  setCurrentVendor,
} from '@open-tender/redux'
import { BgImage, Body, Heading } from '@open-tender/components'

const MenuCardView = styled.div`
  position: relative;
  width: 33.33333%;
  // max-width: 36rem;
  // aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MenuCardButton = styled.button`
  flex-grow: 1;
  display: block;
  margin: 1rem;
`

const MenuCardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
  overflow: hidden;
`

const MenuCardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 33.33333% 0;
  // flex-grow: 1;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  overflow: hidden;
`

const MenuCardImage = styled(BgImage)`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  transition: ${(props) => props.theme.links.transition};
  transform: scale(1);

  button:hover & {
    transform: scale(1.1);

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: scale(1);
    }
  }
`

const MenuCardOverlay = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.dark};
  transition: ${(props) => props.theme.links.transition};
  opacity: 0;

  button:hover & {
    opacity: 0.5;
  }
`

const MenuCardContent = styled.div`
  flex-grow: 0;
  padding: 2rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MenuCardTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const MenuCardDescription = styled(Body)`
  margin: 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuCard = ({ category }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)
  const {
    name,
    description,
    small_image_url,
    large_image_url,
    app_image_url,
    revenue_center_id,
  } = category
  const imageUrl = app_image_url || small_image_url || large_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const desc = description ? stripTags(description) : null

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
    <MenuCardView>
      <MenuCardButton onClick={view}>
        <MenuCardContainer>
          <MenuCardImageContainer>
            <MenuCardImage style={bgStyle} />
            <MenuCardOverlay />
          </MenuCardImageContainer>
          <MenuCardContent>
            <MenuCardTitle as="p">{name}</MenuCardTitle>
            {desc && <MenuCardDescription as="p">{desc}</MenuCardDescription>}
          </MenuCardContent>
        </MenuCardContainer>
      </MenuCardButton>
    </MenuCardView>
  )
}

MenuCard.displayName = 'MenuCard'
MenuCard.propTypes = {
  category: propTypes.object,
}

export default MenuCard
