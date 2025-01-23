import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import {
  fetchUserThunk,
  fetchUserUpdatingThunk,
} from "../../services/actions/User";
import { fetchLogoutThunk } from "../../services/actions/Login";
import { UserRegister } from "../../utils/user-register.type";
import { Logout } from "../../utils/store-logout.type";
import { useForm } from "../../utils/use-form";
import { Routes as RouteName } from "../../utils/routes";

import styles from "./profile.module.css";

type ProfileSelector = {
  user: UserRegister;
  login: Logout;
};

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useProfilePageSelector = useSelector.withTypes<ProfileSelector>();
  const user = useProfilePageSelector((state) => state.user);

  const logout = useProfilePageSelector((state) => {
    return state.login.logout;
  });

  const [values, handleChange, setCertainValue] = useForm<
    Required<UserRegister>
  >({
    email: "",
    password: "",
    name: "",
  });

  const [showButtons, setShowButtons] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && Object.keys(user).length) {
      if (user?.name) {
        setCertainValue("name", user.name);
      }
      setCertainValue("email", user.email);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserThunk() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (
      user.name !== nameRef.current?.value ||
      user.email !== loginRef.current?.value ||
      values.password.length
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [user, nameRef.current?.value, loginRef.current?.value, values.password]);

  const onLogout = () => {
    dispatch(fetchLogoutThunk() as unknown as UnknownAction);
  };

  useEffect(() => {
    if (logout?.success) {
      navigate(RouteName.Login, { replace: true });
    }
  }, [logout]);

  const onSaveProfile = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      fetchUserUpdatingThunk({
        ...values,
      }) as unknown as UnknownAction
    );
  };

  const onCancelEdit = () => {
    setCertainValue("name", user.name);
    setCertainValue("email", user.email);
    setShowButtons(false);
  };

  return (
    <Layout>
      <div className={`${styles.grid} pt-30`}>
        <div className={`${styles.col} ${styles.textWidth}`}>
          <p className="text text_type_main-large pb-6">Профиль</p>
          <p className="text text_color_inactive text_type_main-large pb-6">
            История заказов
          </p>
          <div className={styles.logoutButton}>
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
            <p className={`text text_type_main-default text_color_inactive`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <form className="pl-15" onSubmit={onSaveProfile}>
          <div className={styles.col}>
            <div className="pb-6">
              <Input
                ref={nameRef}
                type="text"
                placeholder="Имя"
                onChange={handleChange}
                value={values.name}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
                icon="EditIcon"
                autoComplete="name"
                onPointerEnterCapture={() => ({})}
                onPointerLeaveCapture={() => ({})}
              />
            </div>
            <div className="pb-6">
              <Input
                onPointerEnterCapture={() => ({})}
                onPointerLeaveCapture={() => ({})}
                ref={loginRef}
                type="text"
                placeholder="Логин"
                error={false}
                icon="EditIcon"
                errorText={"Ошибка"}
                size={"default"}
                value={values.email}
                name={"login"}
                extraClass="ml-1"
                autoComplete="email"
                onChange={handleChange}
              />
            </div>
            <PasswordInput
              placeholder="Пароль"
              icon="EditIcon"
              errorText={"Ошибка"}
              size={"default"}
              value={values.password}
              name={"password"}
              extraClass="ml-1"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          {showButtons ? (
            <div className={`${styles.saveButton} pt-10`}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={onCancelEdit}
              >
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          ) : null}
        </form>
      </div>
    </Layout>
  );
}
