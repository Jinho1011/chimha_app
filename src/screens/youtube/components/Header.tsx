import React from "react";
import { Image, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";

/**
 * ? Local Imports
 */
import { YoutubeFetch } from "@shared-interfaces/youtube/youtube";
import RNBounceable from "@freakycoder/react-native-bounceable";
import fonts from "@fonts";

interface IHeader {
  youtube: any[] | YoutubeFetch[];
  openUrl: Function;
}

const screenWidth = Dimensions.get("screen").width;

const Header = ({ youtube, openUrl }: IHeader) => {
  const theme = useTheme();
  const { colors } = theme;

  const Title = styled.Text`
    font-family: ${fonts.notosans.medium};
    font-size: 18px;
    color: ${colors.text};
    margin-right: 6px;
  `;

  const Subtitle = styled.Text`
    font-family: ${fonts.notosans.light};
    font-size: 14px;
    color: ${colors.subtitle};
  `;

  const TitleContainer = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 12px;
  `;

  const Contents = styled.View`
    flex-direction: column;
    margin-bottom: 20px;
  `;

  const Content = styled(RNBounceable)`
    flex-direction: row;
    align-items: center;
    background: ${colors.content};
    border-radius: 24px;
    padding: 18px;
    margin-bottom: 14px;
  `;

  const ContentTitleContainer = styled.View`
    margin-left: 16px;
    flex-direction: column;
    justify-content: space-between;
  `;

  const ContentTitle = styled.Text`
    font-family: ${fonts.notosans.regular};
    font-size: 16px;
    color: ${colors.text};
    margin-right: 8px;
  `;

  const ContentSubTitle = styled.Text`
    font-family: ${fonts.notosans.regular};
    font-size: 12px;
    color: ${colors.subtitle};
    width: ${screenWidth - 144}px;
  `;

  const TitlePlaceHolder = styled.View`
    width: 100px;
    height: 20px;
    background-color: #a7a7a7;
    border-radius: 10px;
    margin-bottom: 10px;
  `;

  const DescPlaceHolder = styled.View`
    width: 200px;
    height: 20px;
    background-color: #ccc;
    border-radius: 10px;
  `;

  return (
    <View>
      <TitleContainer>
        <Title>YouTube</Title>
        <Subtitle>침투부 채널</Subtitle>
      </TitleContainer>
      <Contents>
        {youtube.map((item, index: number) => {
          if (item.isLoading) {
            return (
              <Content key={index}>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/150/C4C4C4/C4C4C4?Text=1",
                  }}
                  style={{ width: 52, height: 52, borderRadius: 30 }}
                />
                <ContentTitleContainer>
                  <TitlePlaceHolder />
                  <DescPlaceHolder />
                </ContentTitleContainer>
              </Content>
            );
          } else {
            return (
              <Content
                key={item.data.items[0].id}
                onPress={() => {
                  openUrl(
                    "vnd.youtube://user/channel/",
                    "https://www.youtube.com/channel/",
                    item.data.items[0].id,
                  );
                }}
              >
                <Image
                  source={{
                    uri: item.data.items[0].snippet.thumbnails.default.url,
                  }}
                  style={{ width: 52, height: 52, borderRadius: 30 }}
                />
                <ContentTitleContainer>
                  <ContentTitle>
                    {item.data.items[0].snippet.title}
                  </ContentTitle>
                  <ContentSubTitle>
                    {item.data.items[0].snippet.description}
                  </ContentSubTitle>
                </ContentTitleContainer>
              </Content>
            );
          }
        })}
      </Contents>
      <TitleContainer>
        <Title>Sub Contents</Title>
        <Subtitle>침착맨의 외부 방송</Subtitle>
      </TitleContainer>
    </View>
  );
};

export default Header;
