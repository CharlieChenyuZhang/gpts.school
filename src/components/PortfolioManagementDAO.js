import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InteractiveUI from "./InteractiveUI";
import logo from "../assets/builderDAO.jpeg";
import portfolio1 from "../assets/portfolios/beta-p-1.png";
import portfolio2 from "../assets/portfolios/beta-p-2.png";
import portfolio3 from "../assets/portfolios/beta-p-3.png";
import betaCompanies from "../assets/portfolios/beta-companies.png";
// import betaPortfolios from "../assets/portfolios/beta-updated-portfolio.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Configuration, OpenAIApi } from "openai";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
import getRecentTweets from "../APIs/recent_search";
import { sort, pick, displaySelectedTweets } from "../helpers/libraries";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const Header = styled.div`
  margin-top: 3rem;
`;

const Logo = styled.img`
  width: 10rem;
  height: 10rem;
  /* position: fixed; */
`;

const PortfolioImg = styled.img`
  width: 100%;
  /* height: 30rem; */
  /* position: fixed; */
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 400px;
  overflow: scroll;
  margin: auto;
`;

const Button = styled.a`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 1.125rem;
  border: solid 1px;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  width: fit-content;

  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  background-image: ${(props) =>
    props.disabled
      ? `linear-gradient(
      to right,
      lightgrey 0%,
      grey 51%,
      grey 100%
    )`
      : `linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  )`};

  :hover {
    background-position: right center;
    text-decoration: none;
  }
`;

const PickTweetContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const TweetsContentContainer = styled.div`
  margin-top: 50px;
  flex-grow: 1;

  @media only screen and (max-width: 992px) {
    margin-top: 0;
  }
`;

