import React, { useEffect } from "react";
import styled from "styled-components";
// import logo from "../assets/chenyu-cali.png";
// import logo from "../assets/gptsschool-logo2.png";
// import logo from "../assets/gptsschool-svg.svg";
// import logo from "../assets/gptsschool-noeffect.svg";
import icon1 from "../assets/icons8-adjust-48.png";
import icon2 from "../assets/icons8-communication-48.png";
import icon3 from "../assets/icons8-google-translate-48.png";

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
const RightContainer = styled.div`
  width: 50%;
  background-color: #fbfcfc;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const RightFeatureContainer = styled.div`
  width: 80%;
`;

const LandingPage = () => {
  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "Virtual Language Tutor";
  });

  return (
    <div>
      <div className="container">
        {/* <Header>
          <Logo src={logo} alt="listening"></Logo>
        </Header> */}

        <WaitListContainer>
          <H1>gpts.school</H1>
          <SecondPhrase>
            One Mentor, One Student: A New Paradigm for Equitable AI and CS
            Education
          </SecondPhrase>
          <Button href="https://forms.gle/L9furstJv692J8Rf7" target="_blank">
            join waitlist
          </Button>
        </WaitListContainer>
        {/* <RightContainer>
        <InteractiveUI />
      </RightContainer> */}
      </div>
      <FeatureContainer>
        <FeatureInnerContainer className="container">
          <LeftFeatureDescription>
            <div>
              <Icon src={icon1}></Icon>
            </div>
            Oral Skills
            <SubCaption>
              Our AI tunes to your accent, improving your spoken skills through
              real-time chats. Ideal for non-natives.
            </SubCaption>
          </LeftFeatureDescription>

          <LeftFeatureDescription>
            <div>
              <Icon src={icon2}></Icon>
            </div>
            Coding Skills
            <SubCaption>
              Custom exercises and guides refine your coding and algorithm
              skills, prepping you for tech interviews.
            </SubCaption>
          </LeftFeatureDescription>
          <LeftFeatureDescription>
            <div>
              <Icon src={icon3}></Icon>
            </div>
            Academic Skills
            <SubCaption>
              24/7 AI answers course-based questions and a dashboard reveals
              classroom gaps for teachers.
            </SubCaption>
          </LeftFeatureDescription>

          {/* <RightFeatureContainer>card view</RightFeatureContainer> */}
        </FeatureInnerContainer>
      </FeatureContainer>
      <SocialContainer>
        Join now and get ready to revolutionize the way you learn!
        <Button href="https://forms.gle/L9furstJv692J8Rf7" target="_blank">
          join waitlist
        </Button>
      </SocialContainer>
    </div>
  );
};

export default LandingPage;
