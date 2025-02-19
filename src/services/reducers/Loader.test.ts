import { initialStateOfLoader, loaderReducer } from "./Loader";
import { makeLoading, TLoginActions } from "../actions/Login";

describe("reducer: Loader", () => {
  it("should return initial state", () => {
    expect(loaderReducer(initialStateOfLoader, {} as TLoginActions)).toEqual(
      initialStateOfLoader
    );
  });

  it("should make loading", () => {
    expect(loaderReducer(initialStateOfLoader, makeLoading(true))).toEqual({
      ...initialStateOfLoader,
      loading: true,
    });
  });
});
