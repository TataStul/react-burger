import { JSX } from "react";
import { Navigate, useLocation } from "react-router";

import { LoaderPage } from "../../pages/loader/loader";
import { Routes as RouteName } from "../../utils/routes";
import { useSelector } from "../../utils/store-hooks";

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
};

export const ProtectedRouteElement = (props: Props) => {
  const isAuthChecked = useSelector((state) => state.login.checkingAuth);
  const user = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <LoaderPage />;
  }

  if (props.onlyUnAuth && user?.isAuth) {
    return <Navigate to={RouteName.Main} state={{ from: location }} />;
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
