import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { Layout } from "../../components/Layout/Layout";

import { useSelector } from "../../utils/store-hooks";

import styles from "./main.module.css";

export function MainPage() {
  const error = useSelector((state) => state?.error?.message);

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
