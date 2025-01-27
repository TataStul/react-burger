import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { Layout } from "../../components/Layout/Layout";

import { fetchIngredientsThunk } from "../../services/actions/BurgerIngredients";

import { ErrorType } from "../../utils/error.type";

import styles from "./main.module.css";

export function MainPage() {
  const dispatch = useDispatch();

  const error = useSelector(
    (state: { error?: ErrorType }) => state?.error?.message
  );

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, [dispatch]);

  return (
    <Layout>
      <div className={`text text_type_main-default ${styles.app}`}>
        <main className={styles.parent}>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <div>
                <BurgerIngredients />
              </div>
              <div>
                <BurgerConstructor />
              </div>
            </DndProvider>
          )}
        </main>
      </div>
    </Layout>
  );
}
