import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { FeedCardImage } from "../FeedCardImage/FeedCardImage";

import { Ingredient } from "../../utils/ingredient.type";

import styles from "./FeedDetailItem.module.css";

type FeedDetailItemProps = {
  ingredient?: Ingredient;
  counts?: { [key: string]: number };
};

export function FeedDetailItem({ ingredient, counts }: FeedDetailItemProps) {
  return (
    <div className={`${styles.grid} pl-5 pr-6`}>
      <FeedCardImage image={ingredient?.image_mobile} index={1} />
      <p className={`text text_type_main-small ${styles.ingredientName}`}>
        {ingredient?.name}
      </p>
      <div className={styles.amount}>
        <p className="text text_type_digits-default pr-2">
          {counts && counts[ingredient!._id] > 1
            ? `${counts[ingredient!._id]} x `
            : ""}
          {ingredient?.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
