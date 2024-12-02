import React from 'react';
import {Data} from '../../utils/data.type';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css'

type Props = {
  data: Data[],
  onClick: (element: Data) => unknown;
}

const enum IngredientType {
    Main = 'main',
    Bun = 'bun',
    Sauce = 'sauce'
  }

function BurgerIngredients(props: Props) {
  const [current, setCurrent] = React.useState('one');

  return (
    <div className='pt-10'>
      <p className='text text_type_main-large pb-5'>Соберите бургер</p>
      <div className={`mb-10 ${styles.tab}`}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>Булки</Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={`${styles.scrollbar}`}>
    {[
      {title: 'Булки', type: IngredientType.Bun},
      {title: 'Соусы', type: IngredientType.Sauce},
      {title: 'Начинки', type: IngredientType.Main},
    ].map((section) => (
      <section key={section.type} className={`mb-10 ${styles.wrapper}`}>
        <p className='text text_type_main-medium'>{section.title}</p>
        <div className={styles.wrap}>
          {props.data
            .filter((element) => element.type === section.type)
            .map((element, index) => (
              <div
                key={element._id}
                onClick={() => props.onClick(element)}
              >
                <BurgerIngredientsItem
                  srcImg={element.image}
                  price={element.price}
                  title={element.name}
                  count={section.type === IngredientType.Bun && index === 0 ? 1 : undefined}
                />
              </div>
            ))}
        </div>
      </section>
    ))}
  </div>
    </div>
  )
}

export default BurgerIngredients;
