import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Type } from "../../utils/type.type";
import { Ingredient } from "../../utils/ingredient.type";
import { GETTING_INGREDIENT_DETAILS } from "../../services/actions/IngredientDetails";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";

enum TabEnum {
  One = "one",
  Two = "two",
  Three = "three",
}

function BurgerIngredients() {
  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
  });

  const ingredient = useSelector((state: unknown) => {
    return (
      (state as { ingredient: { ingredient: Ingredient | null } })?.ingredient
        ?.ingredient || null
    );
  });

  const cart = useSelector(
    (state: { burgerConstructor: { burgerConstructor: Ingredient[] } }) => {
      return state.burgerConstructor.burgerConstructor;
    }
  );

  const buns = useSelector(
    (state: { burgerConstructor: { buns: Ingredient } }) => {
      return state.burgerConstructor.buns;
    }
  );

  const dispatch = useDispatch();
  const [current, setCurrent] = useState("one");
  const [isModalOpen, setModalOpen] = useState(false);

  const onIngredientClick = (element: Ingredient) => {
    dispatch({
      type: GETTING_INGREDIENT_DETAILS,
      payload: element,
    });
    setModalOpen(true);
  };

  const close = useCallback(() => {
    setModalOpen(false);
  }, []);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollBy = (
    ref: React.RefObject<HTMLDivElement>,
    activeTab: TabEnum
  ) => {
    setCurrent(activeTab);
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className={`pt-10`}>
      {ingredient && (
        <Modal isOpen={isModalOpen} title="Детали ингредиента" onClick={close}>
          <IngredientDetails />
        </Modal>
      )}

      <p className="text text_type_main-large pb-5">Соберите бургер</p>

      <div style={{ display: "flex" }} className="mb-10">
        <Tab
          value={TabEnum.One}
          active={current === TabEnum.One}
          onClick={() => scrollBy(bunRef, TabEnum.One)}
        >
          Булки
        </Tab>
        <Tab
          value={TabEnum.Two}
          active={current === TabEnum.Two}
          onClick={() => scrollBy(sauceRef, TabEnum.Two)}
        >
          Соусы
        </Tab>
        <Tab
          value={TabEnum.Three}
          active={current === TabEnum.Three}
          onClick={() => scrollBy(mainRef, TabEnum.Three)}
        >
          Начинки
        </Tab>
      </div>

      {ingredients?.length ? (
        <div className={`${styles.scrollbar}`}>
          <section className={`mb-10 ${styles.wrapper}`} ref={bunRef}>
            <p className="text text_type_main-medium">Булки</p>
            <div className={styles.wrap}>
              {ingredients?.map((element, index) =>
                element.type === Type.Bun ? (
                  <div
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        buns &&
                        Object.keys(buns).length &&
                        buns?._id === element?._id
                          ? 2
                          : undefined
                      }
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </section>

          <section className={`${styles.wrapper} pt-10 pb-10`} ref={sauceRef}>
            <p className="text text_type_main-medium pb-6">Соусы</p>
            <div className={styles.wrap}>
              {ingredients?.map((element) =>
                element?._id && element.type === Type.Sauce ? (
                  <div
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter((c) => c?._id === element?._id).length
                          : undefined
                      }
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </section>

          <section className={styles.wrapper} ref={mainRef}>
            <p className="text text_type_main-medium pb-6">Начинки</p>
            <div className={styles.wrap}>
              {ingredients?.map((element) =>
                element.type === Type.Main ? (
                  <div
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter((c) => c?._id === element?._id).length
                          : undefined
                      }
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BurgerIngredients;
