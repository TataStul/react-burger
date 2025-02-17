import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { FeedCardImages } from "../FeedCardImages/FeedCardImages";

import { Status, statuses } from "../../utils/status.enum";
import { useSelector } from "../../utils/store-hooks";
import { Ingredient } from "../../utils/ingredient.type";
import { FeedDetail } from "../../utils/feed.type";

import styles from "./FeedCard.module.css";

export function FeedCard({
  ingredients,
  createdAt,
  number,
  name,
  status,
}: Partial<FeedDetail>) {
  const ingredientsList = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const calculatedAmount = ingredients
    ?.map((i) => ingredientsList?.find((v: Ingredient) => v._id === i))
    .reduce((a, b) => a + (b?.price ?? 0), 0);
  const getStateName = (statusCode: Status) => {
    return statuses[statusCode];
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(createdAt!)} />
        </p>
      </div>
      <p className="text text_type_main-medium pt-6">{name}</p>
      <p
        className={`text text_type_main-small pt-2 pb-6 ${
          status === Status.Done ? styles.statusSuccessText : null
        }`}
      >
        {getStateName(status as Status)}
      </p>
      <div className={`${styles.row} pt-6`}>
        <FeedCardImages ingredients={ingredients!} />
        <div className={`${styles.amount}`}>
          <p className="text text_type_digits-default">{calculatedAmount}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
