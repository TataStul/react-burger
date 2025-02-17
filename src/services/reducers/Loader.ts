import { LOADING } from "../constants";

import { TLoginActions } from "../actions/Login";

type TLoaderState = {
  loading?: boolean;
};

const initialState: TLoaderState = {
  loading: true,
};

export const loaderReducer = (
  state = initialState,
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
