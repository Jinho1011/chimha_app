import { Linking } from "react-native";

export const openUrl = async (appUrl: string, webUrl: string) => {
  const isValid = await Linking.canOpenURL(appUrl);
  const baseUrl = isValid ? appUrl : webUrl;

  try {
    await Linking.openURL(baseUrl);
  } catch (error) {
    console.log(error);
  }
};
