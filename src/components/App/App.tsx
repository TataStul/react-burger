import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../components/AppHeader/AppHeader";
import BurgerIngredients from "./../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { fetchIngredientsThunk } from "../../services/actions/BurgerIngredients";
import styles from "./App.module.css";

type ErrorType = {
  message?: string;
};

function App() {
  const dispatch = useDispatch();
  const error = useSelector(
    (state: { error?: ErrorType }) => state?.error?.message
  );

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, [dispatch]);

  if (error) {
    return (
      <div className={`text text_type_main-default ${styles.app}`}>
        <AppHeader />
        <main className={styles.parent}>
          <h1>{error}</h1>
        </main>
      </div>
    );
  }

  return (
    <div className={`text text_type_main-default ${styles.app}`}>
      <AppHeader />
      <main className={styles.parent}>
        <DndProvider backend={HTML5Backend}>
          <>
            <BurgerIngredients />
          </>
          <>
            <BurgerConstructor />
          </>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
