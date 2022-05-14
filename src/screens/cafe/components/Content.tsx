import React, { useCallback, useState } from "react";
import { useColorScheme, Linking, View, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import { Text, Subtext } from "../../../shared/components/styled";
import { Article } from "@shared-interfaces/cafe";
import { openLink } from "../../../shared/components/util";

interface IContent {
  post: Article;
}

const Content = ({ post }: IContent) => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const { colors } = theme;
  const isDarkMode = scheme === "dark";

  const [statusBarStyle] = useState("dark-content");

  const onOpenLink = async (url: string) => {
    await openLink(url, statusBarStyle);
  };

  const PostContainer = styled.Pressable`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom-width: 1px;
    border-bottom-color: ${isDarkMode ? colors.dynamicBackground : "#eeeeee"};
  `;

  const PostTextContainer = styled.View`
    flex-direction: row;
    margin-bottom: 4px;
  `;

  const PostThumbImage = styled.Image`
    width: 40px;
    height: 40px;
  `;

  return (
    <PostContainer
      onPress={async () => {
        await onOpenLink(post.link);
      }}
    >
      <View style={{ flex: 5 }}>
        <PostTextContainer>
          <Text color={colors.text} style={{ fontSize: 15 }}>
            {post.title}
          </Text>
        </PostTextContainer>
        <PostTextContainer>
          <Subtext color={colors.subtitle} style={{ marginRight: 8 }}>
            {post.author}
          </Subtext>
          <Subtext color={colors.subtitle}>{post.date}</Subtext>
        </PostTextContainer>
      </View>
      <View style={{ flex: 1 }}>
        <PostThumbImage source={{ uri: post.image }} />
      </View>
    </PostContainer>
  );
};

export default Content;
