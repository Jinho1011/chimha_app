import React from "react";
import { WebView } from "react-native-webview";

const YoutubeScreen = () => {
  return <WebView source={{ uri: "https://chimha-web.vercel.app/youtube" }} />;
};

export default YoutubeScreen;
