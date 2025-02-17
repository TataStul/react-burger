import { combineReducers } from "redux";

import { burgerConstructorReducer } from "./BurgerConstructor";
import { burgerIngredientsReducer } from "./BurgerIngredients";
import { feedsReducer } from "./Feeds";
import { forgotPasswordReducer } from "./ForgotPassword";
import { ingredientDetailsReducer } from "./IngredientDetails";
import { loaderReducer } from "./Loader";
import { loginReducer } from "./Login";
import { registrationReducer } from "./Registration";
import { resetPasswordReducer } from "./ResetPassword";
import { userReducer } from "./User";
import { wsReducer } from "./WS";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  feeds: feedsReducer,
  forgotPassword: forgotPasswordReducer,
  ingredientDetails: ingredientDetailsReducer,
  loading: loaderReducer,
  login: loginReducer,
  registration: registrationReducer,
  resetPassword: resetPasswordReducer,
  user: userReducer,
  wsReducer: wsReducer,
});
