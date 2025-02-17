import { FEEDS, FEEDS_REJECTED, FEEDS_REQUEST } from "../constants";
import { Feed } from "../../utils/feed.type";
import { TFeedActions } from "../actions/Feeds";

type TFeedState = {
  feeds?: Feed;
  error: unknown;
};

export const initialStateOfFeeds: TFeedState = {
  feeds: undefined,
  error: null,
};

export const feedsReducer = (
  state = initialStateOfFeeds,
  action: TFeedActions
): TFeedState => {
  switch (action.type) {
    case FEEDS: {
      return {
        ...state,
        feeds: action?.feed
          ? JSON.parse(action.feed as unknown as string)
          : undefined,
      };
    }
    case FEEDS_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case FEEDS_REJECTED: {
      return {
        ...state,
        error: action?.error,
      };
    }
    default:
      return state;
  }
};
