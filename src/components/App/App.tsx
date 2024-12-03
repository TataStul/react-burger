import React, { useEffect, useState } from "react";
import { getData } from "../../utils/data";
import { Ingredient } from "../../utils/ingredient.type";
import AppHeader from "../../components/AppHeader/AppHeader";
import BurgerIngredients from "./../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const result = await getData();
      setData(result.data);
    } catch (e) {
      setError((e as Error).message || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
