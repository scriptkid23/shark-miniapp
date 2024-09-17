import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import { useIntegration } from "@telegram-apps/react-router-integration";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";
import LoadingInitLayout from "@/components/Layout/LoadingInitLayout";
import MainLayout from "@/components/Layout/MainLayout";
import FriendsPage from "@/containers/FriendsPage";
import LeaderboardPage from "@/containers/Leaderboard";
import LoadingTransaction from "@/containers/LoadingTransaction";
import MissionPage from "@/containers/MissionPage";
import StoriesPage from "@/containers/StoriesPage";
import { useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import "@telegram-apps/telegram-ui/dist/styles.css";
import HomePage from "./containers/HomePage";
import "./index.css";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { NextUIProvider } from "@nextui-org/react";
import ConnectWalletNotification from "./components/ConnectWalletNotification";

function App() {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);
  console.log("trigger")

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <NextUIProvider>
      <div className="relative m-auto ">
        <AppRoot
          appearance={miniApp.isDark ? "dark" : "light"}
          platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
        >
          <Theme appearance="dark" className="font-inter">
            <Router location={location} navigator={reactNavigator}>
              <Routes>
                <Route element={<LoadingInitLayout />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" index element={<HomePage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                    <Route path="/missions" element={<MissionPage />} />
                  </Route>
                  <Route path="/stories" element={<StoriesPage />} />
                  <Route
                    path="/loading-transaction"
                    element={<LoadingTransaction />}
                  />
                  <Route path={"*"} element={<Navigate to={"/"} />} />
                </Route>
              </Routes>
            </Router>
          </Theme>
        </AppRoot>
      </div>
      <ConnectWalletNotification />
    </NextUIProvider>
  );
}

export default App;
