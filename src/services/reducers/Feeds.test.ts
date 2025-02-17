import { feedsReducer, initialStateOfFeeds } from "./Feeds";

import {
  getFeedRejected,
  getFeedsActions,
  getFeedsRequest,
  TFeedActions,
} from "../actions/Feeds";

import { Feed } from "../../utils/feed.type";

const feedTest: Feed = {
  success: true,
  orders: [
    {
      _id: "h78d9sd0hjghf0gj88gh7f6h",
      ingredients: [
        "o9p8q7r6s5t4u3v2w1x0y1z",
        "643d69a5c3f7b9001cfa093d",
        "9z8y7x6w5v4u3t2s1r0q1p2",
      ],
      status: "done",
      name: "Краторная булка N-200i",
      createdAt: "2024-12-04T02:15:30.123Z",
      updatedAt: "2024-12-04T02:16:45.456Z",
      number: 7004,
    },
    {
      _id: "hf0gj88gh7f6h78d9sd0hjgh",
      ingredients: [
        "o9p8q7r6s5t4u3v2w1x0y1z",
        "o9p8q7r6s5t4u3v2w1x0y1z",
        "a1b2c3d4e5f6g7h8i9j0k1l2",
        "a1b2c3d4e5f6g7h8i9j0k1l2",
        "9z8y7x6w5v4u3t2s1r0q1p2",
        "o9p8q7r6s5t4u3v2w1x0y1z",
      ],
      status: "done",
      name: "Краторная булка N-300i",
      createdAt: "2024-12-04T08:47:12.789Z",
      updatedAt: "2024-12-04T08:48:20.321Z",
      number: 12345,
    },
    {
      _id: "j88gh7f6h78d9hf0gsd0hjgh",
      ingredients: ["o9p8q7r6s5t4u3v2w1x0y1z", "a1b2c3d4e5f6g7h8i9j0k1l2"],
      status: "done",
      name: "Краторная булка N-400i",
      createdAt: "2024-12-04T15:30:05.654Z",
      updatedAt: "2024-12-04T15:31:40.987Z",
      number: 8766,
    },
  ],
  total: 99111,
  totalToday: 267,
};

describe("reducer: Feeds", () => {
  it("should return the initial state", () => {
    expect(feedsReducer(initialStateOfFeeds, {} as TFeedActions)).toEqual({
      ...initialStateOfFeeds,
    });
  });
  it("should get feeds", () => {
    expect(
      feedsReducer(
        initialStateOfFeeds,
        getFeedsActions(JSON.stringify({ feed: feedTest }) as unknown as Feed)
      )
    ).toEqual({
      ...initialStateOfFeeds,
      feeds: { feed: feedTest },
    });
  });
  it("should catch ingredients error", () => {
    expect(
      feedsReducer(initialStateOfFeeds, getFeedRejected({ error: "ooops" }))
    ).toEqual({
      ...initialStateOfFeeds,
      error: { error: "ooops" },
    });
  });
  it("should ingredients request", () => {
    expect(feedsReducer(initialStateOfFeeds, getFeedsRequest())).toEqual({
      ...initialStateOfFeeds,
      error: null,
    });
  });
});
