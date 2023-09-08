import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InteractiveUI from "./InteractiveUI";
import logo from "../assets/miracleplus-logo.png";
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
  width: 20rem;
  height: 5rem;
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

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_MIRACLEPLUS_API_KEY,
});

const openai = new OpenAIApi(configuration);

const MiraclePlusCopilot2 = () => {
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
  const [portfolios, setPortfolios] = useState(
    "I am a master's degree candidate in Computer Science at Peking University. I am interested in social network and want to build something related to the virtual networking platform. "
  );
  // const [showPortfolios, setShowPortfolios] = useState(false);
  const [wholeEmail, setWholeEmail] = useState("");
  const [ideas, setIdeas] = useState(""); // FIXME: update the ideas once I fetch the data from twitter
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

  // input: {Instacart: [], Rippling: []}
  // output: Instacart has tweeted ... Rippling has tweeted ...
  async function generateIdeas() {
    let onelineSummary;
    setIsLoading(true);
    try {
      // it saved the previous convo between the AI and bot
      const prompt = `Act as my co-founder. Your task is to generate a business plan for the startup based on my background information. The business plan should include an idea name, a short one liner, why me, target user persona, user's pain points to solve, main value propositions, sales &amp; marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. 

          Background information: ${portfolios} 
          
          """ 
          
          Write the result in a html table.`;
      const res = await callOpenAI(prompt);
      onelineSummary = res.data.choices[0].message.content;
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }

    setIsLoading(false);
    return onelineSummary;
  }

  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "MiraclePlus Copilot";
  });

  return (
    <div>
      <div className="container">
        <Header>
          <Logo src={logo} alt="listening"></Logo>

          <div style={{ marginTop: "50px" }}>
            The easiest way to match what you can, what you want and what the
            world needs.
          </div>
          <div style={{ margin: "50px 0" }}>
            <TextField
              id="outlined-multiline-static"
              label="introduce yourself"
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

          <Button
            disabled={isLoading ? true : false}
            onClick={async () => {
              const ideas = await generateIdeas();
              setIdeas(ideas);
            }}
          >
            generate ideas
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
                __html: ideas,
              }}
            />

            {isLoading && <CircularProgress style={{ marginTop: "50px" }} />}
          </div>
        </Header>
      </div>
    </div>
  );
};

export default MiraclePlusCopilot2;
