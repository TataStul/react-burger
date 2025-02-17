import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Layout } from "../../components/Layout/Layout";
import { FeedCard } from "../../components/FeedCard/FeedCard";

import { closeConnection, initWs } from "../../services/actions/WS";
import { Feed } from "../../utils/feed.type";
import { Status } from "../../utils/status.enum";
import { Routes as RouteName } from "../../utils/routes";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "./feed.module.css";

export function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const mocks: Feed | undefined = useSelector((state) => state.feeds?.feeds);

  useEffect(() => {
    dispatch(initWs("orders/all"));

    return () => {
      dispatch(closeConnection());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div
        className={`${styles.row} pt-10 pr-30 pl-30`}
        style={{ gap: "60px" }}
      >
        <div className={styles.col}>
          <p className="text text_type_main-large pb-6">Лента заказов</p>
          <div className={`${styles.feedGrid} ${styles.scroll}`}>
            {mocks?.orders?.map((v) => (
              <Link
                to={`${RouteName.Feed}/${v._id}`}
                state={{ backgroundLocation: location }}
                className={styles.link}
                key={v._id}
              >
                <FeedCard
                  ingredients={v.ingredients}
                  number={v.number}
                  createdAt={v.createdAt}
                  name={v.name}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className={`${styles.col}`}>
          <div className={`${styles.row} pb-15`} style={{ gap: "36px" }}>
            <div className={`${styles.col}`}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <div className={styles.scrollReady}>
                {mocks?.orders
                  ?.filter((o) => o.status === Status.Done)
                  .map((o) => (
                    <p
                      key={o._id}
                      className={`text text_type_digits-default ${styles.orderNumberText}`}
                    >
                      {o.number}
                    </p>
                  ))}
              </div>
            </div>

            <div className={styles.col}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <div className={styles.scrollReady}>
                {mocks?.orders
                  ?.filter(
                    (o) =>
                      o.status === Status.Pending || o.status === Status.Created
                  )
                  .map((o) => (
                    <p key={o._id} className={`text text_type_digits-default`}>
                      {o.number}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large pb-15">{mocks?.total}</p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large"> {mocks?.totalToday}</p>
        </div>
      </div>
    </Layout>
  );
}
