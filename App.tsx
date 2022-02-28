import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider, useDispatch } from "react-redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { QueryClient, QueryClientProvider } from "react-query";
/**
 * ? Local Imports
 */
import Navigation from "./src/services/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";
import loading from "./src/shared/store/reducers/loading";

const queryClient = new QueryClient();

/* -------------------------------------------------------------------------- */
/*                               Redux Methods                                */
/* -------------------------------------------------------------------------- */
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

const rootReducer = combineReducers({
  loading,
});

const store = createStore(rootReducer, enhancer);

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  LogBox.ignoreAllLogs(true);

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    return () => {
      SplashScreen.hide();
    };
  }, [scheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
