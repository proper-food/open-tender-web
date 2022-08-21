import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectCustomer, selectCustomerFavorites } from '@open-tender/redux'
import {
  formatDollars,
  getItemOptions,
  makeItemSignature,
} from '@open-tender/js'
import { ClipLoader } from 'react-spinners'
import { Body, Heading, Points, Preface } from '@open-tender/components'
import { MenuItemFavorite, MenuItemPriceCals } from '../..'
import MenuItemImage from './MenuItemImage'
import { isMobile } from 'react-device-detect'
import MenuItemSelections from './MenuItemSelections'
import MenuItemSelected from './MenuItemSelected'

const MenuItemHeaderView = styled.div`
  padding: ${(props) => props.theme.layout.padding} 0 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  // background-color: palegreen;
  transition: ${(props) => props.theme.links.transition};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }

  &.isCustomize {
    position: fixed;
    z-index: 11;
    top: ${(props) => props.theme.layout.navHeight};
    right: 0;
    width: 64rem;
    height: ${(props) => props.theme.layout.navHeight};
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-stretch;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      width: 100%;
      top: ${(props) => props.theme.layout.navHeightMobile};
      height: 6rem;
      padding-top: 0.5rem;
    }
  }
`

const MenuItemHeaderContainer = styled.div`
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
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

const MenuItemNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: palegreen;
`

const MenuItemName = styled(Heading)`
  display: block;
  transition: ${(props) => props.theme.links.transition};
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }

  &.isCustomize {
    font-size: ${(props) => props.theme.fonts.sizes.big};
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

const MenuItemHeader = ({
  builtItem,
  decrementOption,
  displaySettings,
  pointsIcon,
  isCustomize,
  setIsCustomize,
}) => {
  const { bgColors } = useTheme()
  const { auth } = useSelector(selectCustomer)
  const { lookup } = useSelector(selectCustomerFavorites)
  const signature = makeItemSignature(builtItem)
  const favoriteId = lookup && signature ? lookup[signature] : null
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
  const hasSelections = currentOptions && currentOptions.length ? true : false
  const klass = isCustomize ? 'isCustomize' : ''

  return (
    <MenuItemHeaderView className={klass} showImage={showImage}>
      <MenuItemHeaderContainer>
        {!isCustomize && displayImageUrl ? (
          <MenuItemImage imageUrl={displayImageUrl}>
            <ClipLoader size={30} loading={true} color={bgColors.primary} />
          </MenuItemImage>
        ) : null}
        <MenuItemInfo className={klass}>
          <MenuItemNameContainer>
            <MenuItemName as="p" className={klass}>
              {name}
            </MenuItemName>
            {auth && !isCustomize ? (
              <MenuItemFavorite
                size={isMobile ? 16 : 24}
                favoriteId={favoriteId}
                builtItem={builtItem}
                disabled={isIncomplete}
              />
            ) : null}
          </MenuItemNameContainer>
          <MenuItemPriceCals
            price={displayPrice}
            cals={displayCals}
            style={isCustomize ? {} : { margin: '0.5rem 0 0' }}
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
            {description && !hasSelections ? (
              <MenuItemDesc as="p">{description}</MenuItemDesc>
            ) : null}
          </>
        )}
      </MenuItemHeaderContainer>
      {isCustomize ? (
        <MenuItemSelected
          groups={nonSizeGroups}
          decrementOption={decrementOption}
        />
      ) : hasCustomize ? (
        <MenuItemSelections
          groups={nonSizeGroups}
          decrementOption={decrementOption}
          requiresCustomization={requiresCustomization}
          setIsCustomize={setIsCustomize}
        />
      ) : null}
    </MenuItemHeaderView>
  )
}

MenuItemHeader.displayName = 'MenuItemHeader'
MenuItemHeader.propTypes = {
  builtItem: propTypes.object,
  decrementOption: propTypes.func,
  displaySettings: propTypes.object,
  pointsIcon: propTypes.element,
  isCustomize: propTypes.bool,
  setIsCustomize: propTypes.func,
}

export default MenuItemHeader
