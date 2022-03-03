import React, { useMemo } from "react";
import { Dimensions, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import {
  getIsLive,
  getChannelInfo,
  getFollowers,
  getStream,
} from "../../services/api/twitch";
import { Title, Subtitle, Text, Subtext } from "../../shared/components/styled";
import { TwitchSvg } from "../../shared/components/svg/svg";

const screenWidth = Dimensions.get("screen").width;

const Header = styled.View``;

const TitleContainer = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  align-items: baseline;
`;

const StreamingContainer = styled.Pressable``;

const StreamImage = styled.Image`
  width: ${screenWidth - 40}px;
  height: ${Math.round((screenWidth - 40) / 2)}px;
  border-radius: 16px;
`;

const PlaceholderImage = styled.Image`
  width: ${screenWidth - 40}px;
  height: ${Math.round((screenWidth - 40) / 2)}px;
  border-radius: 16px;
`;

const UserContainer = styled.View`
  flex-direction: row;
  padding-top: 10px;
`;

const UserThumb = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`;

const UserInfo = styled.View`
  flex-direction: column;
  padding-left: 12px;
  justify-content: center;
`;

const UserNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 2px;
`;

const TwitchScreen = () => {
  const theme = useTheme();
  const { colors } = theme;

  const { data: LiveData, isLoading: IsLiveLoading } = useQuery(
    "isLive",
    getIsLive,
  );
  const { data: ChannelData, isLoading: IsChannelLoading } = useQuery(
    "channel",
    () => getChannelInfo("66375105"),
  );
  const { data: FollowData, isLoading: IsFollowLoading } = useQuery(
    "followers",
    () => getFollowers("66375105"),
  );
  const { data: StreamData, isLoading: IsStreamLoading } = useQuery(
    "stream",
    () => getStream("66375105"),
  );

  const Container = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
    flex-direction: column;
    background-color: ${colors.background};
  `;

  const openUrl = async (appUrl: string, webUrl: string) => {
    const isValid = await Linking.canOpenURL(appUrl);
    const baseUrl = isValid ? appUrl : webUrl;

    try {
      await Linking.openURL(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  function numberToKorean(number: number | undefined) {
    if (number !== undefined) {
      var inputNumber = number;
      var unitWords = ["", "만", "억", "조", "경"];
      var splitUnit = 10000;
      var splitCount = unitWords.length;
      var resultArray = [];
      var resultString = "";

      for (var i = 0; i < splitCount; i++) {
        var unitResult =
          (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
          resultArray[i] = unitResult;
        }
      }
      for (var i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
      }
      resultString = resultString.substring(0, resultString.indexOf("만") + 1);
      return resultString;
    } else {
      return false;
    }
  }

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title color={colors.text} style={{ marginRight: 8 }}>
            Twitch Live
          </Title>
          <Subtitle color={colors.subtitle}>침착맨 생방송 채널</Subtitle>
        </TitleContainer>
        <StreamingContainer
          onPress={() => {
            openUrl(
              "twitch://stream/zilioner",
              "https://www.twitch.tv/zilioner?lang=ko",
            );
          }}
        >
          {IsLiveLoading && IsChannelLoading ? (
            <PlaceholderImage
              source={{
                uri: "https://via.placeholder.com/500/C4C4C4/C4C4C4?Text=Image",
              }}
            />
          ) : LiveData?.data[0].is_live ? (
            <StreamImage source={{ uri: StreamData?.data[0].thumbnail_url }} />
          ) : (
            <StreamImage
              source={{ uri: ChannelData?.data[0].offline_image_url }}
            />
          )}
        </StreamingContainer>
        <UserContainer>
          <UserThumb source={{ uri: ChannelData?.data[0].profile_image_url }} />
          <UserInfo>
            <UserNameContainer>
              <Text color={colors.text} style={{ marginRight: 2 }}>
                {ChannelData?.data[0].display_name}
              </Text>
              <TwitchSvg width={16} height={16} fill={"#680ed6"} />
            </UserNameContainer>
            <Subtext color={colors.subtitle}>
              팔로워 {numberToKorean(FollowData?.total)}
            </Subtext>
          </UserInfo>
        </UserContainer>
      </Header>
    </Container>
  );
};

export default TwitchScreen;
