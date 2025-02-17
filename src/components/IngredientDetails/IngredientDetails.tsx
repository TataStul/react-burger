import { useParams } from "react-router";

import MacronutrientComp from "../MacronutrientComp/MacronutrientComp";

import { Ingredient } from "../../utils/ingredient.type";
import { MacronutrientType } from "../../utils/macronutrient.type";
import { useSelector } from "../../utils/store-hooks";

import styles from "./IngredientDetails.module.css";

function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const ingredient = ingredients.find((v: Ingredient) => v._id === id);

  return (
    <>
      {ingredient && (
        <div className={styles.grid}>
          <img alt={ingredient.name} src={ingredient.image_large} />
          <p className="text text_type_main-medium pt-4 pb-8">
            {ingredient.name}
          </p>

          <div className={styles.macronutrients}>
            <MacronutrientComp
              value={ingredient.calories}
              name={`${MacronutrientType.Calories},ккал`}
            />
            <MacronutrientComp
              value={ingredient.proteins}
              name={`${MacronutrientType.Proteins},г`}
            />
            <MacronutrientComp
              value={ingredient.fat}
              name={`${MacronutrientType.Fat},г`}
            />
            <MacronutrientComp
              value={ingredient.carbohydrates}
              name={`${MacronutrientType.Carbohydrates},г`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default IngredientDetails;
