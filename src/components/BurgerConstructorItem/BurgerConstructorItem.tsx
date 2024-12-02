import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructorItem.module.css';

type Props = {
  type?: 'top' | 'bottom' | undefined
  isLocked?: boolean;
  title: string;
  price: number;
  thumbnail: string;
}

function BurgerConstructorItem(props: Props) {
  return (
    <>
      {props.isLocked ?
        <div className='ml-8'>
          <ConstructorElement
            type={props.type}
            isLocked={true}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
          />
        </div>
        :
        <div className={styles.grid}>
          <DragIcon type='primary' />
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
          />
        </div>
      }
    </>
  )
}

export default BurgerConstructorItem;