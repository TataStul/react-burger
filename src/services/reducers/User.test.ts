import { initialStateOfUser, userReducer } from "./User";
import { TUserActions } from "../actions/User";
import { getUser, isUserAuth } from "../actions/Login";

const userTest = {
  email: "a@a.ru",
  password: "a",
  name: "a",
};

describe("reducer: User", () => {
  it("should return initial state", () => {
    expect(userReducer(initialStateOfUser, {} as TUserActions)).toEqual(
      initialStateOfUser
    );
  });
  it("should get user", () => {
    expect(userReducer(initialStateOfUser, getUser(userTest))).toEqual({
      ...initialStateOfUser,
      email: userTest.email,
      password: userTest.password,
      name: userTest.name,
    });
  });
  it("should check user auth", () => {
    expect(userReducer(initialStateOfUser, isUserAuth(true))).toEqual({
      ...initialStateOfUser,
      isAuth: true,
    });
  });
});
