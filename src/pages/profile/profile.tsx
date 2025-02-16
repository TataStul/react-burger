import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import { fetchUserThunk } from "../../services/actions/User";
import { fetchLogoutThunk } from "../../services/actions/Login";
import { Routes as RouteName } from "../../utils/routes";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "./profile.module.css";

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useSelector((state) => state.login.logout);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  const onLogout = () => {
    dispatch(fetchLogoutThunk());
  };

  useEffect(() => {
    if (logout?.success) {
      navigate(RouteName.Login, { replace: true });
    }
  }, [logout]);

  return (
    <Layout>
      <div className={`${styles.grid} pt-30`}>
        <div className={`${styles.col} ${styles.textWidth}`}>
          <div className={styles.button}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => navigate(RouteName.Profile)}
            >
              <p className="text text_type_main-large pb-6">Профиль</p>
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => navigate(`${RouteName.ProfileOrders}`)}
            >
              <p
                className="text text_type_main-large pb-6"
                style={{ textAlign: "start" }}
              >
                История заказов
              </p>
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={onLogout}
            >
              <div className="text text_color_inactive text_type_main-large pb-20">
                Выход
              </div>
            </Button>
            <p
              className={`text text_type_main-default text_color_inactive`}
              style={{ padding: "10px 40px" }}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </Layout>
  );
}