const Step = styled.span`
  margin-right: 15px;
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PortfolioManagement = () => {
  const [sortingCriteria, setSortingCriteria] = useState({
    impression_count: false,
    like_count: true,
    quote_count: false,
    reply_count: false,
    retweet_count: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  const [isSummarizationLoading, setIsSummarizationLoading] = useState(false);
  const [pickedTweets, setPickedTweets] = useState({});
  const [portfolios, setPortfolios] = useState("BuidlerDAO");
  // const [showPortfolios, setShowPortfolios] = useState(false);
  const [wholeEmail, setWholeEmail] = useState("");
  const [summaryPrompt, setSummaryPrompt] = useState(""); // FIXME: update the summaryPrompt once I fetch the data from twitter
  const [selectedTweets, setSelectedTweets] = useState("");

  const handleChange = (event) => {
    setSortingCriteria({
      ...sortingCriteria,
      [event.target.name]: event.target.checked,
    });
  };

  const error = Object.values(sortingCriteria).filter((v) => v).length < 1;

  const callOpenAI = async (prompt) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return completion;
  };

  async function generateEmail() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        setIsLoading(true);
        const prompt = `Hi, I want to create a personalized reporting newslette for Beta Fellowship. Beta Fellowship offer funding, mentorship and networking opportunities for Chinese and American audiences. The goal of the newsletter is to advertise what Beta Fellowship is, and provide a weekly update for the venture capital on the portfolio startups. Below is the weekly update of the portfolio companies:
        ${summaryPrompt}
        Could you please suggest a body text for my newsletter with a separate paragraph for the weekly updates of the portfolio companies? Write in a friendly and welcoming tone.`;
        let completion = await callOpenAI(prompt);
        setWholeEmail(
          wholeEmail + "\n\n\n\n" + completion.data.choices[0].message.content
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      // Consider implementing your own error handling logic here
      console.error(error);
    }
  }

  // input: {Instacart: [], Rippling: []}
  // output: Instacart has tweeted ... Rippling has tweeted ...
  async function summarize(input) {
    let onelineSummary = "";

    const composeParagraph = (companyName) => {
      let oneliner = input[companyName].reduce((prev, curr) => {
        return prev + " " + curr.text;
      }, "");

      return `${companyName} has tweeted the followings. ${oneliner}`;
    };

    setIsSummarizationLoading(true);
    for (const companyName in input) {
      try {
        try {
          // it saved the previous convo between the AI and bot
          const prompt = `We introduce Extreme TLDR generation, a new form of extreme summarization for paragraphs. TLDR generation involves high source compression, removes stop words and summarizes the paragraph whilst retaining meaning. The result is the shortest possible summary that retains all of the original meaning and context of the paragraph. 
          Example
  
          Paragraph: ${composeParagraph(companyName)}
          
          INSERT TEXT TO SUMMARIZE HERE
          
          Extreme TLDR:`;
          const res = await callOpenAI(prompt);
          onelineSummary += res.data.choices[0].message.content + "\n\n";
        } catch (error) {
          // Consider adjusting the error handling logic for your use case
          if (error.response) {
            console.error(error.response.status, error.response.data);
          } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
          }
        }
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
      }
    }

    setIsSummarizationLoading(false);
    return onelineSummary;
  }

  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "Builder DAO";
  });

  return (
    <div>
      <div className="container">
        <Header>
          <Logo src={logo} alt="listening"></Logo>
          {/* <TwitterTimelineEmbed
            sourceType="profile"
            screenName="_chenyuzhang"
            options={{ height: 400, width: 400 }}
          /> */}
          {/* <PortfolioImg src={portfolio1} alt="portfolio"></PortfolioImg>
          <PortfolioImg src={portfolio2} alt="portfolio"></PortfolioImg> */}

          {/* <div>
            <Button
              onClick={() => {
                setShowPortfolios(!showPortfolios);
              }}
            >
              toggle the display of portfolios
            </Button>
          </div> */}
          {/* <PortfolioImg src={portfolio3} alt="portfolio"></PortfolioImg> */}
          {/* {showPortfolios && (
            <TweetsContainer>
              <TwitterTweetEmbed
                tweetId={"1499076368818049025"}
                placeholder={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                // options={{ width: "100%" }}
              />
              <TwitterTweetEmbed
                tweetId={"1602756721243435008"}
                placeholder={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                // options={{ width: "200px" }}
              />
              <TwitterTweetEmbed
                tweetId={"1618672173685821441"}
                placeholder={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                // options={{ width: "200px" }}
              />
              <TwitterTweetEmbed
                tweetId={"1590413388424704000"}

                // options={{ width: "200px" }}
              />
              <TwitterTweetEmbed
                tweetId={"1628092687093207041"}

                // options={{ width: "200px" }}
              />
              <TwitterTweetEmbed
                tweetId={"1417792765782499329"}

                // options={{ width: "200px" }}
              />
              <TwitterTweetEmbed
                tweetId={"1629244892026396672"}

                // options={{ width: "200px" }}
              />
              <TwitterTweetEmbed
                tweetId={"1629232898124529664"}

                // options={{ width: "200px" }}
              />
            </TweetsContainer>
          )} */}

          {/* <h1 style={{ textAlign: "center", marginTop: "80px" }}>
            Companies Where Beta Fellows Are Coming From
          </h1>
          <PortfolioImg src={betaCompanies} alt="portfolio"></PortfolioImg> */}
          {/* <PortfolioImg src={betaPortfolios} alt="portfolio"></PortfolioImg> */}
          {/* <div style={{ marginTop: "30px" }}>
            <h1>
              <mark>Currently Under Maintenance</mark>
            </h1>
          </div> */}
          <div style={{ marginTop: "50px" }}>
            <Step>
              Step 1: choose portfolios (a comma separated list, no space)
            </Step>
          </div>
          <div style={{ margin: "50px 0" }}>
            <TextField
              id="outlined-multiline-static"
              label="Portfolios Twitter Handles"
              multiline
              fullWidth
              rows={4}
              defaultValue="Default Value"
              value={portfolios}
              onChange={(e) => {
                setPortfolios(e.target.value);
              }}
            />
          </div>

          <Step>Step 2: </Step>
          <Button
            disabled={isLoading ? true : false}
            onClick={async () => {
              setIsTwitterLoading(true);
              getRecentTweets(portfolios.split(","))
                .then(async (res) => {
                  const NUMBER_OF_PICKS = 5;
                  const picked = pick(
                    sort(res, sortingCriteria),
                    NUMBER_OF_PICKS
                  );
                  console.log("picked", picked);
                  setPickedTweets(picked);
                  setSelectedTweets(displaySelectedTweets(picked));
                  setIsTwitterLoading(false);
                })
                .catch((err) => {
                  // FIXME: display error message and log it
                  setIsTwitterLoading(false);
                });
              // const summary = await summarize();
              // setSummaryPrompt(summary);
            }}
          >
            pick top 5 tweets
          </Button>

          <PickTweetContainer>
            <Box sx={{ display: "flex" }}>
              <FormControl
                required
                error={error}
                component="fieldset"
                sx={{ m: 3, marginLeft: "0px" }}
                variant="standard"
              >
                <FormLabel component="legend">
                  choose at least one ranking criteria
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sortingCriteria.like_count}
                        onChange={handleChange}
                        name="like_count"
                      />
                    }
                    label="like count"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sortingCriteria.impression_count}
                        onChange={handleChange}
                        name="impression_count"
                      />
                    }
                    label="impression count"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sortingCriteria.quote_count}
                        onChange={handleChange}
                        name="quote_count"
                      />
                    }
                    label="quote count"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sortingCriteria.reply_count}
                        onChange={handleChange}
                        name="reply_count"
                      />
                    }
                    label="reply count"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sortingCriteria.retweet_count}
                        onChange={handleChange}
                        name="retweet_count"
                      />
                    }
                    label="retweet count"
                  />
                </FormGroup>
                {/* <FormHelperText>You haven't picked a criteria yet</FormHelperText> */}
              </FormControl>
            </Box>
            <TweetsContentContainer>
              {isTwitterLoading ? (
                <CircularProgress style={{ marginLeft: "30px" }} />
              ) : (
                <TextField
                  id="outlined-multiline-static"
                  label="Selected Tweets (scroll down)"
                  disabled
                  multiline
                  fullWidth
                  rows={8}
                  defaultValue="Default Value"
                  value={selectedTweets}
                  onChange={(e) => {
                    alert("todo");
                  }}
                />
              )}
            </TweetsContentContainer>
          </PickTweetContainer>

          <br />
          <br />
          <br />

          <Step>Step 3:</Step>
          <Button
            disabled={
              isSummarizationLoading || Object.keys(pickedTweets).length === 0
                ? true
                : false
            }
            onClick={async () => {
              const summary = await summarize(pickedTweets);
              setSummaryPrompt(summary);
            }}
          >
            generate summaries
          </Button>

          <div style={{ margin: "50px 0", minHeight: "220px" }}>
            {isSummarizationLoading ? (
              <CircularProgress style={{ marginLeft: "30px" }} />
            ) : (
              <TextField
                id="outlined-multiline-static"
                label="AI Generated Portfolios Update"
                multiline
                fullWidth
                rows={8}
                defaultValue="Default Value"
                value={summaryPrompt}
                onChange={(e) => {
                  setSummaryPrompt(e.target.value);
                }}
              />
            )}
          </div>

          <Step>Step 4:</Step>
          <Button
            onClick={async () => {
              await generateEmail();
            }}
            disabled={isLoading || !summaryPrompt ? true : false}
          >
            generate a newsletter
          </Button>

          <div
            style={{
              minHeight: "300px",
              marginBottom: "100px",
              marginTop: "50px",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: wholeEmail.trim().replaceAll("\n", "<br />"),
              }}
            />

            {isLoading && <CircularProgress style={{ marginTop: "50px" }} />}
          </div>
        </Header>
      </div>
    </div>
  );
};

export default PortfolioManagement;
