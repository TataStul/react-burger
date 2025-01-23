import { LOADING } from "../actions/Loader";

const initialState = {
  loading: true,
};

export type ActionType = {
  type: string;
  payload?: any;
};

export const loaderReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
