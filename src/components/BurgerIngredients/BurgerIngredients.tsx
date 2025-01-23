import React, { useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";

import { GETTING_INGREDIENT_DETAILS } from "../../services/actions/IngredientDetails";

import { Type } from "../../utils/type.type";
import { Ingredient } from "../../utils/ingredient.type";
import { Routes as RouteName } from "../../utils/routes";

import styles from "./BurgerIngredients.module.css";

enum TabEnum {
  One = "one",
  Two = "two",
  Three = "three",
}

function BurgerIngredients() {
  const location = useLocation();

  const ingredients = useSelector((state: unknown) => {
    return (state as { burgerIngredients: { ingredients: Ingredient[] } })
      .burgerIngredients.ingredients;
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

  const onIngredientClick = (element: Ingredient) => {
    dispatch({
      type: GETTING_INGREDIENT_DETAILS,
      payload: element,
    });
  };

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
              {ingredients?.map((element) =>
                element.type === Type.Bun ? (
                  <Link
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location }}
                    className={styles.link}
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
                  </Link>
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
                  <Link
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location }}
                    className={styles.link}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter((c) => c?._id === element?._id).length
                          : undefined
                      }
                    />
                  </Link>
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
                  <Link
                    key={element._id}
                    onClick={() => onIngredientClick(element)}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location, element }}
                    className={styles.link}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter((c) => c?._id === element?._id).length
                          : undefined
                      }
                    />
                  </Link>
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
