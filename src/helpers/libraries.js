// import { portfolios } from "../helpers/constants";

// input: {Instacart: [], Rippling: []}
// output: {Instacart: [], Rippling: []}
// sort everything in its own array
export const sort = (
  input,
  criteria = {
    impression_count: false,
    like_count: false,
    quote_count: false,
    reply_count: false,
    retweet_count: false,
  }
) => {
  let flattened = [];
  for (const portfolio in input) {
    for (const company of input[portfolio]) {
      flattened.push({ ...company, username: portfolio });
    }
  }

  const countGen = (publicMetrics) => {
    return Object.keys(criteria).reduce((prev, curr) => {
      if (criteria[curr]) {
        prev += publicMetrics[curr];
      }
      return prev;
    }, 0);
  };

  flattened = flattened.sort((a, b) => {
    const countA = countGen(a["public_metrics"]);
    const countB = countGen(b["public_metrics"]);
    if (countA === countB) return 0;
    return countA < countB ? 1 : -1;
  });
  return flattened;
};

// input: {Instacart: [], Rippling: []}
// output: {Instacart: [], Rippling: []}
// FIXME: use pointer, whoever is biggest, move it to the next pointer
export const pick = (inputArray, NUMBER_OF_PICKS) => {
  const sliced = inputArray.slice(0, NUMBER_OF_PICKS);
  const result = {};
  // Object.keys(input).forEach((each) => {
  //   result[each] = [];
  // });

  for (const tweet of sliced) {
    if (Object.keys(result).includes(tweet.username)) {
      result[tweet.username].push(tweet);
    } else {
      result[tweet.username] = [tweet];
    }
  }

  // for (const key in input) {
  //   result[key] = input[key].slice(0, NUMBER_OF_PICKS);
  // }
  return result;
};

export const displaySelectedTweets = (input) => {
  let result = "";
  for (const company in input) {
    result += "@" + company;
    result += "\n";
    input[company].forEach((element, idx) => {
      result += "Tweet " + (idx + 1) + ": " + element.text.replaceAll("\n", "");
      result += "\n\n";
    });
    result += "\n";
  }
  return result;
};

export const grabTwitterhandles = (portfolios) => {
  let result = "";
  for (const portfolio in portfolios) {
    result += portfolio + ",";
  }
  return result.slice(0, -1);
};
