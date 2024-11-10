import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Campaign from "../pages/Campaign"
import Collection from "../pages/Collection"
import ErrorPage from "../pages/ErrorPage"
import Analytics from "../pages/Analytics"
import Game from "../pages/Game"
import Menu from "../pages/Menu"
import Profile from "../pages/Profile"
import WelcomePage from "../pages/WelcomePage"
import FeedbackPage from "../pages/FeedbackPage"

import NotFoundPage from "../pages/NotFound"
import CampaignRouteWrapper from "./CampaignRouteWrapper"
import AppLayout from "../components/AppLayout"

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path="/" element={<WelcomePage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/play" element={<Game />} />
      <Route element={<CampaignRouteWrapper />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/campaign/level/:levelId" element={<Game isCampaign />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection" element={<Collection />} />
      </Route>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/give-feedback" element={<FeedbackPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)
