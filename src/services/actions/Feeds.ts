import { FEEDS, FEEDS_REJECTED, FEEDS_REQUEST } from "../constants";
import { Feed } from "../../utils/feed.type";

// interfaces
export interface IGetFeeds {
  readonly type: typeof FEEDS;
  feed: Feed;
}
export interface IGetFeedsRejected {
  readonly type: typeof FEEDS_REJECTED;
  error: unknown;
}
export interface IGetFeedsRequest {
  readonly type: typeof FEEDS_REQUEST;
}

export type TFeedActions = IGetFeeds | IGetFeedsRejected | IGetFeedsRequest;

// consts
export const getFeedsActions = (feed: Feed): IGetFeeds => ({
  type: FEEDS,
  feed,
});
export const getFeedRejected = (error: unknown): IGetFeedsRejected => ({
  type: FEEDS_REJECTED,
  error,
});
export const getFeedsRequest = (): IGetFeedsRequest => ({
  type: FEEDS_REQUEST,
});
