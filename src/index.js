import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LandingPage from "./components/LandingPage";
import TextToImage from "./components/TextToImage";
import MiraclePlusCopilot2 from "./components/MiraclePlusCopilot2";
// import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Huggingface from "./Huggingface";
import PortfolioManagementChatGPT from "./components/PortfolioManagementChatGPT";
import PortfolioManagementDAO from "./components/PortfolioManagementDAO";
import EmailCompose from "./components/EmailCompose";
// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/mobius",
    element: <TextToImage />,
  },
  {
    path: "/miracleplus",
    element: <MiraclePlusCopilot2 />,
  },
  // deployed the portfolio management for beta fellowship
  {
    path: "/beta-fellowship",
    element: <PortfolioManagementChatGPT />,
  },
  {
    path: "/dao",
    element: <PortfolioManagementDAO />,
  },
  // deployed the email composing feature for trusli
  {
    path: "/email",
    element: <EmailCompose />,
  },
  {
    path: "/gpt",
    element: <App />,
  },
  {
    path: "/chinese-huggingface",
    element: <Huggingface />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
