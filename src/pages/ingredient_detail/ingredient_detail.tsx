import { useEffect } from "react";
import { useParams } from "react-router";

import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { Layout } from "../../components/Layout/Layout";

import { getIngredientDetails } from "../../services/actions/IngredientDetails";
import { Ingredient } from "../../utils/ingredient.type";
import { useDispatch, useSelector } from "../../utils/store-hooks";

export function IngredientDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    if (ingredients.length) {
      const element = ingredients.find(
        (ingredient: Ingredient) => ingredient._id === id
      );
      if (element) {
        dispatch(getIngredientDetails(element));
      }
    }
  }, [ingredients]);

  return (
    <Layout>
      <IngredientDetails />
    </Layout>
  );
}
