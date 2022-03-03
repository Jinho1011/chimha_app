import React, { useMemo } from "react";
import { Dimensions } from "react-native";
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

const screenWidth = Dimensions.get("screen").width;

const Container = styled.View`
  padding: 20px 20px 0 20px;
`;

const Header = styled.View``;

const TitleContainer = styled.View``;

const StreamingContainer = styled.Pressable``;

const StreamingImage = styled.Image`
  width: ${screenWidth - 40}px;
  height: ${Math.round((screenWidth - 40) / 2)}px;
  border-radius: 16px;
`;

const UserContainer = styled.View``;

const UserThumb = styled.Image``;

const TwitchScreen = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: LiveData, isLoading: IsLiveLoading } = useQuery(
    "isLive",
    getIsLive,
  );
  const { data: ChannelData, isLoading: IsChannelLoading } = useQuery(
    "channel",
    () => getChannelInfo("66375105"),
  );
  const followers = useQuery("followers", getFollowers);

  return (
    <Container style={styles.container}>
      <Header>
        <TitleContainer>
          {/* <Title color={colors.text}>Twitch Live</Title>
          <Subtitle color={colors.subtitle}>침착맨 생방송 채널</Subtitle> */}
        </TitleContainer>
        <StreamingContainer>
          {IsLiveLoading && IsChannelLoading ? (
            <StreamingImage
              source={{
                uri: "https://via.placeholder.com/500/C4C4C4/C4C4C4?Text=Image",
              }}
            />
          ) : LiveData?.data[0].is_live ? (
            <StreamingImage
              source={{ uri: ChannelData?.data[0].profile_image_url }}
            />
          ) : (
            <StreamingImage
              source={{ uri: ChannelData?.data[0].offline_image_url }}
            />
          )}
        </StreamingContainer>
        <UserContainer>{/* <UserThumb /> */}</UserContainer>
      </Header>
    </Container>
  );
};

export default TwitchScreen;
