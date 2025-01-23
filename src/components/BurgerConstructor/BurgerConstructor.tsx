import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { v4 as uuid4 } from "uuid";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import {
  ADDING_INGREDIENT,
  MOVING_INGREDIENT,
  REMOVING_INGREDIENT,
  GETTING_BURGER_CONSTRUCTOR,
  ADDING_BUN,
  RECALCULATING_AMOUNT,
  CLEARING_ORDER,
  fetchMakingOrderThunk,
} from "../../services/actions/BurgerConstructor";
import { checkUserAuthThunk } from "../../services/actions/Login";

import { Ingredient } from "../../utils/ingredient.type";
import { Type } from "../../utils/type.type";
import { Order } from "../../utils/order.type";

import styles from "./BurgerConstructor.module.css";

enum DndType {
  Ingredient = "ingredient",
  NewIngredient = "new-ingredient",
}

type ErrorType = {
  message?: string;
};

type BurgerConstructorSelector = {
  burgerConstructor: {
    burgerConstructor: Ingredient[];
    buns: Ingredient | null;
    amount: number;
    order: Order;
  };
  user: {
    isAuth: boolean;
  };
  error?: ErrorType;
};

function BurgerConstructor() {
  const dispatch = useDispatch();

  const useBurgerConstructorSelector =
    useSelector.withTypes<BurgerConstructorSelector>();

  const error = useBurgerConstructorSelector((state) => state?.error?.message);

  const ingredients = useBurgerConstructorSelector(
    (state) => state.burgerConstructor.burgerConstructor
  );

  const buns = useBurgerConstructorSelector(
    (state) => state.burgerConstructor.buns
  );

  const amount = useBurgerConstructorSelector(
    (state) => state.burgerConstructor.amount
  );

  const isAuth = useBurgerConstructorSelector((state) => state.user.isAuth);

  const [{ isOver }, drop] = useDrop({
    accept: DndType.NewIngredient,
    drop: (ingredient: Ingredient) => {
      if (ingredient.type === Type.Bun) {
        dispatch({
          type: ADDING_BUN,
          payload: ingredient,
        });
      } else {
        dispatch({
          type: ADDING_INGREDIENT,
          payload: { ...ingredient, uniqueId: uuid4() },
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = ingredients[dragIndex];
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(dragIndex, 1);
      updatedIngredients.splice(hoverIndex, 0, dragItem);

      dispatch({
        type: MOVING_INGREDIENT,
        payload: updatedIngredients.filter((v) => v !== undefined),
      });
    },
    [ingredients, dispatch]
  );

  const navigate = useNavigate();
  const [makingOrder, setMakingOrder] = useState<boolean>(false);
  const [oderDetails, setOrderDetails] = useState<boolean>(false);

  const showOrderDetails = () => {
    setMakingOrder(true);
    dispatch(checkUserAuthThunk() as unknown as UnknownAction);
  };

  const makeOrder = () => {
    let orderDetails = [];
    if (buns) {
      orderDetails = [...ingredients.map((v) => v._id), buns?._id, buns?._id];
    } else {
      orderDetails = [...ingredients.map((v) => v._id)];
    }

    dispatch(fetchMakingOrderThunk(orderDetails) as unknown as UnknownAction);

    setOrderDetails(true);
  };

  const close = () => {
    setOrderDetails(false);
    dispatch({
      type: CLEARING_ORDER,
    });
    setMakingOrder(false);
  };

  useEffect(() => {
    if (buns && Object.keys(buns).length) {
      const totalAmount = ingredients.reduce(
        (sum, ingredient) => sum + ingredient?.price,
        buns?.price * 2
      );
      dispatch({
        type: RECALCULATING_AMOUNT,
        payload: totalAmount,
      });
    } else if (ingredients.length) {
      const totalAmount = ingredients.reduce(
        (sum, ingredient) => sum + ingredient?.price,
        0
      );
      dispatch({
        type: RECALCULATING_AMOUNT,
        payload: totalAmount,
      });
    }
  }, [ingredients, buns]);

  const onRemove = (uniqueId: string) => {
    dispatch({
      type: REMOVING_INGREDIENT,
      payload: ingredients.filter((v) => v && v.uniqueId !== uniqueId),
    });

    dispatch({
      type: GETTING_BURGER_CONSTRUCTOR,
    });
  };

  return (
    <div className={`mt-25 ${styles.gridColumn}`} ref={drop}>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <Modal isOpen={oderDetails} title="" onClick={close}>
          <OrderDetails />
        </Modal>
      )}
      <section className={`mb-10 ${styles.grid}`}>
        {buns && Object.keys(buns).length ? (
          <BurgerConstructorItem
            type="top"
            title={`${buns.name} (верх)`}
            price={buns.price}
            thumbnail={buns.image_mobile}
            isLocked={true}
          />
        ) : (
          ""
        )}
        {ingredients.length ? (
          <div className={`${styles.scrollbar} ${styles.elementsGrid}`}>
            {ingredients.map(
              (ingredient, index) =>
                ingredient?._id && (
                  <BurgerConstructorItem
                    key={ingredient.uniqueId}
                    title={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    isLocked={false}
                    index={index}
                    moveIngredient={moveIngredient}
                    onRemove={() => onRemove(ingredient.uniqueId!)}
                  />
                )
            )}
          </div>
        ) : (
          ""
        )}
        {buns && Object.keys(buns).length ? (
          <BurgerConstructorItem
            type="bottom"
            title={`${buns.name} (низ)`}
            price={buns.price}
            thumbnail={buns.image_mobile}
            isLocked={true}
          />
        ) : (
          ""
        )}
      </section>
      {!ingredients.length && !buns?._id && (
        <section className={`mb-10 ${styles.noElementsGrid}`}>
          <div className={`pt-25 pb-25 ${styles.noElementsGridTitle}`}>
            <p className="text text_type_main-default text_color_inactive">
              Пожалуйста, перенесите сюда булку и ингредиенты для создания
              заказа
            </p>
          </div>
        </section>
      )}
      <section className={styles.buttonGrid}>
        <p className="text text_type_digits-medium">{amount}</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={showOrderDetails}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
