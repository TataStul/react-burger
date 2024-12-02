import React from 'react';
import imgDone from '../../images/done.svg';
import styles from './OrderDetails.module.css';

function OrderDetails() {
  return (
    <div className={`${styles.grid} pt-8`}>
      <p
        className={`text text_type_digits-large ${styles.glow} pb-8`}
      >034536</p>
      <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
      <img src={imgDone} alt='Done' />
      <p className='pt-15 pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;