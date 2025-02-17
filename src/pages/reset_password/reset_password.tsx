import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import { fetchResetPasswordThunk } from "../../services/actions/ResetPassword";
import { UserResetPassword } from "../../utils/user-reset-password.type";
import { useForm } from "../../utils/use-form";
import { Routes as RoutesName } from "../../utils/routes";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "./reset_password.module.css";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resettingPassword = useSelector(
    (state) => state.resetPassword.response
  );
  const [values, handleChange] = useForm<Required<UserResetPassword>>({
    password: "",
    token: "",
  });
  const resetPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      fetchResetPasswordThunk({
        ...values,
      })
    );
  };

  useEffect(() => {
    if (resettingPassword.success) {
      navigate(RoutesName.Login);
    }
  }, [resettingPassword]);

  return (
    <Layout>
      <form className={styles.grid} onSubmit={resetPassword}>
        <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
        <div className="pb-6">
          <PasswordInput
            placeholder="Введите новый пароль"
            errorText={"Ошибка"}
            size={"default"}
            value={values.password}
            name={"password"}
            extraClass="ml-1"
            autoComplete="new-password"
            onChange={handleChange}
          />
        </div>
        <div className="pb-6">
          <Input
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
            type="text"
            placeholder="Введите код из письма"
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            value={values.token}
            name={"token"}
            extraClass="ml-1"
            autoComplete="one-time-code"
            onChange={handleChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
        <div className={`${styles.textRow} pb-4 pt-20`}>
          <p className="text text_color_inactive text_type_main-default">
            Вспомнили пароль?
          </p>
          <Link to={RoutesName.Login} className="text text_type_main-default">
            <p>Войти</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
