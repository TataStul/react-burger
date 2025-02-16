import { useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Routes, useNavigate } from "react-router-dom";

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
  FeedPage,
} from "../../pages";
import { FeedDetailPage } from "../../pages/feed_detail/feed_detail";
import { LoaderPage } from "../../pages/loader/loader";

import {
  ProtectedAuthElement,
  ProtectedUnAuthElement,
} from "../ProtectedRouteElment/ProtectedRouteElment";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Profile } from "../Profile/Profile";
import { FeedList } from "../FeedList/FeedList";
import { FeedDetail } from "../FeedDetail/FeedDetail";
import Modal from "../Modal/Modal";

import { checkUserAuthThunk } from "../../services/actions/Login";
import { fetchIngredientsThunk } from "../../services/actions/BurgerIngredients";
import { Routes as RouteName } from "../../utils/routes";
import { Routes as RoutesName } from "../../utils/routes";
import { useDispatch, useSelector } from "../../utils/store-hooks";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.loading);
  const user = useSelector((state) => state.user);
  const state = location.state as { backgroundLocation?: Location };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuthThunk());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

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

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={`${RoutesName.Feed}/:id`}
            element={
              <Modal
                isOpen={true}
                title=""
                onClick={() => navigate(RouteName.Feed)}
              >
                <FeedDetail />
              </Modal>
            }
          />
        </Routes>
      )}

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={`${RoutesName.Profile}/${RoutesName.ProfileOrders}/:id`}
            element={
              <Modal
                isOpen={true}
                title=""
                onClick={() =>
                  navigate(`${RoutesName.Profile}/${RoutesName.ProfileOrders}`)
                }
              >
                <FeedDetail />
              </Modal>
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
        <Route path={RoutesName.Feed} element={<FeedPage />} />
        <Route
          path={`${RoutesName.Profile}/*`}
          element={
            <ProtectedAuthElement
              onlyUnAuth={false}
              element={<ProfilePage />}
            />
          }
        >
          <Route path="" element={<Profile />} />
          <Route path={RoutesName.ProfileOrders} element={<FeedList />} />
        </Route>
        <Route
          path={`${RoutesName.Profile}/${RoutesName.ProfileOrders}/:id`}
          element={<FeedDetailPage />}
        />
        <Route path={`${RoutesName.Feed}/:id`} element={<FeedDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
