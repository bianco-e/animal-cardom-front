import { ThemeProvider } from "styled-components";
import theme from "./styles/globalStyles";
import Router from "./Router";
import Modal from "./components/Common/Modal";
import ModalScreenWidthContent from "./components/ModalScreenWidthContent";
import { HandsContext } from "./context/HandsContext";
import { UserContext } from "./context/UserContext";
import AuthProvider from "./0auth/Provider";
import useWindowDimensions from "./hooks/useWindowDimensions";

const Main = () => {
  const dimensions = useWindowDimensions();
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HandsContext>
          <UserContext>
            <>
              <Router></Router>
              {dimensions && dimensions.width <= 415 && (
                <Modal closeModal={() => {}} withCloseButton={false}>
                  <ModalScreenWidthContent />
                </Modal>
              )}
            </>
          </UserContext>
        </HandsContext>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Main;
