import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Configuration, OpenAIApi } from "openai";
import Speech from "speak-tts";

const configuration = new Configuration({
  // FIXME:
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [chatGptRes, setChatGptRes] = useState("");
  const [speech, setSpeech] = useState();

  useEffect(() => {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: "en-GB",
        rate: 1,
        pitch: 1,
        voice: "Google UK English Male",
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
      })
      .then(() => {
        console.log("Success !");
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  };

  async function onSubmit() {
    try {
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: transcript,
          temperature: 0.6,
          max_tokens: 2000,
        });
        console.log("completion.data", completion.data);
        const what2say = completion.data.choices[0].text;
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
      console.log("catch");
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
  };

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <span>microphone: </span>
      <button
        onClick={() => {
          SpeechRecognition.startListening();
          resetEverything();
        }}
      >
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetEverything}>Reset</button>
      <p>{transcript}</p>
      {/* <button onClick={speech?.pause}>Pause</button>
      <button onClick={speech?.resume}>Resume</button> */}
      <span>speech: </span>
      <button onClick={speech?.cancel}>Cancel</button>

      <p style={{ color: "orange" }}>{chatGptRes}</p>
    </div>
  );
};

export default Dictaphone;
