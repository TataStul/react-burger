import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./BurgerConstructor";
import { burgerIngredientsReducer } from "./BurgerIngredients";
import { forgotPasswordReducer } from "./ForgotPassword";
import { ingredientDetailsReducer } from "./IngredientDetails";
import { loaderReducer } from "./Loader";
import { loginReducer } from "./Login";
import { registrationReducer } from "./Registration";
import { resetPasswordReducer } from "./ResetPassword";
import { userReducer } from "./User";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  forgotPassword: forgotPasswordReducer,
  ingredientDetails: ingredientDetailsReducer,
  loading: loaderReducer,
  login: loginReducer,
  registration: registrationReducer,
  resetPassword: resetPasswordReducer,
  user: userReducer,
});
