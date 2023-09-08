import { useState } from "react";

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styled from "styled-components";
import photos from "./photos";
import ResponsiveApBar from "./ResponsiveAppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Configuration, OpenAIApi } from "openai";
import TextField from "@mui/material/TextField";

const slides = photos.map(({ src, width, height, images }) => ({
  src,
  width,
  height,
  srcSet: images.map((image) => ({
    src: image.src,
    width: image.width,
    height: image.height,
  })),
}));

const MainContainer = styled.div`
  background-color: #27272a;
  height: 100%;
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ValidationTextField = styled(TextField)({
  color: "white",
});

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_MIRACLEPLUS_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function TextToImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [userBackgroundInformation, setUserBackgroundInformation] =
    useState("");
  const [index, setIndex] = useState(-1);
  const [imageCount, setImageCount] = useState(photos.length);

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
        const prompt = `Act as my co-founder. Your task is to generate a business plan for the startup based on my background information. The business plan should include an idea name, a short one liner, why me, target user persona, user's pain points to solve, main value propositions, sales &amp; marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. 

        Background information: ${userBackgroundInformation} 
        
        """ 
        
        Write the result in a markdown table.`;
        let completion = await callOpenAI(prompt);

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

  return (
    <MainContainer>
      {/* <ResponsiveApBar></ResponsiveApBar> */}
      <HeaderContainer>
        <Typography
          variant="h1"
          fontSize="5.2rem"
          marginTop="128px"
          noWrap
          component="div"
          sx={{
            fontFamily: "Roboto",
            color: "white",
            textDecoration: "none",
          }}
        >
          MiraclePlus Copilot
        </Typography>
        <Typography
          variant="h5"
          fontSize="1.2rem"
          component="div"
          sx={{
            mr: 2,
            fontFamily: "Roboto",
            color: "white",
            textDecoration: "none",
            margin: "0 20px",
            textAlign: "center",
          }}
        >
          The easiest way to match what you can, what you want and what the
          world needs.
        </Typography>

        <ValidationTextField
          id="outlined-multiline-static"
          label="your backgorund information"
          multiline
          fullWidth
          rows={8}
          defaultValue="Default Value"
          value={userBackgroundInformation}
          onChange={(e) => {
            setUserBackgroundInformation(e.target.value);
          }}
        />
      </HeaderContainer>
    </MainContainer>
  );
}
