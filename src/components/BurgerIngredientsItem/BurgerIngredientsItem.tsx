import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";

type Props = {
  title: string;
  price: number;
  srcImg: string;
  count?: number;
};

function BurgerIngredientsItem(props: Props) {
  return (
    <div className={styles.card}>
      {props.count && (
        <div className={styles.counter}>
          <Counter count={props.count} size="default" />
        </div>
      )}
      <img src={props.srcImg} alt={props.title} />
      <div className={`pb-1 pt-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p>{props.title}</p>
    </div>
  );
}

export default BurgerIngredientsItem;
