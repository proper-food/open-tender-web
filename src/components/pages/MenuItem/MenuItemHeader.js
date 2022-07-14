import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { formatDollars, makeModifierNames } from '@open-tender/js'
import { ClipLoader } from 'react-spinners'
import { Body, Heading, Points, Preface } from '@open-tender/components'
import MenuItemImage from './MenuItemImage'
import MenuItemPriceCals from './MenuItemPriceCals'

const MenuItemHeaderView = styled.div``

const MenuItemInfo = styled.div`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 0 0 ${(props) => props.theme.layout.padding};
  // padding: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 ${(props) => props.theme.layout.paddingMobile};
    // padding: 0 0 1.5rem;
  }
`

const MenuItemName = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
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
  margin: 1rem 0 0;
`

const MenuItemSelectionsTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const MenuItemSelectionsOptions = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const MenuItemHeader = ({
  builtItem,
  displaySettings,
  pointsIcon,
  isCustomize,
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
  const nonSizeGroups = groups.filter((i) => !i.isSize)
  const currentSelections = makeModifierNames({ groups })

  return (
    <MenuItemHeaderView>
      {displayImageUrl && (
        <MenuItemImage imageUrl={displayImageUrl}>
          <ClipLoader size={30} loading={true} color={bgColors.primary} />
        </MenuItemImage>
      )}
      <MenuItemInfo>
        <MenuItemName as="p">{name}</MenuItemName>
        <MenuItemPriceCals
          price={displayPrice}
          cals={displayCals}
          style={{ margin: '1rem 0 0' }}
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
        {isCustomize ? (
          <MenuItemSelections>
            <MenuItemSelectionsTitle>
              Current Selections:{' '}
            </MenuItemSelectionsTitle>
            <MenuItemSelectionsOptions>
              {currentSelections}
            </MenuItemSelectionsOptions>
          </MenuItemSelections>
        ) : (
          <>
            {hasTagsAllergens && (
              <MenuItemTagsAllergens>
                {hasTags
                  ? tags.map((tag) => (
                      <MenuItemTag key={tag}>{tag}</MenuItemTag>
                    ))
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
            {description && <MenuItemDesc as="p">{description}</MenuItemDesc>}
          </>
        )}
      </MenuItemInfo>
    </MenuItemHeaderView>
  )
}

MenuItemHeader.displayName = 'MenuItemHeader'
MenuItemHeader.propTypes = {
  builtItem: propTypes.object,
  displaySettings: propTypes.object,
  pointsIcon: propTypes.element,
}

export default MenuItemHeader
