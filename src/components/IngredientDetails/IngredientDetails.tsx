import { useSelector } from "react-redux";
import { Ingredient } from "../../utils/ingredient.type";
import { MacronutrientType } from "../../utils/macronutrient.type";
import MacronutrientComp from "../MacronutrientComp/MacronutrientComp";
import styles from "./IngredientDetails.module.css";

function IngredientDetails() {
  const ingredient = useSelector(
    (state) =>
      (state as { ingredientDetails: { ingredient?: Ingredient } })
        .ingredientDetails.ingredient ?? null
  );

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  const macro = [
    { value: ingredient.calories, name: `${MacronutrientType.Calories}, ккал` },
    { value: ingredient.proteins, name: `${MacronutrientType.Proteins}, г` },
    { value: ingredient.fat, name: `${MacronutrientType.Fat}, г` },
    {
      value: ingredient.carbohydrates,
      name: `${MacronutrientType.Carbohydrates}, г`,
    },
  ];

  return (
    <>
      <div className={styles.grid}>
        <img alt={ingredient.name} src={ingredient.image_large} />
        <p className="text text_type_main-medium pb-8 pt-4">
          {ingredient.name}
        </p>
        <div className={styles.macronutrients}>
          {macro.map((item, index) => (
            <MacronutrientComp
              key={index}
              value={item.value}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;
