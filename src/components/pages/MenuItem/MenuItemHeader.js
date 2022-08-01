import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { formatDollars, getItemOptions } from '@open-tender/js'
import { ClipLoader } from 'react-spinners'
import {
  Body,
  ButtonLink,
  Heading,
  Points,
  Preface,
} from '@open-tender/components'
import MenuItemImage from './MenuItemImage'
import MenuItemPriceCals from './MenuItemPriceCals'

const MenuItemHeaderView = styled.div`
  transition: ${(props) => props.theme.links.transition};
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: ${(props) => props.theme.layout.padding};
  padding-bottom: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
    padding-top: 0;
  }

  &.isCustomize {
    position: fixed;
    z-index: 11;
    top: ${(props) => props.theme.layout.navHeight};
    right: 0;
    width: 64rem;
    height: ${(props) => props.theme.layout.navHeight};
    padding-top: 1.5rem;
    padding-bottom: 0rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      width: 100%;
      top: ${(props) => props.theme.layout.navHeightMobile};
      height: 6rem;
      padding-top: 0.5rem;
    }
  }
`

const MenuItemInfo = styled.div`
  transition: ${(props) => props.theme.links.transition};

  &.isCustomize {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const MenuItemName = styled(Heading)`
  display: block;
  transition: ${(props) => props.theme.links.transition};
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }

  &.isCustomize {
    font-size: ${(props) => props.theme.fonts.sizes.main};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const MenuItemPoints = styled.span`
  display: inline-block;
  margin: 0 0 0 1.5rem;
`

const MenuItemTagsAllergens = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 1rem 0 0;

  span {
    display: block;
  }

  span + span {
    margin-left: 2rem;
  }
`

const MenuItemTag = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
`

const MenuItemAllergen = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  color: ${(props) => props.theme.colors.allergens};
`

const MenuItemDesc = styled(Body)`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemSelections = styled.p`
  margin: 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }

  &.isCustomize {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemSelectionsEdit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0.5rem;
  // background-color: palegreen;
`

const MenuItemSelectionsTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.main};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemSelectionsOptions = styled(Body)``

const MenuItemSelectionsIncomplete = styled.span`
  color: ${(props) => props.theme.colors.error};
`

const MenuItemHeader = ({
  builtItem,
  displaySettings,
  pointsIcon,
  isCustomize,
  setIsCustomize,
}) => {
  const { bgColors } = useTheme()
  const {
    builderImages: showImage,
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const {
    name,
    description,
    quantity,
    price,
    totalPrice,
    cals,
    totalCals,
    imageUrl,
    totalPoints,
    tags,
    allergens,
    groups,
  } = builtItem
  const hasTags = showTags && tags.length ? true : false
  const hasAllergens = showAllergens && allergens.length ? true : false
  const hasTagsAllergens = hasTags || hasAllergens ? true : false
  const sizeGroup = groups.find((i) => i.isSize)
  const defaultOption = !sizeGroup
    ? null
    : sizeGroup.options.find((i) => i.isDefault) || sizeGroup.options[0]
  const currentPrice = totalPrice
    ? totalPrice
    : defaultOption
    ? defaultOption.price
    : price
  const displayPrice = formatDollars(currentPrice)
  const displayCals = showCals ? (totalPrice ? totalCals : cals) : null
  const displayImageUrl = showImage && imageUrl ? imageUrl : null
  const missingSize = sizeGroup
    ? !sizeGroup.options.find((i) => i.quantity >= 1)
    : false
  const hasCustomize = groups.filter((g) => !g.isSize).length > 0
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete = totalPrice === 0 || quantity === '' || groupsBelowMin
  const requiresCustomization = isIncomplete && !missingSize
  const nonSizeGroups = groups.filter((i) => !i.isSize)
  const currentOptions = getItemOptions({ groups: nonSizeGroups })
  const currentSelections = currentOptions
    .map((i) => {
      return i.quantity === 1 ? i.name : `${i.name} x ${i.quantity}`
    })
    .join(', ')
  const klass = isCustomize ? 'isCustomize' : ''

  return (
    <MenuItemHeaderView className={klass} showImage={showImage}>
      {!isCustomize && displayImageUrl ? (
        <MenuItemImage imageUrl={displayImageUrl}>
          <ClipLoader size={30} loading={true} color={bgColors.primary} />
        </MenuItemImage>
      ) : null}
      <MenuItemInfo className={klass}>
        <MenuItemName as="p" className={klass}>
          {name}
        </MenuItemName>
        <MenuItemPriceCals
          price={displayPrice}
          cals={displayCals}
          style={isCustomize ? {} : { margin: '1rem 0 0' }}
        >
          {totalPoints && (
            <MenuItemPoints>
              <Points
                points={totalPoints}
                icon={pointsIcon}
                title="Points can be applied at checkout"
              />
            </MenuItemPoints>
          )}
        </MenuItemPriceCals>
      </MenuItemInfo>
      {!isCustomize && (
        <>
          {hasTagsAllergens && (
            <MenuItemTagsAllergens>
              {hasTags
                ? tags.map((tag) => <MenuItemTag key={tag}>{tag}</MenuItemTag>)
                : null}
              {hasAllergens
                ? allergens.map((allergen) => (
                    <MenuItemAllergen key={allergen}>
                      {allergen}
                    </MenuItemAllergen>
                  ))
                : null}
            </MenuItemTagsAllergens>
          )}
          {description && !currentSelections ? (
            <MenuItemDesc as="p">{description}</MenuItemDesc>
          ) : null}
        </>
      )}
      {hasCustomize && (
        <MenuItemSelections className={klass}>
          {!isCustomize && (
            <MenuItemSelectionsEdit>
              <MenuItemSelectionsTitle>
                Current Selections:{' '}
              </MenuItemSelectionsTitle>
              <ButtonLink onClick={() => setIsCustomize(true)}>
                {currentSelections ? 'edit selections' : 'customize item'}
              </ButtonLink>
            </MenuItemSelectionsEdit>
          )}
          <MenuItemSelectionsOptions>
            {currentSelections ? (
              <span>{currentSelections}</span>
            ) : isCustomize ? (
              <span>please make your selections below</span>
            ) : requiresCustomization ? (
              <MenuItemSelectionsIncomplete>
                requires customization
              </MenuItemSelectionsIncomplete>
            ) : (
              <span>nothing selected</span>
            )}
          </MenuItemSelectionsOptions>
        </MenuItemSelections>
      )}
    </MenuItemHeaderView>
  )
}

MenuItemHeader.displayName = 'MenuItemHeader'
MenuItemHeader.propTypes = {
  builtItem: propTypes.object,
  displaySettings: propTypes.object,
  pointsIcon: propTypes.element,
  isCustomize: propTypes.bool,
  setIsCustomize: propTypes.func,
}

export default MenuItemHeader
