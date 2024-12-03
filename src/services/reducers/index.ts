import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./BurgerConstructor";
import { burgerIngredientsReducer } from "./BurgerIngredients";
import { ingredientDetailsReducer } from "./IngredientDetails";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
});
