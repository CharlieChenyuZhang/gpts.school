import React, { useEffect } from "react";
import styled from "styled-components";
import icon1 from "../assets/icons8-adjust-48.png";
import icon2 from "../assets/icons8-communication-48.png";
import icon3 from "../assets/icons8-google-translate-48.png";
import thinkdifferent from "../assets/think-different-wallpapers.png";

const WaitListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 7rem;
  padding-bottom: 8rem;
  /* justify-content: center; */
  text-align: center;
  align-items: center;
`;

const ThinkDifferentImg = styled.img`
  width: 100%;
  padding-top: 8rem;
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  /* position: fixed; */
`;

const H1 = styled.h1`
  font-family: "Playlist-Script";
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

const FeatureContainer = styled.div`
  background: linear-gradient(
    355deg,
    rgba(118, 108, 222, 0.08587184873949583) 0%,
    rgba(249, 130, 59, 0.0718662464985994) 57%
  );

  height: 25rem;

  @media only screen and (max-width: 600px) {
    height: auto;
  }
`;

const FeatureInnerContainer = styled.div`
  display: flex;
  height: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const SocialContainer = styled.div`
  height: 20rem;

  line-height: 1.25;
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const LeftFeatureDescription = styled.div`
  /* width: 20%; */
  max-width: 300px;
  margin: auto;
  text-align: center;
  line-height: 1.25;
  font-weight: 600;
  font-size: 1.5rem;

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

const SubCaption = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 1.1rem;
`;

const VideoContainer = styled.div`
  margin-top: 34px;
  width: 100%;
`;

const LandingPage = () => {
  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "learn with GPTs";
  });

  return (
    <div>
      <div className="container">
        <WaitListContainer>
          <H1>gpts.school</H1>
          <SecondPhrase>Revolutionizing Education</SecondPhrase>
          {/* An AI Agent dedicated to fostering personalized learning journeys, beginning with Computer Science literacy and preparation for software engineering coding interviews. */}
          <Button href="https://forms.gle/L9furstJv692J8Rf7" target="_blank">
            join waitlist
          </Button>
          {/* embeded youtube video */}
          <VideoContainer>
            <iframe
              // width="560"
              // height="315"
              style={{
                maxWidth: "560px",
                width: "100%",
                height: "100%",
              }}
              src="https://www.youtube.com/embed/hELcVJdsL0U?si=1WHQt8b8yk7z7clS"
              title="GPTS.school think different"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </VideoContainer>
        </WaitListContainer>
      </div>
      <FeatureContainer>
        <FeatureInnerContainer className="container">
          <LeftFeatureDescription>
            <div>
              <Icon src={icon2}></Icon>
            </div>
            AI-Powered Education Tool
            <SubCaption>
              Unlock success in tech interviews with an AI-powered tool that
              enhances your practice efficiency in coding questions, paving the
              way for remarkable performance.
            </SubCaption>
          </LeftFeatureDescription>

          <LeftFeatureDescription>
            <div>
              <Icon src={icon1}></Icon>
            </div>
            Personalized AI Agent
            <SubCaption>
              Experience a bespoke learning journey with an AI Agent and Study
              Buddy that seamlessly adapts to your learning habits, ensuring
              accelerated mastery over any subject.
            </SubCaption>
          </LeftFeatureDescription>
          <LeftFeatureDescription>
            <div>
              <Icon src={icon3}></Icon>
            </div>
            Mastering CS & AI Literacy
            <SubCaption>
              Commandeer your success in tech with a tool specifically crafted
              to bolster your literacy in pivotal domains such as Computer
              Science and Artificial Intelligence.
            </SubCaption>
          </LeftFeatureDescription>
        </FeatureInnerContainer>
      </FeatureContainer>
      <ThinkDifferentImg
        src={thinkdifferent}
        alt="think different"
      ></ThinkDifferentImg>
      <SocialContainer>
        Join us now, and get ready to revolutionize the way we learn!
        <Button href="https://forms.gle/L9furstJv692J8Rf7" target="_blank">
          join waitlist
        </Button>
      </SocialContainer>
    </div>
  );
};

export default LandingPage;
