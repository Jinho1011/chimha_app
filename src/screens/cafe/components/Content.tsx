import React, { useCallback, useState } from "react";
import { useColorScheme, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import { Text, Subtext } from "../../../shared/components/styled";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Article } from "@shared-interfaces/cafe";
import { openLink } from "../../../shared/components/util";

interface IContent {
  post: Article;
  scrollToLastPosition: Function;
  setLoading: any;
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

const getArticleId = (url: string) => {
  return url.split("articleid=")[1].split("&")[0];
};

const Content = ({ post, scrollToLastPosition, setLoading }: IContent) => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const { colors } = theme;
  const isDarkMode = scheme === "dark";

  const [url, setUrl] = useState("https://reactnative.dev");
  const [statusBarStyle] = useState("dark-content");

  const onOpenLink = useCallback(
    async (url: string) => {
      await openLink(url, statusBarStyle);
    },
    [url, statusBarStyle],
  );

  const PostContainer = styled.Pressable`
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom-width: 1px;
    border-bottom-color: ${isDarkMode ? colors.dynamicBackground : "#eeeeee"};
  `;

  const PostTextContainer = styled.View`
    flex-direction: row;
    margin-bottom: 4px;
  `;

  return (
    <PostContainer
      onPress={async () => {
        await onOpenLink(post.link);
      }}
    >
      <PostTextContainer>
        <Text color={colors.text} style={{ fontSize: 14 }}>
          {post.title}
        </Text>
      </PostTextContainer>
      <PostTextContainer>
        <Subtext color={colors.subtitle} style={{ marginRight: 8 }}>
          {post.author}
        </Subtext>
        <Subtext color={colors.subtitle}>{post.date}</Subtext>
      </PostTextContainer>
    </PostContainer>
  );
};

export default Content;
