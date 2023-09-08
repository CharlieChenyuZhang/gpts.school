import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import GifIcon from "@mui/icons-material/Gif";
import PetsIcon from "@mui/icons-material/Pets";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import Person3Icon from "@mui/icons-material/Person3";
import avatar from "../avatar-ai.png";
import listeningGif from "../assets/cat-listening.gif";
import talkingGif from "../assets/cat-talking3.gif";
import idlingGif from "../assets/cat-waiting.gif";
import thinkingGIf from "../assets/cat-thinking.gif";

export default function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(2);
  const { listening, convoStart, chatGptRes } = props;

  const selectState = () => {
    // console.log("listening", listening);
    // console.log("convoStart", convoStart);
    const STATE_USER_SPEAKING = listening;
    const STATE_AI_SPEAKING = !listening && convoStart && !!chatGptRes; // FIXME: not good enough
    const STATE_NOONE_SPEAKING = !convoStart;
    const STATE_NOONE_SPEAKING_AI_THINKING =
      convoStart && !listening && !chatGptRes;
    // STATE: when uesr is talking
    if (STATE_USER_SPEAKING) {
      return (
        <img
          src={listeningGif}
          alt="listening"
          style={{ width: "300px", height: "300px" }}
        ></img>
      );
    }

    // STATE: when AI is speaking
    if (STATE_AI_SPEAKING) {
      return (
        <img
          alt="AI speaking"
          src={talkingGif}
          style={{ width: "300px", height: "250px" }}
        ></img>
      );
    }

    if (STATE_NOONE_SPEAKING_AI_THINKING) {
      return (
        <img
          alt="AI thinking"
          src={thinkingGIf}
          style={{ width: "300px", height: "300px" }}
        ></img>
      );
    }
    // default - STATE_NOONE_SPEAKING
    return (
      <img
        alt="idling"
        src={idlingGif}
        style={{ width: "300px", height: "300px" }}
      ></img>
    );
  };

  const selectCharacter = () => {
    switch (value) {
      case 0:
        return null;
        break;
      case 1:
        return selectState();
        break;
      case 2:
        return (
          <img
            alt="Virtual Being"
            src={avatar}
            style={{ width: "300px", height: "400px" }}
          ></img>
        );
        break;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      {/* <BottomNavigation
        sx={{
          bgcolor: "#ece3ce",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="speech only"
          icon={<PhoneEnabledIcon />}
        />
        <BottomNavigationAction label="meme" icon={<PetsIcon />} />
        <BottomNavigationAction
          label="virtual being - WIP"
          icon={<Person3Icon />}
        />
      </BottomNavigation> */}
      {selectCharacter()}
    </Box>
  );
}
