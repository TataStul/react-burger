import { useDrag } from "react-dnd";
import { Ingredient } from "../../utils/ingredient.type";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";

type Props = {
  element: Ingredient;
  count?: number;
};

enum DndType {
  NewIngredient = "new-ingredient",
  Ingredient = "ingredient",
}

function BurgerIngredientsItem(props: Props) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DndType.NewIngredient,
      item: props.element,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.element]
  );

  return (
    <div
      ref={drag}
      className={`${styles.card} ${isDragging ? styles.cardDragging : ""}`}
    >
      {props.count ? (
        <div className={styles.counter}>
          <Counter count={props.count} size="default" />
        </div>
      ) : null}
      <img src={props.element.image_mobile} alt={props.element.name} />
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">
          {props.element.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p>{props.element.name}</p>
    </div>
  );
}

export default BurgerIngredientsItem;
