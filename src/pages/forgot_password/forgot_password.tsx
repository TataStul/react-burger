import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import { fetchForgotPasswordThunk } from "../../services/actions/ForgotPassword";
import { UserResponse } from "../../utils/user-response.type";
import { useForm } from "../../utils/use-form";
import { Routes } from "../../utils/routes";

import styles from "./forgot_password.module.css";

type RegisterPageSelector = {
  forgotPassword: { response: UserResponse };
};

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useRegisterPageSelector = useSelector.withTypes<RegisterPageSelector>();
  const response = useRegisterPageSelector(
    (state) => state.forgotPassword.response
  );
  const [values, handleChange] = useForm<Required<{ email: string }>>({
    email: "",
  });

  const recoverPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      fetchForgotPasswordThunk(values.email) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    if (response.success) {
      navigate(Routes.ResetPassword);
    }
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
