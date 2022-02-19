import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import SplashScreen from "react-native-splash-screen";
/**
 * ? Local Imports
 */
import Navigation from "./src/services/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";
import { CafeAPI } from "@services/api/index";

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    const init = async () => {
      const cafeAPI = new CafeAPI(42, 1);
      const data = await cafeAPI.getArticles();
      console.log("🚀 ~ file: App.tsx ~ line 26 ~ init ~ data", data);
    };
    init();

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme]);

  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
