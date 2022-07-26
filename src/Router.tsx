import { Route, Switch, useLocation } from "react-router-dom"
import Campaign from "./pages/Campaign"
import Collection from "./pages/Collection"
import ErrorPage from "./pages/ErrorPage"
import Analytics from "./pages/Analytics"
import Game from "./pages/Game"
import Menu from "./pages/Menu"
import Profile from "./pages/Profile"
import WelcomePage from "./pages/WelcomePage"
import FeedbackPage from "./pages/FeedbackPage"
import useScrollToTop from "./hooks/useScrollToTop"

import Modal from "./components/Common/Modal"
import ModalScreenWidthContent from "./components/ModalScreenWidthContent"
import useWindowDimensions from "./hooks/useWindowDimensions"
import NotFoundPage from "./pages/NotFound"

const MainRouter = () => {
  const dimensions = useWindowDimensions()
  const location = useLocation()
  const showScreenSizeAlert =
    dimensions && dimensions.width <= 512 && location.pathname !== "/analytics"
  useScrollToTop()
  return (
    <>
      {showScreenSizeAlert ? (
        <Modal closeModal={() => {}} withCloseButton={false}>
          <ModalScreenWidthContent />
        </Modal>
      ) : null}
      <Switch>
        <Route exact path="/" render={() => <WelcomePage />} />
        <Route exact path="/analytics" render={() => <Analytics />} />
        <Route
          exact
          path={["/play", "/game/:requiredXp(0|450|900|1350|1800|2250|2700|3150|3600)"]}
          render={() => <Game />}
        />
        <Route exact path="/menu" render={() => <Menu />} />
        <Route exact path="/campaign" render={() => <Campaign />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/collection" render={() => <Collection />} />
        <Route exact path="/error" render={() => <ErrorPage />} />
        <Route exact path="/give-feedback" render={() => <FeedbackPage />} />

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  )
}

export default MainRouter
