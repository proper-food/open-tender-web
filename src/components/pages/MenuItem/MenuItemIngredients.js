import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  MenuItemNutritionView,
  MenuItemNutritionList,
} from './MenuItemNutrition'

const MenuItemIngredients = ({ ingredients, show = true }) => {
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="ingredients"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <MenuItemNutritionView>
            <MenuItemNutritionList>
              <p>{ingredients}</p>
            </MenuItemNutritionList>
          </MenuItemNutritionView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

MenuItemIngredients.displayName = 'MenuItemIngredients'
MenuItemIngredients.propTypes = {
  ingredients: propTypes.string,
  show: propTypes.bool,
}

export default MenuItemIngredients
