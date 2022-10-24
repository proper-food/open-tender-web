import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'

const MenuItemImageView = styled.div`
  // display: none;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 240px;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  // margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: auto;
    padding: 33% 0;
    // margin: 0 0 1.5rem;
  }
`

const MenuItemImageLoading = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const MenuItemImage = ({ imageUrl, spinner }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  return (
    <MenuItemImageView>
      {spinner && isLoading && (
        <MenuItemImageLoading>{spinner}</MenuItemImageLoading>
      )}
      {hasLoaded && (
        <MenuItemBackgroundImage style={bgStyle}>
          &nbsp;
        </MenuItemBackgroundImage>
      )}
    </MenuItemImageView>
  )
}

MenuItemImage.displayName = 'MenuItemImage'
MenuItemImage.propTypes = {
  imageUrl: propTypes.string,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
}

export default MenuItemImage
