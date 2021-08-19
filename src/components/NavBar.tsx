import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogButton } from "../components/styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import { trackAction } from "../queries/tracking";
import { getUtm } from "../utils";

interface IProps {
  isAuthenticated: boolean;
  username?: string;
  auth_id?: string;
  picture?: string;
  isHome?: boolean;
}

export default function NavBar({
  auth_id,
  isAuthenticated,
  isHome,
  picture,
  username,
}: IProps) {
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const location = useLocation();

  const [soundState, setSoundState] = useState<"off" | "on">("on");

  useEffect(() => {
    const currentSoundState = localStorage.getItem("sound");
    if (
      currentSoundState &&
      (currentSoundState === "off" || currentSoundState === "on")
    ) {
      setSoundState(currentSoundState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sound", soundState);
  }, [soundState]);

  const handleSoundButton = () => {
    const soundToSet = soundState === "off" ? "on" : "off";
    setSoundState(soundToSet);
  };

  const handleLogin = () => {
    const guest = localStorage.getItem("ac-guest-name");
    const currentUtm = getUtm(location.search);
    const visit = {
      ...(auth_id ? { auth_id } : {}),
      ...(currentUtm ? { utm: currentUtm } : {}),
      ...(guest ? { guest_name: guest } : {}),
    };
    if (isAuthenticated && username) {
      trackAction({
        ...visit,
        action: "you-are-allowed-button",
      });
      history.push("/menu");
    } else {
      trackAction({
        ...visit,
        action: "sign-in-button",
      });
      loginWithRedirect();
    }
  };

  return (
    <Wrapper>
      <Container>
        {isHome && (
          <FeedbackButton>
            <Link to="give-feedback">Give Feedback</Link>
          </FeedbackButton>
        )}

        <OptionButton onClick={handleSoundButton}>
          <img
            alt="sound-button"
            src={`/icons/sound-${soundState}-icon.png`}
            width={35}
          />
        </OptionButton>
        <Link className="logo-link" to="/">
          <img alt="ac-logo" src="/images/animal-cardom-logo.png" width={60} />
        </Link>
        <LogButton onClick={handleLogin} overflow="visible">
          {isAuthenticated && username && picture ? (
            <>
              <UserImage src={picture} alt={username} />
              <span>
                You are allowed, <b>{username}!</b>
              </span>
            </>
          ) : (
            <span>
              Sign in with <b>Google</b>
            </span>
          )}
        </LogButton>
      </Container>
    </Wrapper>
  );
}

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: Absolute;
  right: -18px;
  top: calc(50% - 18px);
`;
const OptionButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
  > .logo-link {
    height: 100%;
    > img {
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    > .logo-link {
      > img {
        display: none;
      }
    }
  }
`;
const Wrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3),
    inset 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  height: 70px;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;
const FeedbackButton = styled.button`
  background: ${({ theme }) => theme.primary_brown};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-top: 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-weight: bold;
  padding: 5px 10px;
  position: absolute;
  left: -2px;
  top: calc(100% + 2px);
  > a {
    text-decoration: none;
    color: #000;
  }
`;
