import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dictaphone from "./components/Dictaphone";
import BetterUI from "./components/BetterUI";
import InteractiveUI from "./components/InteractiveUI";
// import Test from "./components/Test";

function App() {
  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "ConverGPT";
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <h1>Virtual Being - ChenYu = ChatGPT + Conversational UI </h1>
        <p>
          designed with &#10084;&#65039; by{" "}
          <a
            href="https://www.linkedin.com/in/charliechenyuzhang/"
            target="_blank"
          >
            Charlie
          </a>
        </p>
        <i>
          currently only support Chrome web browser, and English. More features
          coming soon.
        </i> */}

        {/* <Dictaphone /> */}
        {/* <BetterUI /> */}
        <InteractiveUI />
        {/* <Test></Test> */}
      </header>
    </div>
  );
}

export default App;
