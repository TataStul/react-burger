import { Fragment } from "react";
import { v4 } from "uuid";

import { FeedCardImage } from "../FeedCardImage/FeedCardImage";

import { Ingredient } from "../../utils/ingredient.type";
import { useSelector } from "../../utils/store-hooks";

import styles from "./FeedCardImages.module.css";

type FeedCardImagesProps = {
  ingredients: string[];
};

export function FeedCardImages({ ingredients }: FeedCardImagesProps) {
  const ingredientsList = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const images = ingredients.map(
    (ingredient) =>
      ingredientsList.find((i: Ingredient) => i._id === ingredient)
        ?.image_mobile
  );

  return (
    <div>
      {images.length <= 5
        ? images.map((image, index) => (
            <FeedCardImage key={v4()} image={image} index={index} />
          ))
        : images.slice(0, 6).map((image, index) => (
            <Fragment key={v4()}>
              <FeedCardImage image={image} index={index} />
              {index >= 5 ? (
                <p
                  className={`text text_type_digits-default ${styles.moreImageText}`}
                >
                  +{images.filter((_, index) => index >= 5).length}
                </p>
              ) : (
                ""
              )}
            </Fragment>
          ))}
    </div>
  );
}
