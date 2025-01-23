import { useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";

import {
  ForgotPasswordPage,
  IngredientDetailPage,
  IngredientsPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../../pages";

import {
  ProtectedAuthElement,
  ProtectedUnAuthElement,
} from "../ProtectedRouteElment/ProtectedRouteElment";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import { checkUserAuthThunk } from "../../services/actions/Login";

import { LoaderPage } from "../../pages/loader/loader";

import { Routes as RouteName } from "../../utils/routes";
import { LoadingType } from "../../utils/store-loading.type";
import { UserRegister } from "../../utils/user-register.type";
import { Routes as RoutesName } from "../../utils/routes";

type AppSelector = {
  loading: LoadingType;
  user: UserRegister;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const useAppSelector = useSelector.withTypes<AppSelector>();
  const loading = useAppSelector((state) => state.loading.loading);
  const user = useAppSelector((state) => state.user);
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    dispatch(checkUserAuthThunk() as unknown as UnknownAction);
  }, []);

  if (loading && !user?.email) {
    return <LoaderPage />;
  }

  return (
    <>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={RoutesName.IngredientDetail}
            element={
              <ProtectedAuthElement
                onlyUnAuth={false}
                element={
                  <Modal
                    isOpen={true}
                    title="Детали ингредиента"
                    onClick={() => navigate(RouteName.Main)}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
      <Routes location={state?.backgroundLocation || location}>
        <Route path={RoutesName.Main} element={<MainPage />} />
        <Route
          path={RoutesName.Login}
          element={<ProtectedUnAuthElement element={<LoginPage />} />}
        />
        <Route
          path={RoutesName.Register}
          element={<ProtectedUnAuthElement element={<RegisterPage />} />}
        />
        <Route
          path={RoutesName.ForgotPassword}
          element={<ProtectedUnAuthElement element={<ForgotPasswordPage />} />}
        />
        <Route
          path={RoutesName.ResetPassword}
          element={<ProtectedUnAuthElement element={<ResetPasswordPage />} />}
        />
        <Route
          path={RoutesName.IngredientDetail}
          element={
            <ProtectedAuthElement
              onlyUnAuth={false}
              element={<IngredientDetailPage />}
            />
          }
        />
        <Route path={RoutesName.NotFound} element={<NotFoundPage />} />
        <Route
          path={`${RoutesName.Ingredients}/:id`}
          element={
            <ProtectedAuthElement
              onlyUnAuth={false}
              element={<IngredientsPage />}
            />
          }
        />
        <Route
          path={RoutesName.Profile}
          element={
            <ProtectedAuthElement
              onlyUnAuth={false}
              element={<ProfilePage />}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
