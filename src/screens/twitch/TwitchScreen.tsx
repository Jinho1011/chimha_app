import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import createStyles from "./TwitchScreen.style";
import {
  getIsLive,
  getChannelInfo,
  getFollowers,
} from "../../services/api/twitch";
import { Title, Subtitle, Text, Subtext } from "../../shared/components/styled";

const Container = styled.View`
  padding: 20px 20px 0 20px;
`;

const Header = styled.View``;

const TitleContainer = styled.View``;

const StreamingContainer = styled.Pressable``;

const Streaming = styled.Image``;

const UserContainer = styled.View``;

const UserThumb = styled.Image``;

const TwitchScreen = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isLive = useQuery("isLive", getIsLive);
  const channel = useQuery("channel", () => getChannelInfo("66375105"));
  const followers = useQuery("followers", getFollowers);

  React.useEffect(() => {
    // console.log(JSON.stringify(followers.data, null, 4));
  }, [isLive, channel, followers]);

  return (
    <Container style={styles.container}>
      <Header>
        <TitleContainer>
          <Title>Twitch Live</Title>
          <Subtitle>침착맨 생방송 채널</Subtitle>
        </TitleContainer>
        <StreamingContainer>{/* <Streaming /> */}</StreamingContainer>
        <UserContainer>{/* <UserThumb /> */}</UserContainer>
      </Header>
    </Container>
  );
};

export default TwitchScreen;
