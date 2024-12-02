import React, {useEffect, useState} from 'react';
import {getData} from "../../utils/data";
import {Data} from "../../utils/data.type";
import AppHeader from "../../components/AppHeader/AppHeader";
import BurgerIngredients from "./../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import styles from './App.module.css';

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [cart, setCart] = useState<Data[]>([])

  const fetchData = async () => {
    try {
      const data = await getData();
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }
  
  const addToCart = (element: Data) => {
    setCart(oldCart => [...oldCart, element])
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`text text_type_main-default ${styles.app}`}>
      <AppHeader />
      <main className={styles.parent}>
        <>
          <BurgerIngredients data={data} onClick={addToCart} />
        </>
        <>
          <BurgerConstructor data={data} cart={cart} />
        </>
      </main>
    </div>
  );
}

export default App;
