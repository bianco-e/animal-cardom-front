import { ThemeProvider } from "styled-components";
import theme from "./styles/globalColors";
import Router from "./Router";
import CustomModal from "./components/CustomModal";
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
                <CustomModal
                  closeModal={() => {}}
                  contentWidth="100%"
                  withCloseButton={false}
                >
                  <ModalScreenWidthContent />
                </CustomModal>
              )}
            </>
          </UserContext>
        </HandsContext>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Main;
