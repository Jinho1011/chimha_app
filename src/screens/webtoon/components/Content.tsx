import React from "react";
import { Dimensions, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import { Text, Subtext } from "../../../shared/components/styled";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface Webtoon {
  titleId: string;
  title: string;
  desc: string;
  image: any;
}

interface IContent {
  item: Webtoon;
}

const openUrl = async (appUrl: string, webUrl: string) => {
  const isValid = await Linking.canOpenURL(appUrl);
  const baseUrl = isValid ? appUrl : webUrl;

  try {
    await Linking.openURL(baseUrl);
  } catch (error) {
    console.log(error);
  }
};

const screenWidth = Dimensions.get("screen").width;

const Content = ({ item }: IContent) => {
  const theme = useTheme();
  const { colors } = theme;

  const Toon = styled(RNBounceable)`
    align-items: center;
  `;
  const ToonImage = styled.Image`
    width: ${Math.floor((screenWidth - 50) / 2)};
    height: ${Math.floor((screenWidth - 50) * 0.75)};
    margin-bottom: 8px;
    border-radius: 10px;
  `;

  return (
    <Toon
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      onPress={() =>
        // ${item.titleId}
        // webtoon/${item.titleId}
        // webtoon/list?titleId=${item.titleId}
        openUrl(
          `https://apps.comic.naver.com/launchApp/contentList?version=2&titleId=${item.titleId}&league=WEBTOON`,
          `https://m.comic.naver.com/webtoon/list?titleId=${item.titleId}`,
        )
      }
    >
      <ToonImage source={item.image} />
      <Text color={colors.text}>{item.title}</Text>
      <Subtext color={colors.subtitle}>{item.desc}</Subtext>
    </Toon>
  );
};

export default Content;
