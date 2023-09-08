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

export default function TextToImage() {
  const [index, setIndex] = useState(-1);
  const [imageCount, setImageCount] = useState(photos.length);
  return (
    <MainContainer>
      <ResponsiveApBar></ResponsiveApBar>
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
          MOBIUS
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
          unprecedented photorealism x deep level of language understanding
        </Typography>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "80%",
            maxWidth: "600px",
            borderRadius: "100px",
            marginTop: "32px",
            marginBottom: "64px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="A cute corgi lives in a house of sushi..."
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => {
              setImageCount(4);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Paper>
      </HeaderContainer>
      <PhotoAlbum
        photos={photos.slice(0, imageCount)}
        layout="rows"
        targetRowHeight={200}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </MainContainer>
  );
}
