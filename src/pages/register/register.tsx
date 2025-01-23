import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import { fetchRegisterThunk } from "../../services/actions/Registration";
import { ResponseState } from "../../utils/store-response.type";
import { UserRegister } from "../../utils/user-register.type";
import { useForm } from "../../utils/use-form";
import { Routes as RouteName } from "../../utils/routes";

import styles from "./register.module.css";

type RegisterPageSelector = {
  registration: ResponseState;
};

export function RegisterPage() {
  const [values, handleChange] = useForm<Required<UserRegister>>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const useRegisterPageSelector = useSelector.withTypes<RegisterPageSelector>();
  const navigate = useNavigate();

  const registration = useRegisterPageSelector((state) => {
    return state.registration.response;
  });

  const registerUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      fetchRegisterThunk({
        ...values,
      }) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    if (registration.success) {
      navigate(RouteName.Login);
    }
  }, [registration]);

  return (
    <Layout>
      <form className={styles.grid} onSubmit={registerUser}>
        <p className="text text_type_main-medium pb-6">Регистрация</p>
        <div className="pb-6">
          <Input
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
            type="text"
            placeholder="Имя"
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            value={values.name}
            name={"name"}
            extraClass="ml-1"
            autoComplete="name"
            onChange={handleChange}
          />
        </div>
        <div className="pb-6">
          <EmailInput
            value={values.email}
            name={"email"}
            isIcon={false}
            autoComplete="email"
            onChange={handleChange}
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            value={values.password}
            name={"password"}
            autoComplete="new-password"
            onChange={handleChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div className={`${styles.textRow} pb-4 pt-20`}>
          <p className="text text_color_inactive text_type_main-default">
            Уже зарегистрированы?
          </p>
          <Link to={RouteName.Login} className="text text_type_main-default">
            <p>Войти</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
