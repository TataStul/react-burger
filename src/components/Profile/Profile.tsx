import { FormEvent, useEffect, useRef, useState } from "react";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { fetchUserUpdatingThunk } from "../../services/actions/User";
import { useForm } from "../../utils/use-form";
import { UserRegister } from "../../utils/user-register.type";
import { useDispatch, useSelector } from "../../utils/store-hooks";

import styles from "../../pages/profile/profile.module.css";

export function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showButtons, setShowButtons] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const [values, handleChange, setCertainValue] = useForm<
    Required<UserRegister>
  >({
    email: "",
    password: "",
    name: "",
  });
  const onSaveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchUserUpdatingThunk({
        ...values,
      })
    );
  };
  const onCancelEdit = () => {
    setCertainValue("name", user.name);
    setCertainValue("email", user.email);
    setShowButtons(false);
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      if (user?.name) {
        setCertainValue("name", user.name);
      }
      setCertainValue("email", user.email);
    }
  }, [user]);

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

  return (
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
            ref={loginRef}
            type="text"
            placeholder="Логин"
            onChange={handleChange}
            value={values.email}
            name={"login"}
            error={false}
            icon="EditIcon"
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            autoComplete="email"
            onPointerEnterCapture={() => ({})}
            onPointerLeaveCapture={() => ({})}
          />
        </div>
        <PasswordInput
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password}
          name={"password"}
          icon="EditIcon"
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          autoComplete="current-password"
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
  );
}
