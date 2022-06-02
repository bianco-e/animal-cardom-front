import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { ACButton, LogButton } from "../components/styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import AnimatedPlaceholder from "./AnimatedPlaceholder";
import { getCurrentSection } from "../utils";
import { BREAKPOINTS } from "../utils/constants";

interface IProps {
  avatar: string;
  username: string;
}

export default function SideMenu({ avatar, username }: IProps) {
  const [currentSection, setCurrentSection] = useState<string>();
  const [menuWidth, setMenuWidth] = useState<string>("210px");
  const { logout } = useAuth0();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setCurrentSection(getCurrentSection(location.pathname));
  }, [location.pathname]);
  const buttonsData = [
    {
      title: "Menu",
      fn: () => history.push("/menu"),
    },
    {
      title: "Profile",
      fn: () => history.push("/profile"),
    },
    {
      title: "Collection",
      fn: () => history.push("/collection"),
    },
    {
      title: "Campaign",
      fn: () => history.push("/campaign"),
    },
  ];
  const handleLogout = () => logout({ returnTo: window.location.origin });
  const hideSideMenu = () => {
    setMenuWidth(menuWidth === "1px" ? "210px" : "1px");
  };

  return (
    <Wrapper width={menuWidth}>
      <CloseButton
        className="close-button"
        onClick={hideSideMenu}
        rotate={menuWidth === "1px" ? "270deg" : "90deg"}
      >
        <svg x="0px" y="0px" width={30} height={30} viewBox="0 0 960 560">
          <path
            d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
                c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
                c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
          />
        </svg>
      </CloseButton>
      <img
        className="logo"
        alt="animal-cardom"
        src="/images/animal-cardom-logo.png"
        width={60}
        onClick={() => history.push("/")}
      />
      {username ? (
        <UserInfoContainer>
          <img className="avatar" alt={username} src={avatar} />
          <span>
            <b>{username}</b>
          </span>
        </UserInfoContainer>
      ) : (
        <AnimatedPlaceholder />
      )}
      {buttonsData.map(({ title, fn }, idx) => {
        const isSelected = currentSection === title;
        return (
          <ACButton
            className={`menu-button-${idx}`}
            key={title}
            fWeight="bold"
            onClick={fn}
            selected={isSelected}
          >
            {title}
          </ACButton>
        );
      })}
      {/*  <ACButton disabled fWeight="bold">
        <ComingSoon>Coming soon!</ComingSoon>
        PvP
      </ACButton> */}
      <LogButton onClick={handleLogout}>Log out</LogButton>
    </Wrapper>
  );
}

interface WrapperProps {
  width?: string;
}

interface CloseButtonProps {
  rotate?: string;
}

const UserInfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  > .avatar {
    border-radius: 50%;
    height: 40px;
    margin-bottom: 5px;
    width: 40px;
  }
  > span {
    font-size: 20px;
    ${BREAKPOINTS.MOBILE} {
      display: none;
    }
  }
`;

const CloseButton = styled.div`
  display: none;
  ${BREAKPOINTS.MOBILE} {
    background: #f4e4bc;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    position: absolute;
    right: -14px;
    top: 15px;
    width: 18px;
    > svg {
      transition: all 0.4s ease;
      transform: rotate(${(p: CloseButtonProps) => p.rotate});
    }
  }
`;

const Wrapper = styled.div`
  align-items: center;
  background: #f4e4bc;
  box-shadow: 0 0 5px 5px rgba(95, 57, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  left: 0;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 250px;
  z-index: 5;

  > .logo {
    cursor: pointer;
    margin-top: 60px;
  }
  > button {
    &:last-child {
      margin-bottom: 60px;
    }
  }
  ${BREAKPOINTS.MOBILE} {
    transition: all 0.4s ease;
    width: ${(p: WrapperProps) => p.width};
    ${(p: WrapperProps) =>
      p.width === "1px"
        ? `
          padding: 0 3px;
          button, img {
            display: none;
          }
          > .close-button {
            display: flex;
          }
          `
        : `> img {
          display: none;
          }
          > .menu-button-0 {
            margin-top: 15px;
          }
          > button {
            &:last-child {
              margin-bottom: 15px;
            }
          }`}
  }
`;
