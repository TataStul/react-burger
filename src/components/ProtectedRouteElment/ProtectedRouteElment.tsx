import { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { LoaderPage } from "../../pages/loader/loader";

import { UserRegister } from "../../utils/user-register.type";
import { Routes as RouteName } from "../../utils/routes";

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
};

type ProtectedRouteSelector = {
  login: { checkingAuth: boolean };
  user: UserRegister & { isAuth?: boolean };
};

export const ProtectedRouteElement = (props: Props) => {
  const useProtectedRouteSelector =
    useSelector.withTypes<ProtectedRouteSelector>();

  const isAuthChecked = useProtectedRouteSelector((state) => {
    return state.login.checkingAuth;
  });

  const user = useProtectedRouteSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <LoaderPage />;
  }

  if (props.onlyUnAuth && user?.isAuth) {
    return <Navigate to={RouteName.Login} state={{ from: location }} />;
  }

  if (!props.onlyUnAuth && !user?.isAuth) {
    return <Navigate to={RouteName.Login} state={{ from: location }} />;
  }

  return props.element;
};

export const ProtectedAuthElement = ProtectedRouteElement;

export const ProtectedUnAuthElement = (props: { element: JSX.Element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={props.element} />
);
