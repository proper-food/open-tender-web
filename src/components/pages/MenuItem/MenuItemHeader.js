import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { formatDollars } from '@open-tender/js'
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

// const MenuItemPriceCals = styled.div`
//   margin: 1rem 0 0;
// `

// const MenuItemPrice = styled(Heading)`
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
//     font-size: ${(props) => props.theme.fonts.sizes.small};
//   }
// `

// const MenuItemCals = styled(Body)`
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
//     font-size: ${(props) => props.theme.fonts.sizes.small};
//   }
// `

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

const MenuItemHeader = ({ menuItem, builtItem, pointsIcon }) => {
  const { bgColors } = useTheme()
  const { imageUrl, price, cals, tags, allergens } = menuItem
  const { name, description, points, totalPrice, totalCals } = builtItem
  const hasTagsAllergens = tags.length || allergens.length ? true : false
  const displayPrice = totalPrice ? formatDollars(totalPrice) : price
  const displayCals = totalPrice ? totalCals : cals
  // const zeroPrice = !!(item.price === '0.00' || item.price === 0)

  return (
    <MenuItemHeaderView>
      {/* {imageUrl && (
        <MenuItemImage imageUrl={imageUrl}>
          <ClipLoader size={30} loading={true} color={bgColors.primary} />
        </MenuItemImage>
      )} */}
      <MenuItemInfo>
        <MenuItemName as="p">{name}</MenuItemName>
        <MenuItemPriceCals
          price={displayPrice}
          cals={displayCals}
          style={{ margin: '1rem 0 0' }}
        >
          <MenuItemPoints>
            <Points
              points={points}
              icon={pointsIcon}
              title="Points can be applied at checkout"
            />
          </MenuItemPoints>
        </MenuItemPriceCals>
        {hasTagsAllergens && (
          <MenuItemTagsAllergens>
            {tags.map((tag) => (
              <MenuItemTag key={tag}>{tag}</MenuItemTag>
            ))}
            {allergens.map((allergen) => (
              <MenuItemAllergen key={allergen}>{allergen}</MenuItemAllergen>
            ))}
          </MenuItemTagsAllergens>
        )}
        {description && <MenuItemDesc as="p">{description}</MenuItemDesc>}
      </MenuItemInfo>
    </MenuItemHeaderView>
  )
}

MenuItemHeader.displayName = 'MenuItemHeader'
MenuItemHeader.propTypes = {
  menuItem: propTypes.object,
  builtItem: propTypes.object,
  pointsIcon: propTypes.element,
}

export default MenuItemHeader
