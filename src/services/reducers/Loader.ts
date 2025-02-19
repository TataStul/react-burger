import { LOADING } from "../constants";

import { TLoginActions } from "../actions/Login";

type TLoaderState = {
  loading?: boolean;
};

export const initialStateOfLoader: TLoaderState = { loading: true };

export const loaderReducer = (
  state = initialStateOfLoader,
  action: TLoginActions
): TLoaderState => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action?.loading,
      };
    }
    default: {
      return state;
    }
  }
};
