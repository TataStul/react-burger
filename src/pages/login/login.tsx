import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Layout } from "../../components/Layout/Layout";

import { fetchLoginThunk } from "../../services/actions/Login";
import { UserLogin } from "../../utils/user-login.type";
import { useForm } from "../../utils/use-form";

import styles from "./login.module.css";

export function LoginPage() {
  const dispatch = useDispatch();

  const [values, handleChange] = useForm<UserLogin>({
    email: "",
    password: "",
  });

  const onAuth = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      fetchLoginThunk({
        ...values,
      }) as unknown as UnknownAction
    );
  };

  return (
    <Layout>
      <form className={styles.grid} onSubmit={onAuth}>
        <p className="text text_type_main-medium pb-6">Вход</p>
        <div className="pb-6">
          <EmailInput
            name={"email"}
            value={values.email}
            isIcon={false}
            autoComplete="email"
            onChange={handleChange}
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            name={"password"}
            value={values.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <div className={`${styles.textRow} pb-4 pt-20`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link to="/register" className="text text_type_main-default">
            <p>Зарегистрироваться</p>
          </Link>
        </div>
        <div className={styles.textRow}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className="text text_type_main-default">
            <p>Восстановить пароль</p>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
