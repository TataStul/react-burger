import React, {useCallback, useState} from 'react';
import {Type} from '../../utils/type.type';
import {Ingredient} from '../../utils/ingredient.type';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css'

type Props = {
  data: Ingredient[];
};

function BurgerIngredients(props: Props) {
  const [current, setCurrent] = React.useState('one');
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const onIngredientClick = (element: Ingredient) => {
    setIngredient(element);
    setModalOpen(true);
  };

  const close = useCallback(() => {
    setModalOpen(false);
  }, []);

  const sections = [
    {id: 'one', title: 'Булки', type: Type.Bun},
    {id: 'two', title: 'Соусы', type: Type.Sauce},
    {id: 'three', title: 'Начинки', type: Type.Main},
  ];

  return (
    <div className='pt-10'>
      {ingredient && (
        <Modal isOpen={isModalOpen} title='Детали ингредиента' onClick={close}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}

<p className='text text_type_main-large pb-5'>Соберите бургер</p>

<div style={{ display: 'flex' }} className='mb-10'>
  {sections.map((section) => (
    <Tab
      key={section.id}
      value={section.id}
      active={current === section.id}
      onClick={setCurrent}
    >
      {section.title}
    </Tab>
  ))}
</div>

{props.data.length > 0 && (
  <div className={styles.scrollbar}>
    {sections.map((section) => (
      <section
        key={section.type}
        className={`mb-10 ${styles.wrapper}`}
      >
        <p className='text text_type_main-medium'>{section.title}</p>
        <div className={styles.wrap}>
          {props.data
            .filter((element) => element.type === section.type)
            .map((element, index) => (
              <div
                key={element._id}
                onClick={() => onIngredientClick(element)}
              >
                <BurgerIngredientsItem
                  srcImg={element.image}
                  price={element.price}
                  title={element.name}
                  count={
                    section.type === Type.Bun && index === 0
                      ? 1
                      : undefined
                  }
                />
              </div>
            ))}
        </div>
      </section>
    ))}
  </div>
)}
</div>
);
}

export default BurgerIngredients;