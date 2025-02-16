import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { FeedCard } from "../FeedCard/FeedCard";

import { closeConnection, getUserOrders } from "../../services/actions/WS";
import { Feed } from "../../utils/feed.type";
import { getCookie } from "../../utils/cookie-get";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "./FeedList.module.css";

export function FeedList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const feeds: Feed | undefined = useSelector((state) => state.feeds?.feeds);

  useEffect(() => {
    dispatch(
      getUserOrders(
        `orders?token=${getCookie("accessToken")?.split("Bearer ")[1]}`
      )
    );

    return () => {
      dispatch(closeConnection());
    };
  }, []);

  return (
    <div className={styles.feedGrid}>
      {feeds?.orders?.length ? (
        feeds?.orders?.map((v) => (
          <Link
            key={v._id}
            to={v._id}
            state={{ backgroundLocation: location }}
            className={styles.link}
          >
            <FeedCard
              ingredients={v.ingredients}
              number={v.number}
              createdAt={v.createdAt}
              name={v.name}
              status={v.status}
            />
          </Link>
        ))
      ) : (
        <p className="text text_type_main-medium">Нет заказов</p>
      )}
    </div>
  );
}
