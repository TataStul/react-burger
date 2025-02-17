import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";

import { Type } from "../../utils/type.type";
import { Ingredient } from "../../utils/ingredient.type";
import { Routes as RouteName } from "../../utils/routes";
import { TabEnum } from "../../utils/tab.enum";
import { useSelector } from "../../utils/store-hooks";

import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
  const location = useLocation();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const cart = useSelector(
    (state) => state.burgerConstructor.burgerConstructor
  );
  const buns = useSelector((state) => state.burgerConstructor.buns);

  const [current, setCurrent] = useState(TabEnum.One);

  const [bunRef, inViewBun, entryBun] = useInView({
    threshold: 0.3,
  });
  const [sauceRef, inViewSauce, entrySauce] = useInView({
    threshold: 0.3,
  });
  const [mainRef, inViewMain, entryMain] = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrent(TabEnum.One);
    } else if (inViewSauce) {
      setCurrent(TabEnum.Two);
    } else if (inViewMain) {
      setCurrent(TabEnum.Three);
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const handleTabClick = (tab: TabEnum, entry?: IntersectionObserverEntry) => {
    setCurrent(tab);
    entry?.target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`pt-10`}>
      <p className="text text_type_main-large pb-5">Соберите бургер</p>
      <div style={{ display: "flex" }} className="mb-10">
        <Tab
          value={TabEnum.One}
          active={current === TabEnum.One}
          onClick={() => handleTabClick(TabEnum.One, entryBun)}
        >
          Булки
        </Tab>
        <Tab
          value={TabEnum.Two}
          active={current === TabEnum.Two}
          onClick={() => handleTabClick(TabEnum.Two, entrySauce)}
        >
          Соусы
        </Tab>
        <Tab
          value={TabEnum.Three}
          active={current === TabEnum.Three}
          onClick={() => handleTabClick(TabEnum.Three, entryMain)}
        >
          Начинки
        </Tab>
      </div>

      {ingredients?.length ? (
        <div className={`${styles.scrollbar}`}>
          <section className={`mb-10 ${styles.wrapper}`} ref={bunRef}>
            <p className="text text_type_main-medium">Булки</p>
            <div className={styles.wrap}>
              {ingredients?.map((element: Ingredient) =>
                element.type === Type.Bun ? (
                  <Link
                    key={element._id}
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
              {ingredients?.map((element: Ingredient) =>
                element?._id && element.type === Type.Sauce ? (
                  <Link
                    key={element._id}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location }}
                    className={styles.link}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter(
                              (c: Ingredient) => c?._id === element?._id
                            ).length
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
              {ingredients?.map((element: Ingredient) =>
                element.type === Type.Main ? (
                  <Link
                    key={element._id}
                    to={`${RouteName.Ingredients}/${element._id}`}
                    state={{ backgroundLocation: location, element }}
                    className={styles.link}
                  >
                    <BurgerIngredientsItem
                      element={element}
                      count={
                        cart?.length && element?._id
                          ? cart?.filter(
                              (c: Ingredient) => c?._id === element?._id
                            ).length
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
