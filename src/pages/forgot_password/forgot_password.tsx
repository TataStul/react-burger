import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import { fetchForgotPasswordThunk } from "../../services/actions/ForgotPassword";
import { useForm } from "../../utils/use-form";
import { Routes } from "../../utils/routes";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "./forgot_password.module.css";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.forgotPassword.response);
  const [values, handleChange] = useForm<Required<{ email: string }>>({
    email: "",
  });
  const recoverPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(fetchForgotPasswordThunk(values.email));
  };

  useEffect(() => {
    if (response.success) {
      navigate(Routes.ResetPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <Layout>
      <form className={styles.grid} onSubmit={recoverPassword}>
        <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
        <div className="pb-6">
          <Input
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
            type="text"
            placeholder="Укажите e-mail"
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            value={values.email}
            name={"email"}
            extraClass="ml-1"
            autoComplete="email"
            onChange={handleChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
        <div className={`${styles.textRow} pb-4 pt-20`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className="text text_type_main-default">
            <p>Войти</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
