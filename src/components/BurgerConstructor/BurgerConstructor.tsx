import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { v4 as uuid4 } from "uuid";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import {
  addIngredient,
  removeIngredientAction,
  moveIngredientAction,
  getOfBurgerConstructorAction,
  addBun,
  recalculateAmountAction,
  clearOrderAction,
  fetchMakingOrderThunk,
} from "../../services/actions/BurgerConstructor";
import { checkUserAuthThunk } from "../../services/actions/Login";
import { Ingredient } from "../../utils/ingredient.type";
import { Type } from "../../utils/type.type";
import { Routes as RouterName } from "../../utils/routes";
import { DndType } from "../../utils/dnd.enum";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state?.error?.message);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.burgerConstructor
  );
  const buns = useSelector((state) => state.burgerConstructor.buns);
  const amount = useSelector((state) => state.burgerConstructor.amount);
  const isAuth = useSelector((state) => state.user.isAuth);

  const [, drop] = useDrop({
    accept: DndType.NewIngredient,
    drop: (ingredient: Ingredient) => {
      if (ingredient.type === Type.Bun) {
        dispatch(addBun(ingredient));
      } else {
        dispatch(
          addIngredient({
            ...ingredient,
            uniqueId: uuid4(),
          })
        );
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
      dispatch(
        moveIngredientAction(updatedIngredients.filter((v) => v !== undefined))
      );
    },
    [ingredients, dispatch]
  );

  const [makingOrder, setMakingOrder] = useState<boolean>(false);
  const [oderDetails, setOrderDetails] = useState<boolean>(false);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);

  const showOrderDetails = () => {
    setMakingOrder(true);
    dispatch(checkUserAuthThunk());
  };

  const makeOrder = () => {
    let orderDetails: any[];
    if (buns) {
      orderDetails = [
        ...ingredients.map((v: { _id: string }) => v._id),
        buns?._id,
        buns?._id,
      ];
    } else {
      orderDetails = [...ingredients.map((v: { _id: string }) => v._id)];
    }
    dispatch(fetchMakingOrderThunk(orderDetails));
    setOrderDetails(true);
  };

  const close = () => {
    setOrderDetails(false);
    dispatch(clearOrderAction());
    setMakingOrder(false);
    setIsCartEmpty(true);
  };

  useEffect(() => {
    recalculateAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, buns]);

  const recalculateAmount = () => {
    let totalAmount = 0;
    if (buns && Object.keys(buns).length) {
      setIsCartEmpty(false);
      totalAmount = ingredients.reduce(
        (sum: number, ingredient: Ingredient) => sum + ingredient?.price,
        buns?.price * 2
      );
    } else if (ingredients.length) {
      totalAmount = ingredients.reduce(
        (sum: number, ingredient: Ingredient) => sum + ingredient?.price,
        0
      );
    }
    dispatch(recalculateAmountAction(totalAmount));
  };

  const onRemove = (uniqueId: string) => {
    dispatch(
      removeIngredientAction(
        ingredients.filter((v: Ingredient) => v && v.uniqueId !== uniqueId)
      )
    );
    dispatch(getOfBurgerConstructorAction());
  };

  useEffect(() => {
    if (makingOrder) {
      if (isAuth) {
        makeOrder();
      } else {
        navigate(RouterName.Login, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, makingOrder]);

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
              (ingredient: Ingredient, index?: number) =>
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
          disabled={isCartEmpty}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
