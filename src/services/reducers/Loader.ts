import { LOADING } from "../actions/Loader";

import { ActionType } from "../../utils/action.type";

const initialState = {
  loading: true,
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
