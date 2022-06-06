import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import theme, { GlobalStyle } from "./styles";
import { HandsContext } from "./context/HandsContext";
import { UserContext } from "./context/UserContext";
import AuthProvider from "./0auth/Provider";

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HandsContext>
          <UserContext>
            <>
              <GlobalStyle />
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </>
          </UserContext>
        </HandsContext>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Main;
