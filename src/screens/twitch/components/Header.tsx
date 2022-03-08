import React from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import {
  Title,
  Subtitle,
  Text,
  Subtext,
} from "../../../shared/components/styled";
import { IsLive, Channel, Followers, Stream } from "@shared-interfaces/twitch";
import { TwitchSvg } from "../../../shared/components/svg/svg";

interface IHeader {
  openUrl: Function;
  LiveData: IsLive;
  ChannelData: Channel;
  FollowData: Followers;
  StreamData: Stream;
}

const screenWidth = Dimensions.get("screen").width;

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
  margin-bottom: 30px;
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

const Header = ({
  openUrl,
  LiveData,
  ChannelData,
  FollowData,
  StreamData,
}: IHeader) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View>
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
        {LiveData?.data[0].is_live ? (
          <StreamImage
            source={{
              uri: StreamData?.data[0].thumbnail_url
                .replace("{width}", "800")
                .replace("{height}", "400"),
            }}
          />
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
      <TitleContainer style={{ marginBottom: 8 }}>
        <Title color={colors.text} style={{ marginRight: 8 }}>
          Twitch Crew
        </Title>
        <Subtitle color={colors.subtitle}>스트리머 크루 배도라지</Subtitle>
      </TitleContainer>
    </View>
  );
};

export default Header;
