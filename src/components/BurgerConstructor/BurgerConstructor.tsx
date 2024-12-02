import React, {useEffect, useState} from 'react';
import {Ingredient} from '../../utils/ingredient.type';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'

type Props = {
  data: Ingredient[];
}

function BurgerConstructor({ data }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [cart, setCart] = useState<Ingredient[]>([]);
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data.length) {
      const slicedCart = data.slice(1, 6);
      setCart(slicedCart);
    }
  }, [data]);

  useEffect(() => {
    if (cart.length) {
      const bunPrice = data[0]?.price || 0;
      const cartAmount = cart.reduce((total, item) => total + item.price, 0);
      setAmount(bunPrice * 2 + cartAmount);
    }
  }, [cart, data]);

  const handleOrderClick = () => {
    setIsOrderDetailsVisible(true);
  };

  const handleCloseModal = () => {
    setIsOrderDetailsVisible(false);
  };

  if (!data.length) return null;

  const bun = data[0];

  return (
    <div className={`mt-25 ${styles.gridColumn}`}>
      <Modal isOpen={isOrderDetailsVisible} title='' onClick={handleCloseModal}>
        <OrderDetails />
      </Modal>

      <section className={`mb-10 ${styles.grid}`}>
        <BurgerConstructorItem
          type='top'
          title={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          isLocked
        />

        <div className={`${styles.scrollbar} ${styles.elementsGrid}`}>
          {cart.map((ingredient, index) => (
            <BurgerConstructorItem
              key={index}
              title={`${ingredient.name} (низ)`}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}
            />
          ))}
        </div>

        <BurgerConstructorItem
          type='bottom'
          title={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          isLocked
        />
      </section>

      <section className={styles.buttonGrid}>
        <p className='text text_type_digits-medium'>{amount}</p>
        <CurrencyIcon type='primary' className='mr-10' />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;