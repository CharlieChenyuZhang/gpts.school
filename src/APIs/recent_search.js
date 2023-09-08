import axios from "axios";

// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const endpointUrl =
  process.env.NODE_ENV === "development"
    ? ""
    : "https://j9xb399hhb.us-east-1.awsapprunner.com";
// const endpointUrl = "";

const instance = axios.create({
  baseURL: endpointUrl,
  timeout: 10000, // 10s timeout
});

// TODO: note the logic has been moved to repo https://github.com/CharlieChenyuZhang/chatgpt-backend
export default async function getRecentTweets(portfolios) {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned

  // TODO: loop through twitterHandles and create a new data structure to store the result
  // {twitterHand1: [], twitterHand2: []}

  try {
    const res = await instance.get(`/twitter?portfolios=${portfolios}`);
    if (res?.status === 200) {
      return res.data;
    } else {
      throw new Error("Twitter returns a non 200 code", res);
    }
  } catch (error) {
    // TODO: add logging here
    return { error: "something went wrong with Twitter APIs" };
  }
}
