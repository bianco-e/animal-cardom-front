import { Route, useLocation } from "react-router-dom";
import Campaign from "./pages/Campaign";
import Collection from "./pages/Collection";
import ErrorPage from "./pages/ErrorPage";
import Analytics from "./pages/Analytics";
import Game from "./pages/Game";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import WelcomePage from "./pages/WelcomePage";
import FeedbackPage from "./pages/FeedbackPage";
import useScrollToTop from "./hooks/useScrollToTop";

import Modal from "./components/Common/Modal";
import ModalScreenWidthContent from "./components/ModalScreenWidthContent";
import useWindowDimensions from "./hooks/useWindowDimensions";

const MainRouter = () => {
  const dimensions = useWindowDimensions();
  const location = useLocation();
  const showScreenSizeAlert =
    dimensions && dimensions.width <= 512 && location.pathname !== "/analytics";
  useScrollToTop();
  return (
    <>
      {showScreenSizeAlert ? (
        <Modal closeModal={() => {}} withCloseButton={false}>
          <ModalScreenWidthContent />
        </Modal>
      ) : null}
      <Route exact path="/" render={() => <WelcomePage />} />
      <Route exact path="/analytics" render={() => <Analytics />} />
      <Route exact path={["/play", "/game"]} render={() => <Game />} />
      <Route exact path="/menu" render={() => <Menu />} />
      <Route exact path="/campaign" render={() => <Campaign />} />
      <Route exact path="/profile" render={() => <Profile />} />
      <Route exact path="/collection" render={() => <Collection />} />
      <Route exact path="/error" render={() => <ErrorPage />} />
      <Route exact path="/give-feedback" render={() => <FeedbackPage />} />
    </>
  );
};

export default MainRouter;
