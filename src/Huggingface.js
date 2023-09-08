import Typewriter from "typewriter-effect";
import icon from "./assets/chenyu-icon.png";
import twitter from "./assets/twitter-icon.png";
import styled from "styled-components";
import React, { useEffect } from "react";

const Icon = styled.img`
  width: 10rem;
  height: 10rem;
`;

const Twitter = styled.img`
  width: 3rem;
  height: 3rem;

  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  text-align: center;
  padding-top: 11rem;
  margin-left: 3rem;
  margin-right: 3rem;
`;

const CatchPhrase1 = styled.h1`
  font-size: 2.75rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CatchPhrase2 = styled.h2`
  font-size: 1.75rem;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Huggingface = () => {
  useEffect(() => {
    document.getElementsByTagName("title")[0].text =
      "晨雨 - 中国的Hugging Face";
  });

  return (
    <Container>
      <Icon src={icon}></Icon>
      <div>
        {/* <Typewriter
            options={{
              strings: ["社群", "企业"],
              autoStart: true,
              loop: true,
              deleteSpeed: 1,
              wrapperClassName: "typewriter",
            }}
          /> */}
        <CatchPhrase1>晨雨 - 打造中国的Hugging Face</CatchPhrase1>
        <CatchPhrase1>如清晨细雨, 滋养中国乃至全球的AI社群</CatchPhrase1>

        <CatchPhrase2>
          以开源社群为驱动来源，构建、训练和部署最先进的人工智能模型
        </CatchPhrase2>

        <a
          href="https://twitter.com/_chenyuzhang"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter src={twitter}></Twitter>
        </a>
      </div>
    </Container>
  );
};

export default Huggingface;
