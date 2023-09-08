import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InteractiveUI from "./InteractiveUI";
import logo from "../assets/trusli-icon.png";
import icon1 from "../assets/icons8-adjust-48.png";
import icon2 from "../assets/icons8-communication-48.png";
import icon3 from "../assets/icons8-google-translate-48.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Configuration, OpenAIApi } from "openai";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 7rem;
  padding-bottom: 8rem;
  /* justify-content: center; */
  text-align: left;
  align-items: center;
`;

const Header = styled.div`
  margin-top: 3rem;
`;

const Logo = styled.img`
  width: 6rem;
  height: 4rem;
  /* position: fixed; */
`;

const H1 = styled.h1`
  font-size: 3.75rem;
  line-height: 1;
  font-weight: 700;
`;
const SecondPhrase = styled.p`
  margin-top: 1.5rem;
  /* max-width: 28rem; */
  font-size: 1.125rem;
  line-height: 1.75rem;
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

  background-image: linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  );

  :hover {
    background-position: right center;
    text-decoration: none;
  }
`;

const Category = styled.div`
  margin-top: 15px;
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const EmailCompose = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [argument1, setArgument1] = useState(
    "We have researched comparable suppliers and offerings. We are wondering whether we can get a 40% discount?"
  );
  const [argument2, setArgument2] = useState(
    "If we buy more than 10 licenses, can we get a further volume discount?"
  );
  const [argument3, setArgument3] = useState(
    "Can we have a payment term of 90 days?"
  );

  const [wholeEmail, setWholeEmail] = useState("");

  const template = `
      Hi ${supplierName ? supplierName : "[supplier_first_name]"}, <br />
      <br />
      Thanks for sending us quote. We reviewed and have a few suggestions.
      <ol>
        <li>
          We have researched comparable suppliers and offerings. We are
          wondering whether we can get a 40% discount?
        </li>
        <li>
          If we buy more than 10 licenses, can we get a further volume discount?
        </li>
        <li>Would you be open to waive the support and maintenance fee? </li>
        <li>Can we have a payment term of 90 days? </li>
        <li>Can you also delete the auto renewal provision? </li>
        <li>
          We would like to be able to cancel this purchase when we want to. Can
          we include this as part of the terms?
        </li>
      </ol>
      Here at Trusli, we consider our suppliers as strategic partners. We are
      trying our best to find a win-win for us. We appreciate your flexibility
      and hope this will become a long term, beneficial account for you.
      <br />
      <br />
      Best,
      <br />
      <br />
      ${senderName ? senderName : "[sender_first_name]"}`;

  async function onSubmit() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        setIsLoading(true);
        let completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Help me polish the following email. Please use a polite and professional tone throughout the email to argue for a better deal.  Keep the number the same. Follow the email structure with HTML code to showcase line break. ${template}`, // FIXME:
          temperature: 0.7,
          max_tokens: 2000,
        });
        setWholeEmail(completion.data.choices[0].text);

        // completion = await openai.createCompletion({
        //   model: "text-davinci-003",
        //   prompt: `Write me a similar email to the following one. Keep the number the same. ${argument1}`, // FIXME:
        //   temperature: 0.8,
        //   // max_tokens: 200,
        // });
        // setArgument1(completion.data.choices[0].text);

        // completion = await openai.createCompletion({
        //   model: "text-davinci-003",
        //   prompt: `Write me asentence similar to the following one. Keep the number the same. ${argument2}`, // FIXME:
        //   temperature: 0.6,
        //   // max_tokens: 200,
        // });
        // setArgument2(completion.data.choices[0].text);

        // completion = await openai.createCompletion({
        //   model: "text-davinci-003",
        //   prompt: `Write me asentence similar to the following one. Keep the number the same. ${argument3}`, // FIXME:
        //   temperature: 0.6,
        //   // max_tokens: 200,
        // });
        // setArgument3(completion.data.choices[0].text);
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

  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "Trusli - Email Composer";
  });

  return (
    <div>
      <div className="container">
        <Header>
          <Logo src={logo} alt="listening"></Logo>
        </Header>

        <InputContainer>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="sender's first name"
              variant="standard"
              onChange={(e) => {
                setSenderName(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", marginTop: "15px" }}
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="supplier's first name"
              variant="standard"
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Category>Category: Software</Category>
          </Box>
          <Button
            onClick={async () => {
              await onSubmit();
              setIsLoading(false);
            }}
          >
            generate new
          </Button>
          {/* {!isLoading ? (
            <div>
              Hi {supplierName},
              <br />
              <br />
              Thanks for sending us quote. We reviewed and have a few
              suggestions.
              <br />
              <ol>
                <li>{argument1}</li>
                <li>{argument2}</li>
                <li>{argument3}</li>
              </ol>
              Here at Trusli, we consider our suppliers as strategic partners.
              We are trying our best to find a win-win for us. We appreciate
              your flexibility and hope this will become a long term, beneficial
              account for you.
              <br />
              <br />
              Best,
              <br />
              <br />
              {senderName}
            </div>
          ) : (
            <CircularProgress style={{ marginTop: "50px" }} />
          )} */}
          <h4 style={{ marginTop: "40px" }}>Original Template:</h4>
          <div dangerouslySetInnerHTML={{ __html: template }} />

          <h4 style={{ marginTop: "40px" }}>ChatGPT Polished Email:</h4>
          {!isLoading ? (
            <div dangerouslySetInnerHTML={{ __html: wholeEmail }} />
          ) : (
            <CircularProgress style={{ marginTop: "50px" }} />
          )}
        </InputContainer>
      </div>
    </div>
  );
};

export default EmailCompose;
