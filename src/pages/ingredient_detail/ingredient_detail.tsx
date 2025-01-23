import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";

import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { Layout } from "../../components/Layout/Layout";

import { fetchIngredientsThunk } from "../../services/actions/BurgerIngredients";
import { Ingredient } from "../../utils/ingredient.type";
import { GETTING_INGREDIENT_DETAILS } from "../../services/actions/IngredientDetails";

export function IngredientDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
  });

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (ingredients.length) {
      const element = ingredients.find((ingredient) => ingredient._id === id);
      if (element) {
        dispatch({
          type: GETTING_INGREDIENT_DETAILS,
          payload: element,
        });
      }
    }
  }, [ingredients]);

  return (
    <Layout>
      <IngredientDetails />
    </Layout>
  );
}
