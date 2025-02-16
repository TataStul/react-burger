import imgDone from "../../images/done.svg";

import { Loader } from "../Loader/Loader";

import { useSelector } from "../../utils/store-hooks";

import styles from "./OrderDetails.module.css";

function OrderDetails() {
  const order = useSelector((state) => state.burgerConstructor.order);
  const loading = useSelector((state) => state.burgerConstructor.loading);

  return (
    <div className={`${styles.grid} pt-8`}>
      {loading ? (
        <div className={`${styles.loaderGrid} pb-30`}>
          <Loader />
        </div>
      ) : (
        <>
          {order?.order?.number ? (
            <p className={`text text_type_digits-large ${styles.glow} pb-8`}>
              {order.order.number}
            </p>
          ) : (
            <p className="text text_type_main-medium pb-8">
              Заказ обрабатывается...
            </p>
          )}
          <p className="text text_type_main-medium pb-15">
            идентификатор заказа
          </p>
          <img src={imgDone} alt="Done" />
          <p className="pt-15 pb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}

export default OrderDetails;
