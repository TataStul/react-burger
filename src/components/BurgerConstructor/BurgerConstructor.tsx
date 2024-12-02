import React, {useEffect, useState} from 'react';
import {Data} from '../../utils/data.type';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'

type Props = {
  data: Data[],
  cart: Data[]
}

const enum IngredientType {
    Main = 'main',
    Bun = 'bun',
    Sauce = 'sauce'
};
  
function BurgerConstructor(props: Props) {
  const [amount, setAmount] = useState<number>(0);

  const renderBun = (type: 'top' | 'bottom', name: string, price: number, thumbnail: string) => (
    <BurgerConstructorItem
      type={type}
      title={`${name} (${type === 'top' ? 'верх' : 'низ'})`}
      price={price}
      thumbnail={thumbnail}
      isLocked={true}
    />
  );

  const getTitle = (element: Data, index: number) => {
    if (index === 0 && element.type === IngredientType.Bun) {
      return `${element.name} (верх)`;
    }
    if (index === props.data.length - 1 && element.type === IngredientType.Bun) {
      return `${element.name} (низ)`;
    }
    return element.name;
  };

  useEffect(() => {
    if (props.data.length) {
      const bunPrice = props.data[0].price * 2;
      const ingredientsPrice = props.cart.reduce((total, item) => total + item.price, 0);
      setAmount(bunPrice + ingredientsPrice);
    }
  }, [props.data, props.cart]);

  return (
    <div className={`mt-25 ${styles.gridColumn}`}>
      {props.data.length && (
        <section className={`mb-10 ${styles.grid}`}>
          {renderBun('top', props.data[0].name, props.data[0].price, props.data[0].image_mobile)}
          <div className={`${styles.scrollbar} ${styles.elementsGrid}`}>
            {props.cart.map((element, index) => (
              <BurgerConstructorItem
                key={index}
                title={getTitle(element, index)}
                price={element.price}
                thumbnail={element.image_mobile}
                isLocked={false}
              />
            ))}
          </div>
          {renderBun(
            'bottom',
            props.data[0].name,
            props.data[0].price,
            props.data[0].image_mobile)}
        </section>
      )}

      <section className={styles.buttonGrid}>
        <p className='text text_type_digits-medium'>{amount}</p>
        <CurrencyIcon type='primary' className='mr-10' />
        <Button htmlType='button' type='primary' size='medium'>Оформить заказ</Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;