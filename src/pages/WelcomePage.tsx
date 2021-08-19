import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import CustomModal from "../components/CustomModal";
import NavBar from "../components/NavBar";
import ModalWelcomeContent from "../components/ModalWelcomeContent";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import { ACButton, ACInput, ComingSoon } from "../components/styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { trackAction } from "../queries/tracking";
import { getUtm } from "../utils";

export default function WelcomePage() {
  const userAgent = navigator.userAgent;
  const { user, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>("");
  const [modal, setModal] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    ) {
      setModal("mobileDetected");
    }
  };

  useEffect(() => {
    isMobile();
    const guest = localStorage.getItem("ac-guest-name");
    if (guest) {
      setInputValue(guest);
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    if (!isLoading) {
      const currentUtm = getUtm(location.search);
      const guest = localStorage.getItem("ac-guest-name");
      const visit = {
        action: "visit-landing",
        ...(user?.sub ? { auth_id: user.sub } : {}),
        ...(currentUtm ? { utm: currentUtm } : {}),
        ...(guest ? { guest_name: guest } : {}),
        ...(userAgent ? { user_agent: userAgent } : {}),
      };
      trackAction(visit);
    }
  }, [isLoading]); //eslint-disable-line

  const goToPlay = () => {
    if (inputValue !== "") {
      localStorage.setItem("ac-guest-name", inputValue);
      const currentUtm = getUtm(location.search);
      trackAction({
        action: "play-as-guest-button",
        guest_name: inputValue,
        ...(user?.sub ? { auth_id: user.sub } : {}),
        ...(userAgent ? { user_agent: userAgent } : {}),
        ...(currentUtm ? { utm: currentUtm } : {}),
      });
      history.push(`/play`);
      setInputValue("");
    } else setShowErrorMessage(true);
  };

  const onKeyDownFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToPlay();
    }
  };

  return (
    <Wrapper>
      <NavBar
        isHome={true}
        isAuthenticated={isAuthenticated}
        username={user && user.given_name && user.given_name}
        auth_id={user && user.sub && user.sub}
        picture={user && user.picture && user.picture}
      />
      <Title>Welcome to Animal Cardom!</Title>
      {modal && (
        <CustomModal closeModal={() => setModal("")}>
          <ModalWelcomeContent modal={modal} />
        </CustomModal>
      )}
      <Container>
        {showErrorMessage && (
          <ErrorMessage>
            Nameless people are not allowed in Animal Cardom!
          </ErrorMessage>
        )}
        <ACInput
          type="text"
          placeholder="Enter your name to play as guest"
          value={inputValue}
          onChange={(e) =>
            e.target.value.length < 8 && setInputValue(e.target.value)
          }
          onKeyDown={onKeyDownFn}
        />
        <ACButton fWeight="bold" onClick={goToPlay}>
          Play as guest
        </ACButton>
        <ACButton disabled fWeight="bold" onClick={() => {}}>
          <ComingSoon>Coming soon!</ComingSoon>
          PvP
        </ACButton>
        <ACButton onClick={() => setModal("rules")}>Rules</ACButton>
        <ACButton onClick={() => setModal("terrains")}>See Terrains</ACButton>
      </Container>
    </Wrapper>
  );
}

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary_red};
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  top: 60px;
`;
const Wrapper = styled.div`
  align-items: center;
  background-image: url(/images/welcome-background.png);
  background-repeat: round;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
  @media (${SMALL_RESPONSIVE_BREAK}) {
  }
`;
const Title = styled.h4`
  font-size: 30px;
  text-align: center;
  padding-top: 60px;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    margin-bottom: 5px;
    font-size: 24px;
  }
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: space-around;
  margin: auto;
  position: relative;
  width: 40%;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    height: 65vh;
    width: 60%;
  }
`;
