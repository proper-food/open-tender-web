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

const MenuSquareView = styled.div`
  position: relative;
  width: 33.33333%;
  max-width: 36rem;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MenuSquareButton = styled.button`
  flex: 1;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`

const MenuSquareContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
  overflow: hidden;
`

const MenuSquareImage = styled(BgImage)`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.dark};
  transition: ${(props) => props.theme.links.transition};
  transform: scale(1);

  button:hover & {
    transform: scale(1.1);

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: scale(1);
    }
  }
`

const MenuSquareOverlay = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.dark};
  transition: ${(props) => props.theme.links.transition};
  opacity: 0.5;

  button:hover & {
    opacity: 0.75;
  }
`

const MenuSquareContent = styled.div`
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
  // background-color: rgba(0, 0, 0, 0.6);
`

const MenuSquareTitle = styled(Heading)`
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const MenuSquareDescription = styled(Body)`
  margin: 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuSquare = ({ category }) => {
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
    <MenuSquareView>
      <MenuSquareButton onClick={view}>
        <MenuSquareContainer>
          <MenuSquareImage style={bgStyle} />
          <MenuSquareOverlay />
          <MenuSquareContent>
            <MenuSquareTitle as="p">{name}</MenuSquareTitle>
            {desc && (
              <MenuSquareDescription as="p">{desc}</MenuSquareDescription>
            )}
          </MenuSquareContent>
        </MenuSquareContainer>
      </MenuSquareButton>
    </MenuSquareView>
  )
}

MenuSquare.displayName = 'MenuSquare'
MenuSquare.propTypes = {
  category: propTypes.object,
}

export default MenuSquare
