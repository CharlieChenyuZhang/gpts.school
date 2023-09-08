import React, { useEffect, useInsertionEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Configuration, OpenAIApi } from "openai";
import Speech from "speak-tts";
// import recordBtn from "./record-btn.png";
import avatar from "../avatar-ai.png";
import listeningGif from "../assets/cat-listening.gif";
import Character from "./Character";
import styled from "styled-components";

// TODO: introducing three states. Listening; Speaking; Idling

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_MIRACLEPLUS_API_KEY,
});

const openai = new OpenAIApi(configuration);

const BetterUI = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [savedUserInput, setSavedUserInput] = useState("");
  const [chatGptRes, setChatGptRes] = useState("");
  const [speech, setSpeech] = useState();
  const [convoStart, setConvoStart] = useState(false);

  useEffect(() => {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: "en-GB",
        rate: 1,
        pitch: 1,
        voice: "Google UK English Female",
        splitSentences: true,
      })
      .then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
        setSpeech(speech);
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });
  }, []);

  const talk = (what2say) => {
    speech
      .speak({
        text: what2say,
        queue: false, // current speech will be interrupted,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: (event) => {
            console.log(
              event.name +
                " boundary reached after " +
                event.elapsedTime +
                " milliseconds."
            );
          },
        },
      })
      .then(() => {
        // if everyting went well, start listening again
        console.log("Success !");
        userStartConvo();
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  };

  const attemp1 = ". At the end, try your best to engage in the conversation.";
  const attemp2 =
    ". At the end, ask a follow up question when appropriate to keep the conversation going.";

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

  async function onSubmit() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: savedUserInput + ". " + transcript + attemp2,
          temperature: 0.6,
          max_tokens: 200, // FIXME: 2048
        });
        const what2say = completion.data.choices[0].text;
        setSavedUserInput(savedUserInput + ". " + transcript + ". " + what2say); // updated the savedUserInput so that it can connect the previous convo
        setChatGptRes(what2say);
        talk(what2say);
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

  useEffect(() => {
    if (!listening && transcript) {
      (async () => {
        await onSubmit();
      })();
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Microphone is not available.</span>;
  }

  const resetEverything = () => {
    resetTranscript();
    setChatGptRes("");
    setSavedUserInput("");
  };

  const userStartConvo = () => {
    SpeechRecognition.startListening();
    resetEverything();
    if (!convoStart) {
      setConvoStart(true);
    }
  };

  const displayStatusText = () => {
    // state management
    const STATE_USER_SPEAKING = listening;
    const STATE_AI_SPEAKING = !listening && convoStart && !!chatGptRes; // FIXME: not good enough
    const STATE_NOONE_SPEAKING = !convoStart;
    const STATE_NOONE_SPEAKING_AI_THINKING =
      convoStart && !listening && !chatGptRes;

    let statusText = "";
    if (STATE_USER_SPEAKING) {
      statusText = "go ahead, I am listening...";
    } else if (STATE_AI_SPEAKING) {
      statusText = "ChenYu's speaking...";
    } else if (STATE_NOONE_SPEAKING_AI_THINKING) {
      statusText = "One second, let me think about it...";
    }

    return (
      <p
        style={{
          color: "black",
          backgroundColor: "inherit",
        }}
      >
        <mark
          style={{
            backgroundColor: "inherit",
          }}
        >
          {statusText}
        </mark>
      </p>
    );
  };

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      {/* <span>push to talk: </span> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Character
          chatGptRes={chatGptRes}
          listening={listening}
          convoStart={convoStart}
        ></Character>
      </div>
      {!convoStart ? (
        <Button
          id="start-btn"
          onClick={userStartConvo}
          style={{ hover: "cursor" }}
        >
          click me to talk
        </Button>
      ) : (
        <Button
          onClick={() => {
            speech?.cancel();
            resetEverything();
            SpeechRecognition.stopListening();
            if (convoStart) {
              setConvoStart(false);
            }
          }}
        >
          end the conversation
        </Button>
      )}

      {displayStatusText()}
      <hr></hr>

      <p style={{ width: "80%", margin: "auto" }}>{transcript}</p>
      <p style={{ color: "orange", width: "80%", margin: "auto" }}>
        {chatGptRes}
      </p>
    </div>
  );
};

export default BetterUI;
